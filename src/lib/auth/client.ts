import { firebaseAuth } from "@/lib/firebase/client";

export async function getIdToken() {
  const user = firebaseAuth.currentUser;
  if (!user) {
    throw new Error("Not authenticated");
  }

  return user.getIdToken();
}
