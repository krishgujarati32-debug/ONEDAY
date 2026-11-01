import { notFound } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { configured } from "@/lib/supabase/config";
const modes = ["sign-in", "sign-up", "reset-password", "update-password"];
export function generateStaticParams() {
  return modes.map((mode) => ({ mode }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  return { title: (await params).mode.split("-").join(" ") };
}
export default async function Page({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = await params;
  if (!modes.includes(mode)) notFound();
  return <AuthForm mode={mode} configured={configured} />;
}
