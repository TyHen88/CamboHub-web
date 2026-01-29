import SectionHeader from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const rows = [
  { user: "Soklin Dara", course: "Full-Stack Foundations", status: "ACTIVE" },
  { user: "Rina T.", course: "AI Product Builder", status: "ACTIVE" },
  { user: "Sophea N.", course: "Cloud Essentials", status: "COMPLETED" },
];

export default function AdminEnrollmentsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Enrollments"
        description="Monitor learner participation across all courses."
      />

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={`${row.user}-${row.course}`}>
                  <TableCell className="font-medium">{row.user}</TableCell>
                  <TableCell>{row.course}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === "ACTIVE" ? "default" : "secondary"}>
                      {row.status}
                    </Badge>
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
