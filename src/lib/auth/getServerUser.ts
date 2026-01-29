import { Role, User } from "@prisma/client";
import { adminAuth } from "@/lib/firebase/admin";
import { prisma } from "@/lib/db";

export type CurrentUser = User & {
  firebaseClaims: {
    uid: string;
    email?: string;
  };
};

export async function getCurrentUserFromToken(
  request: Request,
): Promise<CurrentUser | null> {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return null;
  }

  const idToken = header.replace("Bearer ", "").trim();
  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      firebaseClaims: { uid: decoded.uid, email: decoded.email },
    };
  } catch (error) {
    console.error("Token verification failed", error);
    return null;
  }
}

export function hasRole(user: User | null, roles: Role[]) {
  if (!user) {
    return false;
  }

  return roles.includes(user.role);
}
