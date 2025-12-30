"use client";

import {
  Code,
  ExternalLink,
  Eye,
  Github,
  Heart,
  Palette,
  Star,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BentoGrid } from "@/registry/default/ui/bento-grid";

export default function BentoGridPortfolioDemo() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern UI",
      tech: ["React", "Node.js", "MongoDB"],
      stats: { likes: 124, views: 2400, stars: 89 },
      gradient: "from-blue-500/20 to-purple-500/20",
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "Design System",
      description: "Comprehensive design system for enterprise applications",
      tech: ["Figma", "Storybook", "TypeScript"],
      stats: { likes: 89, views: 1800, stars: 67 },
      gradient: "from-pink-500/20 to-rose-500/20",
      icon: <Palette className="h-6 w-6" />,
    },
    {
      title: "AI Dashboard",
      description: "Real-time analytics dashboard with AI insights",
      tech: ["Next.js", "Python", "TensorFlow"],
      stats: { likes: 156, views: 3200, stars: 134 },
      gradient: "from-green-500/20 to-teal-500/20",
      icon: <Zap className="h-6 w-6" />,
    },
  ];

  return (
    <BentoGrid className="mx-auto max-w-7xl gap-6">
      {/* Hero Project - Large */}
      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background md:col-span-2 lg:row-span-2">
        <CardContent className="flex h-full flex-col justify-between p-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-3">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-2xl">Featured Project</h3>
                <p className="text-muted-foreground">Showcase your best work</p>
              </div>
            </div>
            <p className="mb-6 max-w-md text-lg text-muted-foreground">
              This large card is perfect for featuring your most important
              project or portfolio piece.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live
            </Button>
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              Source
            </Button>
          </div>
        </CardContent>
        <div className="absolute top-4 right-4">
          <Badge className="border-primary/20 bg-primary/10 text-primary">
            Featured
          </Badge>
        </div>
      </Card>

      {/* Project Cards */}
      {projects.map((project, index) => (
        <Card
          key={index}
          className={`bg-gradient-to-br ${project.gradient} border-border/50`}
        >
          <CardContent className="p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-background/50 p-2">
                {project.icon}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-xs">
                  {project.stats.stars}
                </span>
              </div>
            </div>

            <h4 className="mb-2 font-semibold">{project.title}</h4>
            <p className="mb-4 text-muted-foreground text-sm">
              {project.description}
            </p>

            <div className="mb-4 flex flex-wrap gap-1">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {project.stats.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {project.stats.views}
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-6 px-2">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Skills Section */}
      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <h4 className="mb-4 flex items-center gap-2 font-semibold">
            <Palette className="h-5 w-5" />
            Skills & Technologies
          </h4>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: "React", level: 95 },
              { name: "TypeScript", level: 90 },
              { name: "Node.js", level: 85 },
              { name: "Python", level: 80 },
            ].map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </BentoGrid>
  );
}
