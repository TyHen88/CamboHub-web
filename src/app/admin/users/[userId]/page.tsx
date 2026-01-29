import { ShieldCheck, UserCircle } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminUserDetailPage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="User profile"
        description={`User ID: ${params.userId}`}
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-primary" /> Soklin Dara
          </CardTitle>
          <Badge>STUDENT</Badge>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Email verified • Active learner
        </CardContent>
      </Card>

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Recent activity</TabsTrigger>
          <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Last login: Jan 29, 2026 • Completed React Fundamentals lesson.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="enrollments">
          <Card>
            <CardHeader>
              <CardTitle>Enrollments</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              3 active courses • 1 completed course.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Security status
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              No suspicious activity detected.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
