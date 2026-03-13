import { useOutletContext } from "react-router-dom";
import PricingCard from "../components/PricingCard";
import SectionHeading from "../components/SectionHeading";
import { plans } from "../data/plans";

export default function PricingPage() {
  const { selectedPlan, setSelectedPlan } = useOutletContext();

  return (
    <div>
      <SectionHeading
        eyebrow="Pricing"
        title="Simple plans for solo developers and teams"
        body="Ready for real billing logic later."
      />
      <div className="mt-10 grid gap-6 xl:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} currentPlan={selectedPlan} onSelect={setSelectedPlan} />
        ))}
      </div>
    </div>
  );
}
