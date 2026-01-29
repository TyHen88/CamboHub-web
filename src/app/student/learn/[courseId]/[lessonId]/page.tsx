import { BookOpenCheck, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LessonPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Course / Lesson</p>
          <h1 className="text-2xl font-semibold">Intro to API Design</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/student/courses/${params.courseId}`}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to course
            </Link>
          </Button>
          <Button>
            Next lesson <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpenCheck className="h-4 w-4 text-primary" /> Lesson overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Learn how to design resilient APIs with clear contracts, error handling, and
            data validation techniques used in production environments.
          </p>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-primary" /> 18 minutes
          </div>
          <div className="rounded-2xl border border-border bg-muted/60 p-4">
            <p className="font-medium text-foreground">Learning objectives</p>
            <ul className="mt-2 list-disc pl-4">
              <li>Define core API design principles</li>
              <li>Model request and response contracts</li>
              <li>Design meaningful error responses</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
