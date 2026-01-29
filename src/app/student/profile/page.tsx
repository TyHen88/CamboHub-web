import { Camera } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StudentProfilePage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Profile"
        description="Update your personal information and learning preferences."
      />

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <Camera className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Upload profile photo</p>
              <p className="text-xs text-muted-foreground">PNG or JPG up to 2MB</p>
            </div>
            <Button variant="outline" className="ml-auto">
              Upload
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="Soklin Dara" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="learner@camnextgen.dev" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Primary focus</Label>
              <Input id="role" defaultValue="Full-Stack Engineer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="Phnom Penh" />
            </div>
          </div>

          <Button className="w-fit">Save changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
