import { BarChart, PieChart, TrendingUp } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Reports & analytics"
        description="Export insights across cohorts, courses, and engagement."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Engagement", icon: BarChart },
          { title: "Completion", icon: PieChart },
          { title: "Career outcomes", icon: TrendingUp },
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
                Snapshot metrics available for export.
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Executive summary</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Learner satisfaction: 4.7/5 • Partner hiring inquiries: 18 this quarter.
        </CardContent>
      </Card>
    </div>
  );
}
