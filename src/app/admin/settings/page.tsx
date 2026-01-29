import { ShieldCheck, Sliders, Users2 } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Admin settings"
        description="Configure platform defaults and access policies."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Roles & access", icon: ShieldCheck },
          { title: "Learning settings", icon: Sliders },
          { title: "Partner access", icon: Users2 },
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
                <Button variant="outline">Manage</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
