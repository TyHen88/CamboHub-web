"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Clock, Star } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { getIdToken } from "@/lib/auth/client";

async function fetchCourses() {
  const response = await fetch("/api/courses");
  if (!response.ok) {
    throw new Error("Unable to load courses");
  }
  const data = await response.json();
  return data.courses as Array<{
    id: string;
    title: string;
    description: string;
    level: string;
    durationWeeks: number | null;
  }>;
}

export default function StudentCatalogPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  const handleEnroll = async (courseId: string) => {
    try {
      setEnrollingId(courseId);
      const token = await getIdToken();
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to enroll");
      }
      toast.success("Enrollment confirmed", {
        description: "You can now access your course dashboard.",
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Enrollment failed";
      toast.error(message);
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Course catalog"
        description="Browse industry-aligned courses and start learning today."
        action={
          <Button asChild variant="outline">
            <Link href="/student/learning-paths">Explore learning paths</Link>
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-56" />
          ))}
        </div>
      ) : data && data.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No courses published yet. Check back soon for new learning paths.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((course) => (
            <Card key={course.id} className="flex h-full flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{course.level}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 text-accent" /> 4.8
                  </div>
                </div>
                <CardTitle className="mt-3">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {course.description}
                <div className="mt-4 flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" /> 12 lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {course.durationWeeks ?? 6} weeks
                  </span>
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex items-center gap-2">
                <Button
                  className="w-full"
                  onClick={() => handleEnroll(course.id)}
                  disabled={enrollingId === course.id}
                >
                  {enrollingId === course.id ? "Enrolling..." : "Enroll"}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Preview</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{course.title}</DialogTitle>
                      <DialogDescription>Course overview</DialogDescription>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                      {course.description}
                    </p>
                    <Button variant="secondary" asChild>
                      <Link href={`/student/courses/${course.id}`}>View details</Link>
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
