"use client";

import {
  ArrowUpRight,
  Brain,
  Cpu,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BentoGrid } from "@/registry/default/ui/bento-grid";

export default function BentoGridCustomDemo() {
  return (
    <BentoGrid className="mx-auto max-w-7xl gap-4 p-4">
      {/* Main AI Intelligence Card */}
      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-background md:col-span-2 lg:row-span-2">
        <div className="-right-20 -top-20 absolute h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <CardHeader className="relative z-10 pb-2">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/10 text-primary"
            >
              <Brain className="mr-1 h-3 w-3" />
              AI Core v2.4
            </Badge>
            <span className="text-muted-foreground text-xs">
              Updated 2m ago
            </span>
          </div>
          <CardTitle className="mt-4 font-bold text-3xl tracking-tight">
            Neural Network <br />
            <span className="text-primary">Intelligence Hub</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-8">
          <p className="max-w-md text-muted-foreground">
            Real-time processing of over 1.2M data points per second with
            predictive modeling and automated anomaly detection.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs uppercase tracking-wider">
                Accuracy
              </p>
              <p className="font-bold font-mono text-2xl text-emerald-500">
                99.98%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs uppercase tracking-wider">
                Latency
              </p>
              <p className="font-bold font-mono text-2xl text-blue-500">14ms</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="shadow-lg shadow-primary/20">
              Deploy Model
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              View Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Traffic */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 font-medium text-sm">
            <Globe className="h-4 w-4 text-blue-500" />
            Global Traffic
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-2xl">42.8k</span>
            <span className="font-medium text-emerald-500 text-xs">+12%</span>
          </div>
          <div className="mt-4 flex h-12 items-end gap-1">
            {[40, 70, 45, 90, 65, 80, 50, 95, 75, 60].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-blue-500/20 transition-all hover:bg-blue-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 font-medium text-sm">
            <Cpu className="h-4 w-4 text-purple-500" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">CPU Load</span>
            <span className="font-medium">24%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-purple-500 transition-all"
              style={{ width: "24%" }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Memory</span>
            <span className="font-medium">4.2GB / 16GB</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: "35%" }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Agents */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm md:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-medium text-sm">
              <Layers className="h-4 w-4 text-amber-500" />
              Active AI Agents
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              Manage All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { name: "DataScout", status: "Running", color: "bg-emerald-500" },
              { name: "TrendBot", status: "Idle", color: "bg-slate-400" },
              {
                name: "SecuritySentinel",
                status: "Running",
                color: "bg-emerald-500",
              },
            ].map((agent) => (
              <div
                key={agent.name}
                className="flex items-center gap-3 rounded-lg border bg-background/50 p-3"
              >
                <div className={`h-2 w-2 rounded-full ${agent.color}`} />
                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-medium text-sm">{agent.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">
                    {agent.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Insights */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 font-medium text-sm">
            <Sparkles className="h-4 w-4 text-rose-500" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-md border border-rose-500/10 bg-rose-500/5 p-2 text-[11px]">
            <p className="font-medium text-rose-600 dark:text-rose-400">
              Anomaly Detected
            </p>
            <p className="text-muted-foreground">
              Unusual traffic spike from Asia-Pacific region.
            </p>
          </div>
          <div className="rounded-md border border-emerald-500/10 bg-emerald-500/5 p-2 text-[11px]">
            <p className="font-medium text-emerald-600 dark:text-emerald-400">
              Optimization Tip
            </p>
            <p className="text-muted-foreground">
              Reduce cache TTL for faster data propagation.
            </p>
          </div>
        </CardContent>
      </Card>
    </BentoGrid>
  );
}
