import Link from "next/link";
import { Plus } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const users = [
  { id: "1", name: "Soklin Dara", role: "STUDENT", status: "ACTIVE" },
  { id: "2", name: "Admin Bot", role: "ADMIN", status: "ACTIVE" },
  { id: "3", name: "Sophea N.", role: "STUDENT", status: "INACTIVE" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Users"
        description="Manage learners and administrators across the platform."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add user
          </Button>
        }
      />

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "ACTIVE" ? "default" : "outline"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" asChild>
                      <Link href={`/admin/users/${user.id}`}>View</Link>
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
