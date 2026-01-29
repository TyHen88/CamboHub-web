import { Bell, CheckCircle2 } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const notifications = [
  {
    title: "New assignment posted",
    desc: "Build a REST API and submit by Friday.",
  },
  {
    title: "Mentor feedback available",
    desc: "Your capstone outline has been reviewed.",
  },
  {
    title: "Event reminder",
    desc: "Cloud Career Clinic starts tomorrow at 7 PM.",
  },
];

export default function StudentNotificationsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Notifications"
        description="Stay on top of deadlines, announcements, and updates."
      />

      <div className="grid gap-4">
        {notifications.map((note, index) => (
          <Card key={note.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                {index === 0 ? (
                  <Bell className="h-4 w-4 text-primary" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
                {note.title}
              </CardTitle>
              <Badge variant={index === 0 ? "default" : "secondary"}>
                {index === 0 ? "New" : "Read"}
              </Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {note.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
