"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
type Log = { id: string; actor_name: string; actor_email: string | null; action: string; resource_type: string; resource_id: string | null; details: Record<string, unknown>; created_at: string };
const actionNames: Record<string, string> = { generate: "生成", create: "创建", update: "修改", publish: "发布", archive: "归档", draft: "撤回", delete: "删除" };
const resourceNames: Record<string, string> = { cdk: "CDK", announcement: "公告" };
export default function Audit() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState("");
  useEffect(() => { fetch("/api/admin/audit-logs").then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.message || "加载失败"); setLogs(data); }).catch(reason => setError(reason instanceof Error ? reason.message : "加载失败")); }, []);
  return <div className="grid gap-4"><PageHeader title="审计日志" description="追踪管理中心中的关键操作。" /><Card><CardHeader><CardTitle>操作记录</CardTitle></CardHeader><CardContent>{error ? <p className="text-sm text-destructive">{error}</p> : logs.length === 0 ? <p className="py-8 text-center text-sm text-muted-foreground">暂无审计日志</p> : <Table><TableHeader><TableRow><TableHead>时间</TableHead><TableHead>管理员</TableHead><TableHead>操作</TableHead><TableHead>资源</TableHead><TableHead>详情</TableHead></TableRow></TableHeader><TableBody>{logs.map(log => <TableRow key={log.id}><TableCell className="whitespace-nowrap text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString("zh-CN")}</TableCell><TableCell><div>{log.actor_name}</div><div className="text-xs text-muted-foreground">{log.actor_email || "—"}</div></TableCell><TableCell><Badge variant={log.action === "delete" ? "destructive" : "secondary"}>{actionNames[log.action] || log.action}</Badge></TableCell><TableCell>{resourceNames[log.resource_type] || log.resource_type}{log.resource_id && <div className="font-mono text-xs text-muted-foreground">{log.resource_id}</div>}</TableCell><TableCell className="max-w-sm truncate text-xs">{Object.entries(log.details || {}).map(([key, value]) => key + "：" + String(value)).join("，") || "—"}</TableCell></TableRow>)}</TableBody></Table>}</CardContent></Card></div>;
}
