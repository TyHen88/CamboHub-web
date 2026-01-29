import { BellRing, Lock, ShieldCheck } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StudentSettingsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Settings"
        description="Manage security, notifications, and preferences."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lock className="h-4 w-4 text-primary" /> Password & security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" />
            </div>
            <Button>Update password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BellRing className="h-4 w-4 text-primary" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
              <span>Email updates</span>
              <ShieldCheck className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
              <span>Event reminders</span>
              <ShieldCheck className="h-4 w-4 text-primary" />
            </div>
            <Button variant="outline">Manage preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
