import { getAdminSession, authFailure } from "@/lib/auth/access";
export async function GET(request: Request) {
  try {
    await getAdminSession(request.headers);
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return Response.json({ message: "审计数据库尚未配置" }, { status: 503 });
    const response = await fetch(new URL("/rest/v1/audit_logs?select=*&order=created_at.desc&limit=500", url), { headers: { apikey: key, Authorization: "Bearer " + key }, cache: "no-store" });
    return Response.json(await response.json(), { status: response.status });
  } catch (error) { return authFailure(error); }
}
