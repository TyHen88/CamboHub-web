import { ClipboardCheck, FileText } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const assignments = [
  { title: "Build a REST API", status: "Due in 3 days" },
  { title: "UI Redesign Sprint", status: "Submitted" },
  { title: "Deployment Checklist", status: "Graded" },
];

export default function StudentAssignmentsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Assignments"
        description="Hands-on work that mirrors real industry tasks."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {assignments.map((assignment, index) => (
          <Card key={assignment.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                {index === 0 ? (
                  <FileText className="h-4 w-4 text-primary" />
                ) : (
                  <ClipboardCheck className="h-4 w-4 text-primary" />
                )}
                {assignment.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{assignment.status}</span>
              <Badge variant="secondary">Course project</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
