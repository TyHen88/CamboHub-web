import { BookOpen, CalendarDays, GraduationCap, Target } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Courses in progress", value: "4", icon: BookOpen },
  { label: "Completed lessons", value: "28", icon: GraduationCap },
  { label: "Assessments", value: "3", icon: Target },
  { label: "Upcoming events", value: "2", icon: CalendarDays },
];

export default function StudentHomePage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Welcome back, learner"
        description="Track your momentum and keep building industry-ready skills."
        action={<Button>Start a quick lesson</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle>Learning streak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current streak</p>
                    <p className="text-2xl font-semibold">12 days</p>
                  </div>
                  <Badge variant="secondary">+3 this week</Badge>
                </div>
                <div className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                  Keep your momentum by completing one lesson today.
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Next milestone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Finish the &quot;React Fundamentals&quot; module to unlock the capstone project.
                </p>
                <Button variant="outline" className="w-full">
                  Continue learning
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <div className="grid gap-4 md:grid-cols-2">
            {["Live mentoring: API design", "Workshop: DevOps basics"].map((event) => (
              <Card key={event}>
                <CardHeader>
                  <CardTitle>{event}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Tomorrow • 7:00 PM • Online
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recommendations">
          <div className="grid gap-4 md:grid-cols-2">
            {["Next.js Production Patterns", "Career Prep: Interview Systems"].map(
              (item) => (
                <Card key={item}>
                  <CardHeader>
                    <CardTitle>{item}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Recommended based on your roadmap and assessment results.
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
