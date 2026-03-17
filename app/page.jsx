"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AdminPage,
  AppShell,
  BookingsPage,
  DevelopersPage,
  MarketplaceLanding,
  examplePrompts,
} from "./marketplace-ui";

export default function HomePage() {
  const router = useRouter();
  const [page, setPage] = useState("marketplace");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prompt, setPrompt] = useState(examplePrompts[0]);

  return (
    <AppShell page={page} onSelectPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
      {page === "marketplace" ? <MarketplaceLanding prompt={prompt} setPrompt={setPrompt} onGenerate={() => router.push(`/results?prompt=${encodeURIComponent(prompt)}`)} /> : null}
      {page === "bookings" ? <BookingsPage /> : null}
      {page === "developers" ? <DevelopersPage /> : null}
      {page === "admin" ? <AdminPage /> : null}
    </AppShell>
  );
}
