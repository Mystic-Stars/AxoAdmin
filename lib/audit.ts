import { getAdminSession } from "@/lib/auth/access";

export async function recordAudit(request: Request, action: string, resourceType: string, resourceId: string | null, details: Record<string, unknown> = {}) {
  const session = await getAdminSession(request.headers);
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  await fetch(new URL("/rest/v1/audit_logs", url), { method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ actor_name: session.identity.name, actor_email: session.identity.email, action, resource_type: resourceType, resource_id: resourceId, details }) });
}
