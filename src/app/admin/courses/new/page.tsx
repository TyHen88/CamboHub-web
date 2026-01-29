import { Save } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminCourseNewPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Create course"
        description="Add new learning content and publish when ready."
      />

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Course title</Label>
              <Input id="title" placeholder="Full-Stack Foundations" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Input id="level" placeholder="Beginner / Intermediate" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe outcomes, projects, and skills learners will gain."
            />
          </div>
          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
