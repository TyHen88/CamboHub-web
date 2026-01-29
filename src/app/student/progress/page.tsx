import { LineChart, Sparkles, Target } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentProgressPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Progress analytics"
        description="Measure your growth across courses, assessments, and project work."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Completion", icon: LineChart, detail: "72% of your active courses are on track." },
          { label: "Assessment", icon: Target, detail: "Average assessment score: 84%." },
          { label: "Consistency", icon: Sparkles, detail: "You completed lessons 4 days this week." },
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
              <CardContent className="text-sm text-muted-foreground">
                {item.detail}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly goals</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {["Finish 2 lessons", "Submit capstone outline"].map((goal) => (
            <div key={goal} className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
              {goal}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
