import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { adminAuth } from "@/lib/firebase/admin";
import { setSessionCookies } from "@/lib/auth/session";

export async function POST(request: Request) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  try {
    const idToken = header.replace("Bearer ", "").trim();
    const decoded = await adminAuth.verifyIdToken(idToken);

    if (!decoded.email) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }

    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    const role = adminEmails.includes(decoded.email.toLowerCase())
      ? "ADMIN"
      : "STUDENT";

    let user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: decoded.uid,
          email: decoded.email,
          displayName: decoded.name ?? decoded.email.split("@")[0],
          role,
          status: "ACTIVE",
        },
      });

      await prisma.auditLog.create({
        data: {
          action: "auth.bootstrap",
          entityType: "User",
          entityId: user.id,
          userId: user.id,
          metadata: {
            source: "firebase",
          },
        },
      });
    } else {
      if (adminEmails.includes(decoded.email.toLowerCase()) && user.role !== "ADMIN") {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { role: "ADMIN" },
        });
        await prisma.auditLog.create({
          data: {
            action: "role.update",
            entityType: "User",
            entityId: user.id,
            userId: user.id,
            metadata: { role: "ADMIN" },
          },
        });
      }
      if (decoded.name && decoded.name !== user.displayName) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { displayName: decoded.name },
        });
      }
    }

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        status: user.status,
      },
    });

    if (decoded.email_verified) {
      setSessionCookies(response, { uid: user.id, role: user.role });
    }

    return response;
  } catch (error) {
    console.error("Bootstrap failed", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
