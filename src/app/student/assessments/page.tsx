import { Gauge, Target, Wand2 } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentAssessmentsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Skill assessments"
        description="Evaluate your readiness and unlock the right roadmap."
        action={<Button>Start new assessment</Button>}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Frontend readiness", icon: Target },
          { title: "Backend fundamentals", icon: Gauge },
          { title: "DevOps basics", icon: Wand2 },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className="h-4 w-4 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                20 questions • 15 minutes
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
