import { BookOpen, LineChart, Users2 } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Admin dashboard"
        description="Monitor platform health, learning outcomes, and operational metrics."
        action={<Button>Export report</Button>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total learners", value: "2,842", icon: Users2 },
          { label: "Active courses", value: "86", icon: BookOpen },
          { label: "Completion rate", value: "78%", icon: LineChart },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className="h-4 w-4 text-primary" />
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">{item.value}</CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform highlights</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
            Top performing course: Full-Stack Foundations
          </div>
          <div className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
            Most engaged cohort: Phnom Penh January 2026
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
