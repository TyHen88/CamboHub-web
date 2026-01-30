"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useCreateAdminCourse } from "@/lib/hooks/useAdminCourses";

export default function AdminCourseNewPage() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateAdminCourse();
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [durationWeeks, setDurationWeeks] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length < 3) {
      toast.error("Course title must be at least 3 characters.");
      return;
    }

    if (description.trim().length < 10) {
      toast.error("Description must be at least 10 characters.");
      return;
    }

    const durationValue = durationWeeks.trim() ? Number(durationWeeks) : undefined;
    if (durationWeeks.trim() && Number.isNaN(durationValue)) {
      toast.error("Duration must be a number.");
      return;
    }

    try {
      await mutateAsync({
        title: title.trim(),
        description: description.trim(),
        level: level.trim() || undefined,
        durationWeeks: durationValue,
        status: "DRAFT",
      });
      toast.success("Course saved", {
        description: "Draft created successfully.",
      });
      router.push("/admin/courses");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to create course";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Create course"
        description="Add new learning content and publish when ready."
      />

      <Card>
        <CardContent className="space-y-6 pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Course title</Label>
                <Input
                  id="title"
                  placeholder="Full-Stack Foundations"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  placeholder="Beginner / Intermediate"
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="durationWeeks">Duration (weeks)</Label>
                <Input
                  id="durationWeeks"
                  type="number"
                  min={1}
                  placeholder="6"
                  value={durationWeeks}
                  onChange={(event) => setDurationWeeks(event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe outcomes, projects, and skills learners will gain."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                <Save className="mr-2 h-4 w-4" />
                {isPending ? "Saving..." : "Save draft"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
