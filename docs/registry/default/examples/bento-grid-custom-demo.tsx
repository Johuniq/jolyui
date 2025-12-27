"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BentoGrid } from "@/registry/default/ui/bento-grid";
import {
    Activity,
    BarChart3,
    Calendar,
    DollarSign,
    MessageSquare,
    Star,
    TrendingUp,
    Users
} from "lucide-react";

export default function BentoGridCustomDemo() {
  return (
    <BentoGrid className="max-w-7xl mx-auto gap-6">
      {/* Hero Stats Card - Large */}
      <Card className="md:col-span-2 lg:row-span-2 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Dashboard Overview</CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Total Users
              </div>
              <div className="text-3xl font-bold">12,847</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+12.5%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Revenue
              </div>
              <div className="text-3xl font-bold">$48,392</div>
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
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">New user registration</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Payment processed</p>
              <p className="text-xs text-muted-foreground">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Report generated</p>
              <p className="text-xs text-muted-foreground">12 minutes ago</p>
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
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Manage Users
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-500">98.5%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-500">1.2s</div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-500">4.8</div>
              <div className="text-xs text-muted-foreground">User Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar/Events */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Team Meeting</span>
              <Badge variant="outline" className="text-xs">Today</Badge>
            </div>
            <p className="text-xs text-muted-foreground">2:00 PM - 3:00 PM</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Product Review</span>
              <Badge variant="outline" className="text-xs">Tomorrow</Badge>
            </div>
            <p className="text-xs text-muted-foreground">10:00 AM - 11:00 AM</p>
          </div>
        </CardContent>
      </Card>
    </BentoGrid>
  );
}