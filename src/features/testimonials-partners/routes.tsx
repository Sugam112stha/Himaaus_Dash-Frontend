import type { RouteObject } from "react-router-dom";
import { PartnersProvider } from "./hooks/usePartners";
import { MilestonesProvider } from "./hooks/useMilestones";
import { TestimonialsProvider } from "./hooks/useTestimonials";
import PartnersPage from "./pages/Partners";
import AddPartnerPage from "./pages/AddPartner";
import MilestonesPage from "./pages/Milestones";
import AddMilestonePage from "./pages/AddMilestone";
import TestimonialsPage from "./pages/Testimonials";
import AddTestimonialPage from "./pages/AddTestimonial";

/**
 * Route definitions for the Testimonials / Partners / Milestones module.
 * Spread `testimonialsPartnersRoutes` into the app's <Routes> tree.
 */
export const testimonialsPartnersRoutes: RouteObject[] = [
  {
    path: "testimonials/all-testimonials",
    element: (
      <TestimonialsProvider>
        <TestimonialsPage />
      </TestimonialsProvider>
    ),
  },
  {
    path: "testimonials/add-new",
    element: (
      <TestimonialsProvider>
        <AddTestimonialPage />
      </TestimonialsProvider>
    ),
  },
  {
    path: "partners/all-partners",
    element: (
      <PartnersProvider>
        <PartnersPage />
      </PartnersProvider>
    ),
  },
  {
    path: "partners/add-partner",
    element: (
      <PartnersProvider>
        <AddPartnerPage />
      </PartnersProvider>
    ),
  },
  {
    path: "milestones/all-milestones",
    element: (
      <MilestonesProvider>
        <MilestonesPage />
      </MilestonesProvider>
    ),
  },
  {
    path: "milestones/add-milestone",
    element: (
      <MilestonesProvider>
        <AddMilestonePage />
      </MilestonesProvider>
    ),
  },
];
