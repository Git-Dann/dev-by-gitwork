"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  AdminPage,
  AppShell,
  BookingFlowModal,
  BookingsPage,
  DevelopersPage,
  MarketplaceResults,
  ProfileModal,
  ShortlistReviewModal,
  developers,
  examplePrompts,
} from "../marketplace-ui";

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

function ResultsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState("marketplace");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDeveloper, setActiveDeveloper] = useState(null);
  const [bookingDeveloper, setBookingDeveloper] = useState(null);
  const [shortlistOpen, setShortlistOpen] = useState(false);
  const [prompt, setPrompt] = useState(searchParams.get("prompt") || examplePrompts[0]);
  const [filters, setFilters] = useState({ query: "", stack: "All stacks", availability: "Any availability", maxRate: 900 });
  const [shortlistIds, setShortlistIds] = useStoredState("dev-by-gitwork-shortlist", []);
  const [shortlistNotes, setShortlistNotes] = useStoredState("dev-by-gitwork-shortlist-notes", {});
  const [bookingRequests, setBookingRequests] = useStoredState("dev-by-gitwork-booking-requests", []);

  useEffect(() => {
    setPrompt(searchParams.get("prompt") || examplePrompts[0]);
  }, [searchParams]);

  const shortlistedDevelopers = developers.filter((developer) => shortlistIds.includes(developer.id));

  const toggleShortlist = (developerId) => {
    setShortlistIds((current) => current.includes(developerId) ? current.filter((id) => id !== developerId) : [...current, developerId]);
  };

  const updateShortlistNote = (developerId, note) => {
    setShortlistNotes((current) => ({ ...current, [developerId]: note }));
  };

  const handleRequestBooking = (developer) => {
    setActiveDeveloper(null);
    setShortlistOpen(false);
    setBookingDeveloper(developer);
  };

  const handleSubmitBookingRequest = (request) => {
    setBookingRequests((current) => [request, ...current]);
    setBookingDeveloper(null);
    setPage("bookings");
  };

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
        {page === "marketplace" ? <MarketplaceResults prompt={prompt} filters={filters} setFilters={setFilters} onOpen={setActiveDeveloper} shortlistIds={shortlistIds} shortlistedDevelopers={shortlistedDevelopers} onToggleShortlist={toggleShortlist} onReviewShortlist={() => setShortlistOpen(true)} onRequestBooking={handleRequestBooking} /> : null}
        {page === "bookings" ? <BookingsPage requests={bookingRequests} /> : null}
        {page === "developers" ? <DevelopersPage /> : null}
        {page === "admin" ? <AdminPage /> : null}
      </AppShell>
      <ProfileModal developer={activeDeveloper} isShortlisted={activeDeveloper ? shortlistIds.includes(activeDeveloper.id) : false} onClose={() => setActiveDeveloper(null)} onToggleShortlist={toggleShortlist} onRequestBooking={handleRequestBooking} />
      <ShortlistReviewModal developers={shortlistOpen ? shortlistedDevelopers : []} notes={shortlistNotes} onClose={() => setShortlistOpen(false)} onToggleShortlist={toggleShortlist} onUpdateNote={updateShortlistNote} onRequestBooking={handleRequestBooking} />
      <BookingFlowModal developer={bookingDeveloper} prompt={prompt} onClose={() => setBookingDeveloper(null)} onSubmit={handleSubmitBookingRequest} />
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
