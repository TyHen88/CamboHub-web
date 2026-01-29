import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { getCurrentUserFromToken } from "@/lib/auth/getServerUser";
import { AuthError, requireRole } from "@/lib/auth/roleGuard";

export async function GET(request: Request) {
  const currentUser = await getCurrentUserFromToken(request);

  try {
    requireRole(currentUser, ["ADMIN"]);

    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { user: true },
    });

    return NextResponse.json({ logs });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Unable to load audit logs" }, { status: 500 });
  }
}
