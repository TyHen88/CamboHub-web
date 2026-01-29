import Link from "next/link";
import { Clock, PlayCircle, Users } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CourseDetailsPage({
  params,
}: {
  params: { courseId: string };
}) {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Course details"
        description="Deep dive into the course outcomes, modules, and lesson flow."
        action={
          <Button asChild>
            <Link href={`/student/learn/${params.courseId}/intro`}>Start learning</Link>
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Intermediate</Badge>
              <Badge variant="outline">Product-ready</Badge>
            </div>
            <CardTitle className="mt-3">Full-Stack Foundations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Build production-grade web applications with modern tooling, deployments,
              and collaborative workflows. Designed with Cambodian market needs in mind.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> 6 weeks
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> 120 learners
              </div>
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-primary" /> 24 lessons
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Modules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {[
              "Fundamentals & tooling",
              "API integration",
              "Database design",
              "Deployment & monitoring",
            ].map((module) => (
              <div key={module} className="rounded-2xl bg-muted p-3">
                {module}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
