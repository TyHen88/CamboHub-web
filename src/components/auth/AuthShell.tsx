import { cn } from "@/lib/utils";
import Logo from "@/components/layout/Logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  /** Custom background gradient/color classes */
  backgroundClassName?: string;
  /** Custom card wrapper classes */
  cardClassName?: string;
  /** Custom header classes */
  headerClassName?: string;
  /** Custom content classes */
  contentClassName?: string;
  /** Hide logo */
  hideLogo?: boolean;
}

export default function AuthShell({
  title,
  description,
  children,
  backgroundClassName,
  cardClassName,
  headerClassName,
  contentClassName,
  hideLogo = false,
}: AuthShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center px-4 py-12",
        backgroundClassName ||
        "bg-[radial-gradient(circle_at_top,_hsl(32_94%_88%),_transparent_55%)]",
      )}
    >
      <div className="w-full max-w-md">
        {!hideLogo && (
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
        )}
        <Card className={cn("border-border/60 shadow-xl", cardClassName)}>
          <CardHeader className={headerClassName}>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className={contentClassName}>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
