"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Page() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <div className="text-white">
      <p>Hello {JSON.stringify(user)}</p>

      <div>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>

      <div>
        <button onClick={() => router.push("/signin")}>Login</button>
      </div>
    </div>
  );
}
