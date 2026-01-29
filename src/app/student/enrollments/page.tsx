import { Calendar, CheckCircle2, ShieldCheck } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const enrollments = [
  { course: "Full-Stack Foundations", status: "Active", start: "Jan 10, 2026" },
  { course: "Cloud Deployment Essentials", status: "Active", start: "Jan 18, 2026" },
  { course: "AI Product Studio", status: "Completed", start: "Nov 2, 2025" },
];

export default function StudentEnrollmentsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Your enrollments"
        description="Track every course you have joined and your current status."
      />

      <Card>
        <CardHeader>
          <CardTitle>Enrollment summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Active", value: "2", icon: ShieldCheck },
            { label: "Completed", value: "5", icon: CheckCircle2 },
            { label: "Upcoming", value: "1", icon: Calendar },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-muted p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" /> {item.label}
              </div>
              <p className="mt-2 text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((row) => (
                <TableRow key={row.course}>
                  <TableCell className="font-medium">{row.course}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === "Completed" ? "secondary" : "default"}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.start}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
