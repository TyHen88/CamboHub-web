import { Megaphone, Plus } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const announcements = [
  {
    title: "New cohort starts Feb 15",
    desc: "Invite learners to apply for the spring cohort.",
  },
  {
    title: "Workshop: API Security",
    desc: "Live session with industry mentor on Feb 5.",
  },
];

export default function AdminAnnouncementsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Announcements"
        description="Broadcast updates to learners and admins."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New announcement
          </Button>
        }
      />

      <div className="grid gap-6">
        {announcements.map((announcement) => (
          <Card key={announcement.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-primary" /> {announcement.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {announcement.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
