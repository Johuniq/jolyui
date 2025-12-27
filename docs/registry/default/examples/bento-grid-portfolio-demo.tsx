"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BentoGrid } from "@/registry/default/ui/bento-grid";
import {
    Code,
    ExternalLink,
    Eye,
    Github,
    Heart,
    Palette,
    Star,
    Zap
} from "lucide-react";

export default function BentoGridPortfolioDemo() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern UI",
      tech: ["React", "Node.js", "MongoDB"],
      stats: { likes: 124, views: 2400, stars: 89 },
      gradient: "from-blue-500/20 to-purple-500/20",
      icon: <Code className="h-6 w-6" />
    },
    {
      title: "Design System",
      description: "Comprehensive design system for enterprise applications",
      tech: ["Figma", "Storybook", "TypeScript"],
      stats: { likes: 89, views: 1800, stars: 67 },
      gradient: "from-pink-500/20 to-rose-500/20",
      icon: <Palette className="h-6 w-6" />
    },
    {
      title: "AI Dashboard",
      description: "Real-time analytics dashboard with AI insights",
      tech: ["Next.js", "Python", "TensorFlow"],
      stats: { likes: 156, views: 3200, stars: 134 },
      gradient: "from-green-500/20 to-teal-500/20",
      icon: <Zap className="h-6 w-6" />
    }
  ];

  return (
    <BentoGrid className="max-w-7xl mx-auto gap-6">
      {/* Hero Project - Large */}
      <Card className="md:col-span-2 lg:row-span-2 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 relative overflow-hidden">
        <CardContent className="p-8 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Featured Project</h3>
                <p className="text-muted-foreground">Showcase your best work</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-6 max-w-md">
              This large card is perfect for featuring your most important project or portfolio piece.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live
            </Button>
            <Button variant="outline">
              <Github className="h-4 w-4 mr-2" />
              Source
            </Button>
          </div>
        </CardContent>
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Featured
          </Badge>
        </div>
      </Card>

      {/* Project Cards */}
      {projects.map((project, index) => (
        <Card key={index} className={`bg-gradient-to-br ${project.gradient} border-border/50`}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-background/50 rounded-lg">
                {project.icon}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{project.stats.stars}</span>
              </div>
            </div>

            <h4 className="font-semibold mb-2">{project.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
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
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Skills & Technologies
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "React", level: 95 },
              { name: "TypeScript", level: 90 },
              { name: "Node.js", level: 85 },
              { name: "Python", level: 80 }
            ].map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
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