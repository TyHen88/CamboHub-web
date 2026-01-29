"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { LogOut, User } from "lucide-react";

import { firebaseAuth } from "@/lib/firebase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function UserMenu() {
  const router = useRouter();
  const [name, setName] = useState("Learner");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      setName(user?.displayName || "Learner");
      setEmail(user?.email ?? null);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(firebaseAuth);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <User className="h-4 w-4" />
          <span className="hidden text-sm font-medium md:inline">{name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="text-sm font-medium">{name}</p>
          {email && <p className="text-xs text-muted-foreground">{email}</p>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/student/profile")}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/student/settings")}>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
