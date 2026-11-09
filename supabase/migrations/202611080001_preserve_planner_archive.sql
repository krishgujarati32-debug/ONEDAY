-- Preserve the earlier planner payload alongside the same owner's settings.
-- Apply after 202611010001_learning_platform.sql. No existing rows are rewritten.
alter table public.user_settings add column if not exists planner jsonb;

-- The base read only selects data. Keep its revision and records on one snapshot
-- when the wrapper reads the archive in the same request.
alter function public.read_learning_state() stable;

create or replace function public.read_learning_workspace()
returns jsonb language plpgsql stable security invoker set search_path = '' as $$
declare
  snapshot jsonb;
  archived_planner jsonb;
begin
  snapshot := public.read_learning_state();
  select planner into archived_planner
  from public.user_settings
  where user_id = (select auth.uid());

  if archived_planner is not null then
    snapshot := jsonb_set(snapshot, '{data,planner}', archived_planner);
  end if;
  return snapshot;
end $$;

create or replace function public.save_learning_workspace(payload jsonb, expected_revision bigint)
returns bigint language plpgsql security invoker set search_path = '' as $$
declare
  next_revision bigint;
  archived_planner jsonb := payload -> 'planner';
begin
  if archived_planner is not null and archived_planner <> 'null'::jsonb and (
    jsonb_typeof(archived_planner) <> 'object'
    or archived_planner -> 'version' is distinct from '1'::jsonb
    or octet_length(archived_planner::text) > 3000000
  ) then
    raise exception 'invalid_planner_archive';
  end if;

  -- The existing save takes the owner row lock, validates the expected revision,
  -- and updates learning rows. Keep the planner write in the same transaction.
  next_revision := public.save_learning_state(payload, expected_revision);
  if payload ? 'planner' then
    update public.user_settings
    set planner = nullif(archived_planner, 'null'::jsonb)
    where user_id = (select auth.uid());
  end if;
  return next_revision;
end $$;

revoke all on function public.read_learning_workspace() from public, anon;
revoke all on function public.save_learning_workspace(jsonb, bigint) from public, anon;
grant execute on function public.read_learning_workspace() to authenticated;
grant execute on function public.save_learning_workspace(jsonb, bigint) to authenticated;
