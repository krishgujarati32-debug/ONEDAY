-- Run once in a new Supabase project. No service-role key is needed by the app.
create table public.user_settings (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '' check (length(display_name)<=80),
 daily_goal_minutes integer not null default 60 check (daily_goal_minutes between 15 and 480),
 theme text not null default 'system' check (theme in ('light','dark','system')),
 explanation_language text not null default 'english' check (explanation_language in ('english','hinglish')),
 last_topic text, revision bigint not null default 0,
 updated_at timestamptz not null default now()
);
create table public.learning_progress (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 subtopic_id text not null check(length(subtopic_id)<=100),
 status text not null check(status in ('not_started','in_progress','completed','needs_revision')),
 completed_at timestamptz, notes text not null default '',
 created_at timestamptz not null default now(),updated_at timestamptz not null default now(),
 unique(user_id,subtopic_id),check((status='completed')=(completed_at is not null))
);
create table public.notes (
 user_id uuid not null references auth.users(id) on delete cascade,
 item_key text not null check(length(item_key)<=150), content text not null check(length(content)<=30000),
 updated_at timestamptz not null default now(), primary key(user_id,item_key)
);
create table public.bookmarks (
 id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,
 item_type text not null check(item_type in ('topic','subtopic','project','resource')),
 item_id text not null check(length(item_id)<=100),created_at timestamptz not null default now(),
 unique(user_id,item_type,item_id)
);
create table public.study_sessions (
 id uuid primary key,user_id uuid not null references auth.users(id) on delete cascade,
 topic_id text not null check(length(topic_id)<=100),duration_minutes integer not null check(duration_minutes between 1 and 1440),
 session_date date not null,notes text not null default '' check(length(notes)<=2000),created_at timestamptz not null default now()
);
create index study_sessions_user_date on public.study_sessions(user_id,session_date);
create table public.project_checks (
 user_id uuid not null references auth.users(id) on delete cascade,
 item_key text not null check(length(item_key)<=100),completed boolean not null default false,
 primary key(user_id,item_key)
);
-- Every exposed table enforces ownership for SELECT, INSERT, UPDATE and DELETE.
do $$ declare t text; begin
 foreach t in array array['user_settings','learning_progress','notes','bookmarks','study_sessions','project_checks'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('create policy owner_access on public.%I for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id)',t);
 execute format('grant select,insert,update,delete on public.%I to authenticated',t);
 execute format('revoke all on public.%I from anon',t);
 end loop;
end $$;
create or replace function public.read_learning_state() returns jsonb language plpgsql security invoker set search_path='' as $$
declare uid uuid:=auth.uid(); s public.user_settings%rowtype; result jsonb;
begin
 if uid is null then raise exception 'authentication_required';end if;
 select * into s from public.user_settings where user_id=uid;
 select jsonb_build_object('revision',coalesce(s.revision,0),'data',jsonb_build_object(
  'progress',coalesce((select jsonb_object_agg(subtopic_id,jsonb_build_object('status',status,'completedAt',case when completed_at is null then null else to_char(completed_at at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') end)) from public.learning_progress where user_id=uid),'{}'::jsonb),
  'notes',coalesce((select jsonb_object_agg(item_key,content) from public.notes where user_id=uid),'{}'::jsonb),
  'bookmarks',coalesce((select jsonb_agg(item_type||':'||item_id order by created_at,id) from public.bookmarks where user_id=uid),'[]'::jsonb),
  'projectChecks',coalesce((select jsonb_object_agg(item_key,completed) from public.project_checks where user_id=uid),'{}'::jsonb),
  'sessions',coalesce((select jsonb_agg(jsonb_build_object('id',id,'topicId',topic_id,'minutes',duration_minutes,'date',to_char(session_date,'YYYY-MM-DD'),'notes',notes) order by session_date,id) from public.study_sessions where user_id=uid),'[]'::jsonb),
  'settings',jsonb_build_object('name',coalesce(s.display_name,''),'dailyGoal',coalesce(s.daily_goal_minutes,60),'theme',coalesce(s.theme,'system'),'language',coalesce(s.explanation_language,'english')),
  'lastTopic',s.last_topic
 )) into result;
 return result;
end $$;
create or replace function public.save_learning_state(payload jsonb,expected_revision bigint) returns bigint language plpgsql security invoker set search_path='' as $$
declare uid uuid:=auth.uid(); current_revision bigint; entry record; item jsonb;
begin
 if uid is null then raise exception 'authentication_required';end if;
 if octet_length(payload::text)>5000000 then raise exception 'payload_too_large';end if;
 if jsonb_typeof(payload->'progress')<>'object' or jsonb_typeof(payload->'notes')<>'object' or jsonb_typeof(payload->'sessions')<>'array' or jsonb_typeof(payload->'bookmarks')<>'array' or jsonb_typeof(payload->'settings')<>'object' or jsonb_typeof(payload->'projectChecks')<>'object' then raise exception 'invalid_payload';end if;
 insert into public.user_settings(user_id) values(uid) on conflict(user_id) do nothing;
 select revision into current_revision from public.user_settings where user_id=uid for update;
 if current_revision<>expected_revision then raise exception 'revision_conflict';end if;
 delete from public.learning_progress where user_id=uid;
 for entry in select * from jsonb_each(payload->'progress') loop
  insert into public.learning_progress(user_id,subtopic_id,status,completed_at) values(uid,entry.key,entry.value->>'status',(entry.value->>'completedAt')::timestamptz);
 end loop;
 delete from public.notes where user_id=uid;
 for entry in select * from jsonb_each_text(payload->'notes') loop
  insert into public.notes(user_id,item_key,content) values(uid,entry.key,entry.value);
 end loop;
 delete from public.bookmarks where user_id=uid;
 for item in select * from jsonb_array_elements(payload->'bookmarks') loop
  insert into public.bookmarks(user_id,item_type,item_id) values(uid,split_part(item#>>'{}',':',1),split_part(item#>>'{}',':',2));
 end loop;
 delete from public.study_sessions where user_id=uid;
 for item in select * from jsonb_array_elements(payload->'sessions') loop
  insert into public.study_sessions(id,user_id,topic_id,duration_minutes,session_date,notes) values((item->>'id')::uuid,uid,item->>'topicId',(item->>'minutes')::integer,(item->>'date')::date,item->>'notes');
 end loop;
 delete from public.project_checks where user_id=uid;
 for entry in select * from jsonb_each_text(payload->'projectChecks') loop
  insert into public.project_checks(user_id,item_key,completed) values(uid,entry.key,entry.value::boolean);
 end loop;
 update public.user_settings set display_name=payload->'settings'->>'name',daily_goal_minutes=(payload->'settings'->>'dailyGoal')::integer,
  theme=payload->'settings'->>'theme',explanation_language=payload->'settings'->>'language',last_topic=payload->>'lastTopic',revision=current_revision+1,updated_at=now() where user_id=uid;
 return current_revision+1;
end $$;
revoke all on function public.read_learning_state() from public,anon;
revoke all on function public.save_learning_state(jsonb,bigint) from public,anon;
grant execute on function public.read_learning_state() to authenticated;
grant execute on function public.save_learning_state(jsonb,bigint) to authenticated;
