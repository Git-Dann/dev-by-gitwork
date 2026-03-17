"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  AdminPage,
  AppShell,
  BookingsPage,
  DevelopersPage,
  MarketplaceResults,
  ProfileModal,
  examplePrompts,
} from "../marketplace-ui";

function ResultsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState("marketplace");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDeveloper, setActiveDeveloper] = useState(null);
  const [prompt, setPrompt] = useState(searchParams.get("prompt") || examplePrompts[0]);
  const [filters, setFilters] = useState({ query: "", stack: "All stacks", availability: "Any availability", maxRate: 900 });

  useEffect(() => {
    setPrompt(searchParams.get("prompt") || examplePrompts[0]);
  }, [searchParams]);

  const handleSelectPage = (nextPage) => {
    if (nextPage === "marketplace") {
      router.push("/");
      return;
    }

    setPage(nextPage);
  };

  return (
    <>
      <AppShell page={page} onSelectPage={handleSelectPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
        {page === "marketplace" ? <MarketplaceResults prompt={prompt} filters={filters} setFilters={setFilters} onOpen={setActiveDeveloper} /> : null}
        {page === "bookings" ? <BookingsPage /> : null}
        {page === "developers" ? <DevelopersPage /> : null}
        {page === "admin" ? <AdminPage /> : null}
      </AppShell>
      <ProfileModal developer={activeDeveloper} onClose={() => setActiveDeveloper(null)} />
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsPageContent />
    </Suspense>
  );
}
