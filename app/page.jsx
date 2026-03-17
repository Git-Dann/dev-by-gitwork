"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AdminPage,
  AppShell,
  BookingsPage,
  DevelopersPage,
  MarketplaceLanding,
  developers as initialDevelopers,
  examplePrompts,
  normalizeDeveloperRecord,
} from "./marketplace-ui";

function useStoredState(key, initialValue) {
  const [state, setState] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, loaded, state]);

  return [state, setState];
}

export default function HomePage() {
  const router = useRouter();
  const [page, setPage] = useState("marketplace");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prompt, setPrompt] = useState(examplePrompts[0]);
  const [developerRecordsRaw, setDeveloperRecordsRaw] = useStoredState("dev-by-gitwork-developers", initialDevelopers.map(normalizeDeveloperRecord));
  const developerRecords = useMemo(() => developerRecordsRaw.map(normalizeDeveloperRecord), [developerRecordsRaw]);

  const handleSaveDeveloper = (record) => {
    setDeveloperRecordsRaw((current) => {
      const normalized = normalizeDeveloperRecord({
        ...record,
        id: record.id ?? Date.now()
      });
      const existing = current.some((developer) => developer.id === normalized.id);
      if (existing) return current.map((developer) => developer.id === normalized.id ? normalized : developer);
      return [normalized, ...current];
    });
  };

  const handleToggleDeveloperArchived = (developerId) => {
    setDeveloperRecordsRaw((current) => current.map((developer) => {
      if (developer.id !== developerId) return developer;
      const normalized = normalizeDeveloperRecord(developer);
      return {
        ...normalized,
        profileStatus: normalized.profileStatus === "Archived" ? "Live" : "Archived"
      };
    }));
  };

  return (
    <AppShell page={page} onSelectPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} mainClassName={page === "marketplace" ? "lg:flex lg:min-h-[calc(100dvh-4.75rem)] lg:flex-col lg:py-4 xl:py-5" : undefined}>
      {page === "marketplace" ? <MarketplaceLanding prompt={prompt} setPrompt={setPrompt} onGenerate={() => router.push(`/results?prompt=${encodeURIComponent(prompt)}`)} /> : null}
      {page === "bookings" ? <BookingsPage /> : null}
      {page === "developers" ? <DevelopersPage developers={developerRecords} onSaveDeveloper={handleSaveDeveloper} onToggleDeveloperArchived={handleToggleDeveloperArchived} /> : null}
      {page === "admin" ? <AdminPage /> : null}
    </AppShell>
  );
}
