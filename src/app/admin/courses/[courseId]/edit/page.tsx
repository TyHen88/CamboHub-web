import { Save, Trash2 } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminCourseEditPage({
  params,
}: {
  params: { courseId: string };
}) {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Edit course"
        description={`Course ID: ${params.courseId}`}
      />

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Course title</Label>
              <Input id="title" defaultValue="Full-Stack Foundations" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Input id="level" defaultValue="Intermediate" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue="Build production-grade web applications with modern tooling, deployments, and collaborative workflows."
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete course
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
