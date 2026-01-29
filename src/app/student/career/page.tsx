import { Briefcase, FileBadge2, UserCheck } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentCareerPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Career prep"
        description="Prepare for internships, interviews, and real-world roles."
        action={<Button>Book a mock interview</Button>}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Resume clinic", icon: Briefcase },
          { title: "Interview drills", icon: UserCheck },
          { title: "Portfolio review", icon: FileBadge2 },
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
                Get personalized feedback from industry mentors.
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
