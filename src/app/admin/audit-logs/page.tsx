import SectionHeader from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const logs = [
  { action: "auth.bootstrap", actor: "admin@camnextgen.dev", time: "Jan 29, 2026" },
  { action: "course.publish", actor: "admin@camnextgen.dev", time: "Jan 28, 2026" },
  { action: "enrollment.create", actor: "learner@camnextgen.dev", time: "Jan 28, 2026" },
];

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Audit logs"
        description="Track sensitive actions and system events."
      />

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={`${log.action}-${log.time}`}>
                  <TableCell>
                    <Badge variant="secondary">{log.action}</Badge>
                  </TableCell>
                  <TableCell>{log.actor}</TableCell>
                  <TableCell>{log.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
