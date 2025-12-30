"use client";

import {
  Activity,
  BarChart3,
  Calendar,
  DollarSign,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BentoGrid } from "@/registry/default/ui/bento-grid";

export default function BentoGridCustomDemo() {
  return (
    <BentoGrid className="mx-auto max-w-7xl gap-6">
      {/* Hero Stats Card - Large */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background md:col-span-2 lg:row-span-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="font-bold text-2xl">
              Dashboard Overview
            </CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Users className="h-4 w-4" />
                Total Users
              </div>
              <div className="font-bold text-3xl">12,847</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+12.5%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <DollarSign className="h-4 w-4" />
                Revenue
              </div>
              <div className="font-bold text-3xl">$48,392</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+8.2%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Monthly Goal</span>
              <span>84%</span>
            </div>
            <Progress value={84} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-2 h-2 w-2 rounded-full bg-primary"></div>
            <div className="flex-1 space-y-1">
              <p className="font-medium text-sm">New user registration</p>
              <p className="text-muted-foreground text-xs">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
            <div className="flex-1 space-y-1">
              <p className="font-medium text-sm">Payment processed</p>
              <p className="text-muted-foreground text-xs">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
            <div className="flex-1 space-y-1">
              <p className="font-medium text-sm">Report generated</p>
              <p className="text-muted-foreground text-xs">12 minutes ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button className="w-full justify-start" variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Manage Users
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2 text-center">
              <div className="font-bold text-2xl text-green-500">98.5%</div>
              <div className="text-muted-foreground text-xs">Uptime</div>
            </div>
            <div className="space-y-2 text-center">
              <div className="font-bold text-2xl text-blue-500">1.2s</div>
              <div className="text-muted-foreground text-xs">Avg Response</div>
            </div>
            <div className="space-y-2 text-center">
              <div className="font-bold text-2xl text-purple-500">4.8</div>
              <div className="text-muted-foreground text-xs">User Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar/Events */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Team Meeting</span>
              <Badge variant="outline" className="text-xs">
                Today
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">2:00 PM - 3:00 PM</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Product Review</span>
              <Badge variant="outline" className="text-xs">
                Tomorrow
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">10:00 AM - 11:00 AM</p>
          </div>
        </CardContent>
      </Card>
    </BentoGrid>
  );
}
