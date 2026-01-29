import { CalendarDays, MapPin } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const events = [
  {
    title: "Cloud Career Clinic",
    date: "Feb 12, 2026",
    location: "Phnom Penh",
  },
  {
    title: "Product Design Sprint",
    date: "Mar 5, 2026",
    location: "Hybrid",
  },
  {
    title: "AI Hack Night",
    date: "Mar 28, 2026",
    location: "Online",
  },
];

export default function StudentEventsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Events & workshops"
        description="Participate in hands-on workshops and mentorship sessions."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.title}>
            <CardHeader>
              <CardTitle className="text-base">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" /> {event.date}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {event.location}
              </div>
              <Badge variant="secondary">Seats open</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
