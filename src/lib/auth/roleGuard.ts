import { Role, User } from "@prisma/client";

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function requireUser(user: User | null) {
  if (!user) {
    throw new AuthError("Unauthorized", 401);
  }

  return user;
}

export function requireRole(user: User | null, roles: Role[]) {
  if (!user) {
    throw new AuthError("Unauthorized", 401);
  }

  if (!roles.includes(user.role)) {
    throw new AuthError("Forbidden", 403);
  }

  return user;
}
