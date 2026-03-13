import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AuthModal from "../ui/AuthModal";
import ResourceModal from "../ui/ResourceModal";

export default function AppLayout() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [signedIn, setSignedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [activeResource, setActiveResource] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          signedIn={signedIn}
        />

        <div className="min-w-0 flex-1">
          <Header
            signedIn={signedIn}
            setSignedIn={setSignedIn}
            setAuthOpen={setAuthOpen}
            setMobileOpen={setMobileOpen}
            selectedPlan={selectedPlan}
          />

          <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            <Outlet
              context={{
                selectedPlan,
                setSelectedPlan,
                signedIn,
                setSignedIn,
                setAuthOpen,
                setActiveResource,
              }}
            />
          </main>
        </div>
      </div>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSubmit={() => {
          setSignedIn(true);
          setAuthOpen(false);
        }}
      />

      <ResourceModal
        item={activeResource}
        selectedPlan={selectedPlan}
        onClose={() => setActiveResource(null)}
      />
    </div>
  );
}
