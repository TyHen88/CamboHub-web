import Link from "next/link";
import { Plus } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const courses = [
  { id: "c1", title: "Full-Stack Foundations", status: "PUBLISHED" },
  { id: "c2", title: "DevOps Essentials", status: "DRAFT" },
  { id: "c3", title: "AI Product Builder", status: "PUBLISHED" },
];

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Courses"
        description="Create, update, and publish course content."
        action={
          <Button asChild>
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-4 w-4" /> New course
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    <Badge variant={course.status === "PUBLISHED" ? "default" : "outline"}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" asChild>
                      <Link href={`/admin/courses/${course.id}/edit`}>Edit</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
