import { ArrowRight, Compass, Map } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const paths = [
  {
    title: "Frontend Specialist",
    desc: "Build accessible, performant UI with React and design systems.",
  },
  {
    title: "Backend & API",
    desc: "Master data modeling, APIs, and scalable infrastructure.",
  },
  {
    title: "Product Builder",
    desc: "Ship full products from idea to deployment.",
  },
];

export default function StudentLearningPathsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Learning paths"
        description="Roadmaps aligned with industry roles and hiring needs."
        action={
          <Button variant="outline">
            Take skill assessment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paths.map((path) => (
          <Card key={path.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-4 w-4 text-primary" /> {path.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>{path.desc}</p>
              <Button variant="secondary" className="w-full">
                View roadmap
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-primary" /> Recommended for you
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Based on your assessment, we suggest the Full-Stack Product Builder path.
        </CardContent>
      </Card>
    </div>
  );
}
