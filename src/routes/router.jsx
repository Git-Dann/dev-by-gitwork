import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import JobsPage from "../pages/JobsPage";
import PricingPage from "../pages/PricingPage";
import ResourcesPage from "../pages/ResourcesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "resources", element: <ResourcesPage /> },
      { path: "jobs", element: <JobsPage /> },
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
]);
