import { CalendarPlus, MapPin } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const events = [
  { title: "Cloud Career Clinic", location: "Phnom Penh", date: "Feb 12, 2026" },
  { title: "AI Hack Night", location: "Online", date: "Mar 28, 2026" },
];

export default function AdminEventsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Events"
        description="Plan and manage workshops for learners."
        action={
          <Button>
            <CalendarPlus className="mr-2 h-4 w-4" /> Create event
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.title}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {event.location}
              </div>
              <div className="mt-2">{event.date}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
