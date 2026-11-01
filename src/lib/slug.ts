export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/c\+\+/g, "cpp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export function safeNextPath(
  value: string | null | undefined,
  fallback = "/dashboard",
) {
  return value?.startsWith("/") &&
    !value.startsWith("//") &&
    !/[\u0000-\u001f\u007f\\]/.test(value)
    ? value
    : fallback;
}
