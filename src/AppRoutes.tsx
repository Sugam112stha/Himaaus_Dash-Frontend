// Every route in the app lives here, in one place.
//
// In plain words: this file is the "map" — it says which URL shows which
// page. If you ever want to see (or change) what page an address goes to,
// this is the only file you need to open.

import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import OverviewPage from './pages/OverviewPage'
import DirectorMessagePage from './pages/DirectorMessagePage'
import AllEpisodesPage from './pages/podcast/AllEpisodesPage'
import AddEpisodePage from './pages/podcast/AddEpisodePage'
import EligibilitySubmissionsPage from './components/EligibilitySubmissions'
import EligibilityCriteriaPage from './components/EligibilityCriteria'
import TeamMembersList from './components/TeamMembersList'
import TeamMemberForm from './components/TeamMemberForm'
import PlaceholderPage from './pages/PlaceholderPage'
import { navSections } from './data'
import { buildRouteList } from './lib/routes'
import AppointmentsPage from './components/Appointments/AppointmentsPage'
import ContactUsPage from './components/Contact-us/ContactUsPage'
import AllPostsPage from './pages/blog/AllPostsPage'
import NewPostPage from './pages/blog/NewPostPage'
import EditPostPage from './pages/blog/EditPostPage'
import AllFAQsPage from './pages/faq/AllFAQsPage'
import AddFAQPage from './pages/faq/AddFAQPage'
import AllNoticesPage from './pages/notice/AllNoticesPage'
import AddNoticePage from './pages/notice/AddNoticePage'
import AllMediaPage from './pages/gallery/AllMediaPage'
import UploadPage from './pages/gallery/UploadPage'
import UpcomingEventsPage from './pages/events/UpcomingEventsPage'
import PastEventsPage from './pages/events/PastEventsPage'
import AddEventPage from './pages/events/AddEventPage'
import {
  PartnersProvider,
  PartnersPage,
  AddPartnerPage,
  TestimonialsProvider,
  TestimonialsPage,
  AddTestimonialPage,
  MilestonesProvider,
  MilestonesPage,
  AddMilestonePage,
} from './features/testimonials-partners'

// Every sidebar link, turned into a { path, label } pair.
const allRoutes = buildRouteList(navSections)

// Paths that already have a real page built for them (see below). Every
// other path in allRoutes falls back to the "coming soon" placeholder.
const builtInPaths = new Set([
  '/',
  '/director-message',
  '/podcast/all-episodes',
  '/podcast/add-episode',
  '/blog-posts/all-posts',
  '/blog-posts/new-post',
  '/blog-posts/edit',
  '/partners/all-partners',
  '/partners/add-partner',
  '/testimonials/all-testimonials',
  '/testimonials/add-new',
  '/milestones/all-milestones',
  '/milestones/add-milestone',
  '/eligibility/submissions',
  '/eligibility/criteria',
  '/team-profiles/all-members',
  '/team-profiles/add-member',
  '/team-profiles/edit-member',
  '/faq/all-faqs',
  '/faq/add-faq',
  '/notice/all-notices',
  '/notice/add-notice',
  '/gallery/all-media',
  '/gallery/upload',
  '/events/upcoming',
  '/events/past-events',
  '/events/add-event',
])

interface AppRoutesProps {
  onLogout: () => void
}

export default function AppRoutes({ onLogout }: AppRoutesProps) {
  return (
    <Routes>
      <Route element={<DashboardLayout onLogout={onLogout} />}>
        {/* Pages with real, built content */}
        <Route path="/" element={<OverviewPage />} />
        <Route path="/director-message" element={<DirectorMessagePage />} />
        <Route path="/podcast/all-episodes" element={<AllEpisodesPage />} />
        <Route path="/podcast/add-episode" element={<AddEpisodePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/contacts" element={<ContactUsPage />} />
        <Route path="/blog-posts/all-posts" element={<AllPostsPage />} />
        <Route path="/blog-posts/new-post" element={<NewPostPage />} />
        <Route path="/blog-posts/edit/:id" element={<EditPostPage />} />
        <Route path="/gallery/all-media" element={<AllMediaPage />} />
        <Route path="/gallery/upload" element={<UploadPage />} />
        <Route path="/events/upcoming" element={<UpcomingEventsPage />} />
        <Route path="/events/past-events" element={<PastEventsPage />} />
        <Route path="/events/add-event" element={<AddEventPage />} />
        <Route path="/partners/all-partners" element={<PartnersProvider><PartnersPage /></PartnersProvider>} />
        <Route path="/partners/add-partner" element={<PartnersProvider><AddPartnerPage /></PartnersProvider>} />
        <Route path="/testimonials/all-testimonials" element={<TestimonialsProvider><TestimonialsPage /></TestimonialsProvider>} />
        <Route path="/testimonials/add-new" element={<TestimonialsProvider><AddTestimonialPage /></TestimonialsProvider>} />
        <Route path="/milestones/all-milestones" element={<MilestonesProvider><MilestonesPage /></MilestonesProvider>} />
        <Route path="/milestones/add-milestone" element={<MilestonesProvider><AddMilestonePage /></MilestonesProvider>} />
        <Route path="/faq/all-faqs" element={<AllFAQsPage />} />
        <Route path="/faq/add-faq" element={<AddFAQPage />} />
        <Route path="/notice/all-notices" element={<AllNoticesPage />} />
        <Route path="/notice/add-notice" element={<AddNoticePage />} />

        <Route path="/eligibility/submissions" element={<EligibilitySubmissionsPage />} />
        <Route path="/eligibility/criteria" element={<EligibilityCriteriaPage />} />
        <Route path="/team-profiles/all-members" element={<TeamMembersList />} />
        <Route path="/team-profiles/add-member" element={<TeamMemberForm />} />
        <Route path="/team-profiles/edit-member/:id" element={<TeamMemberForm />} />

        {/* Every other sidebar link still works as a real page — it just
            shows a simple "coming soon" placeholder until it's built. */}
        {allRoutes
          .filter((route) => !builtInPaths.has(route.path))
          .map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PlaceholderPage title={route.label} />}
            />
          ))}
      </Route>
    </Routes>
  )
}
