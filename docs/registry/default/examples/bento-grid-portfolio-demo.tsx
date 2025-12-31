"use client";

import { Code2, Fingerprint, Globe2, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BentoGrid } from "@/registry/default/ui/bento-grid";

export default function BentoGridPortfolioDemo() {
  return (
    <BentoGrid className="mx-auto max-w-7xl gap-4 p-4">
      {/* Hero Feature - Security */}
      <Card className="group relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background md:col-span-2 lg:row-span-2">
        <CardContent className="flex h-full flex-col justify-between p-8">
          <div className="relative z-10">
            <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 ring-1 ring-primary/20">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-4 font-bold text-3xl tracking-tight">
              Enterprise-Grade <br />
              <span className="text-primary">Security Infrastructure</span>
            </h3>
            <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
              Protect your data with military-grade encryption, multi-factor
              authentication, and real-time threat detection.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div className="-space-x-3 flex">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-background bg-muted ring-1 ring-primary/10"
                />
              ))}
            </div>
            <p className="font-medium text-muted-foreground text-sm">
              Trusted by <span className="text-foreground">500+</span>{" "}
              enterprises
            </p>
          </div>
        </CardContent>
        {/* Decorative background element */}
        <div className="-bottom-12 -right-12 absolute h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
      </Card>

      {/* Lightning Fast */}
      <Card className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-amber-500/30">
        <CardContent className="p-6">
          <div className="mb-4 inline-flex rounded-xl bg-amber-500/10 p-3 ring-1 ring-amber-500/20">
            <Zap className="h-6 w-6 text-amber-500" />
          </div>
          <h4 className="mb-2 font-bold text-xl">Lightning Fast</h4>
          <p className="text-muted-foreground text-sm">
            Experience sub-millisecond latency with our globally distributed
            edge network.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-amber-500/10 text-amber-600 dark:text-amber-400"
            >
              99.9% Uptime
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Global Scale */}
      <Card className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-blue-500/30">
        <CardContent className="p-6">
          <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
            <Globe2 className="h-6 w-6 text-blue-500" />
          </div>
          <h4 className="mb-2 font-bold text-xl">Global Scale</h4>
          <p className="text-muted-foreground text-sm">
            Deploy your applications to over 200+ locations worldwide with a
            single click.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
            >
              Edge Ready
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Developer Experience */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-emerald-500/30 md:col-span-2">
        <CardContent className="p-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
                <Code2 className="h-6 w-6 text-emerald-500" />
              </div>
              <h4 className="mb-2 font-bold text-2xl">Developer First</h4>
              <p className="text-muted-foreground">
                Comprehensive API documentation, SDKs for every language, and a
                powerful CLI to streamline your workflow.
              </p>
            </div>
            <div className="flex-1 rounded-xl border bg-background/50 p-4 font-mono text-xs">
              <div className="mb-3 flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-rose-500/50" />
                <div className="h-2 w-2 rounded-full bg-amber-500/50" />
                <div className="h-2 w-2 rounded-full bg-emerald-500/50" />
              </div>
              <p className="text-emerald-500">$ npm install @jolyui/core</p>
              <p className="mt-1 text-muted-foreground">
                {/* Initialize the client */}
              </p>
              <p className="text-blue-500">
                const <span className="text-foreground">client</span> ={" "}
                <span className="text-purple-500">new</span>{" "}
                <span className="text-amber-500">JolyClient</span>();
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biometric Auth */}
      <Card className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-purple-500/30">
        <CardContent className="p-6">
          <div className="mb-4 inline-flex rounded-xl bg-purple-500/10 p-3 ring-1 ring-purple-500/20">
            <Fingerprint className="h-6 w-6 text-purple-500" />
          </div>
          <h4 className="mb-2 font-bold text-xl">Biometric Auth</h4>
          <p className="text-muted-foreground text-sm">
            Native support for FaceID, TouchID, and WebAuthn for seamless
            security.
          </p>
          <div className="mt-6">
            <div className="h-1 w-full rounded-full bg-muted">
              <div className="h-full w-3/4 rounded-full bg-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </BentoGrid>
  );
}
