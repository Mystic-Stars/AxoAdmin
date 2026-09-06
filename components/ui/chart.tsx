"use client";
import * as React from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
export function ChartContainer({className,children}:{className?:string;children:React.ReactNode}){return <div className={cn("h-[320px] w-full",className)}>{children}</div>}
export const ChartTooltip=Tooltip;
export function ChartTooltipContent({active,payload,label}:any){if(!active||!payload?.length)return null;return <div className="rounded-lg border bg-background px-3 py-2 text-xs shadow-xl"><div className="mb-1 font-medium">{label}</div>{payload.map((item:any)=><div key={item.dataKey} className="flex justify-between gap-6 text-muted-foreground"><span>{item.name}</span><span className="font-medium text-foreground">{new Intl.NumberFormat("zh-CN").format(item.value)}</span></div>)}</div>}
export {CartesianGrid,Line,LineChart,ResponsiveContainer,XAxis,YAxis};
