"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "none",
        border: "none",
        color: "#555",
        fontSize: "0.75rem",
        cursor: "pointer",
        padding: 0,
      }}
    >
      Sign out
    </button>
  );
}
