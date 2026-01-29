import {
  ArrowRight,
  BookOpenCheck,
  Globe2,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const learningPaths = [
  {
    title: "Full-Stack Web Engineer",
    desc: "From HTML to cloud deployments with production-grade projects.",
  },
  {
    title: "AI Product Builder",
    desc: "Build intelligent apps with data, APIs, and user research.",
  },
  {
    title: "Cloud & DevOps",
    desc: "Deploy, monitor, and scale modern systems for real users.",
  },
];

const testimonials = [
  {
    name: "Sophea N.",
    role: "Junior Frontend Engineer",
    quote:
      "CamNextGen helped me bridge the gap between university and real-world product work.",
  },
  {
    name: "Dara P.",
    role: "QA Analyst",
    quote:
      "The learning paths kept me focused, and the mentors were genuinely invested.",
  },
  {
    name: "Chenda T.",
    role: "Full-Stack Intern",
    quote:
      "I launched my portfolio projects and got interview-ready within weeks.",
  },
];

const stats = [
  { label: "Learners mentored", value: "2,800+" },
  { label: "Industry-aligned courses", value: "120" },
  { label: "Hiring partners", value: "45" },
  { label: "Job-ready projects", value: "300+" },
];

const logos = ["Vattanac", "Wing", "Smart", "RMA", "Bred", "ChipMong"];

export default function HomePage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_left,hsl(32_100%_92%),transparent_55%),radial-gradient(circle_at_bottom_right,hsl(166_72%_90%),transparent_45%)]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          CamNextGen
        </div>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="#paths" className="hover:text-foreground">
            Learning Paths
          </Link>
          <Link href="#impact" className="hover:text-foreground">
            Impact
          </Link>
          <Link href="#community" className="hover:text-foreground">
            Community
          </Link>
          <Link href="#events" className="hover:text-foreground">
            Events
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost">
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Start Learning</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              Cambodia-focused, globally competitive
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Bridge academic theory to industry-ready Cambodian IT talent.
            </h1>
            <p className="text-lg text-muted-foreground">
              CamNextGen empowers the next generation of Cambodian IT professionals by
              delivering barrier-free, high-impact technical education aligned with real
              industry demand.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/auth/register">
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/student/catalog">Browse Courses</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BookOpenCheck className="h-4 w-4 text-primary" />
                    Curated Curricula
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Industry-reviewed learning modules with projects and feedback loops.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Verified Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Assessments that map learners to the right path and outcomes.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Globe2 className="h-4 w-4 text-primary" />
                    Global Standards
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  English-ready documentation, tools, and career preparation.
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
            <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
            <Card className="relative overflow-hidden border-border/60 shadow-2xl">
              <CardHeader>
                <CardTitle>CamNextGen Impact Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="text-xl font-semibold">{stat.value}</span>
                  </div>
                ))}
                <div className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Next cohort opens soon</p>
                  <p>Limited seats for hands-on mentorship and workshops.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="paths" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Featured learning paths</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Build momentum with structured, outcome-driven roadmaps.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/student/learning-paths">View all paths</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {learningPaths.map((path) => (
              <Card key={path.title}>
                <CardHeader>
                  <CardTitle>{path.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {path.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="impact" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-2xl">Purpose-driven outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  We align every module, assignment, and assessment with real-world job
                  requirements in Cambodia and across Southeast Asia.
                </p>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5" />
                  <span>Industry mentorship + project reviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <LineChart className="h-5 w-5" />
                  <span>Analytics-driven progress tracking</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>What learners say</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="rounded-2xl bg-muted p-4">
                    <p className="text-sm text-muted-foreground">“{testimonial.quote}”</p>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="community" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="rounded-3xl border border-border bg-card px-8 py-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-semibold">Built with community in mind</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Join peer cohorts, ask questions, and grow with mentors who care.
                </p>
              </div>
              <Button asChild>
                <Link href="/student/community">Join the Q&A space</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                "Weekly live labs",
                "Peer-reviewed projects",
                "Career readiness coaching",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-muted p-4 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="events" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Workshops & events</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hands-on events designed to connect learners with industry leaders.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/student/events">Browse events</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["Cloud Career Clinic", "Product Design Sprint", "AI Hack Night"].map(
              (event) => (
                <Card key={event}>
                  <CardHeader>
                    <CardTitle>{event}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Phnom Penh • Live + Streamed • Limited seats
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="rounded-3xl border border-border bg-muted/40 px-8 py-10">
            <h2 className="text-2xl font-semibold">Trusted by local partners</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-muted-foreground sm:grid-cols-3 lg:grid-cols-6">
              {logos.map((logo) => (
                <div
                  key={logo}
                  className="flex items-center justify-center rounded-2xl border border-border bg-background px-3 py-4"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background/80">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <p>© 2026 CamNextGen. Empowering Cambodia&apos;s tech talent.</p>
          <div className="flex items-center gap-6">
            <Link href="/auth/login" className="hover:text-foreground">
              Sign in
            </Link>
            <Link href="/auth/register" className="hover:text-foreground">
              Join now
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
