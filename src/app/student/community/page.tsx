import { MessageCircle, ThumbsUp } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = [
  {
    title: "How do I structure Prisma models for many-to-many?",
    author: "Sokchea",
    replies: 6,
  },
  {
    title: "Best approach to deploy Next.js on Firebase?",
    author: "Vanna",
    replies: 4,
  },
  {
    title: "Need feedback on my portfolio project idea",
    author: "Rina",
    replies: 10,
  },
];

export default function StudentCommunityPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Community Q&A"
        description="Ask questions, share insights, and learn together."
        action={<Button>Ask a question</Button>}
      />

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.title}>
            <CardHeader>
              <CardTitle className="text-base">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
              <span>By {post.author}</span>
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" /> {post.replies}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" /> 12
                </span>
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
