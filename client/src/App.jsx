import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SessionProvider from "./context/SessionProvider";

import Main from "./layouts/Main";
import Recruiter from "./layouts/Recruiter";
import JobSeeker from "./layouts/JobSeeker";

import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import RecruiterLogin from "./pages/logins/RecruiterLogin";
import JobSeekerLogin from "./pages/logins/JobSeekerLogin";

import Register from "./pages/Register";
import RecruiterRegister from "./pages/registers/RecruiterRegister";
import JobSeekerRegister from "./pages/registers/JobSeekerRegister";
import SelfEmploymentRegister from "./pages/registers/SelfEmploymentRegister";
import Volunteer from "./pages/Volunteer";

import RecruiterDashboard from "./pages/dashboards/RecruiterDashboard";
import JobSeekerDashboard from "./pages/dashboards/JobSeekerDashboard";
import SelfEmployedDashboard from "./pages/dashboards/SelfEmployedDashboard";

import ViewJobs from "./pages/ViewJobs";
import ViewJob from "./pages/ViewJob";
import PostJob from "./pages/PostJob";

import NotFound from "./pages/404";
import EditJob from "./pages/EditJob";

import ManageResume from "./pages/ManageResume";
import CreateResume from "./pages/CreateResume";
import EditResume from "./pages/EditResume";
import ViewResume from "./pages/ViewResume";
import Search from "./pages/Search";
import SearchResults from "./pages/SearchResults";

import CompanyDirectory from "./pages/CompanyDirectory";

import ResumeBank from "./pages/ResumeBank";
import ViewResumeRecruiter from "./pages/ViewResumeRecruiter";

const App = () => {
  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/view-job" element={<ViewJob />} />

            <Route path="/login" element={<Login />} />
            <Route path="/recruiter-login" element={<RecruiterLogin />} />
            <Route path="/job-seeker-login" element={<JobSeekerLogin />} />

            <Route path="/register" element={<Register />} />
            <Route path="/recruiter-register" element={<RecruiterRegister />} />
            <Route
              path="/job-seeker-register"
              element={<JobSeekerRegister />}
            />
            <Route
              path="/self-employment-register"
              element={<SelfEmploymentRegister />}
            />
            <Route path="/volunteer-register" element={<Volunteer />} />
          </Route>

          <Route path="recruiter-dashboard" element={<Recruiter />}>
            <Route index element={<RecruiterDashboard />} />
            <Route path="view-jobs" element={<ViewJobs />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="edit-job/:id" element={<EditJob />} />
            <Route path="resume-bank" element={<ResumeBank />} />
            <Route path="view-resume/:id" element={<ViewResumeRecruiter />} />
          </Route>

          <Route path="job-seeker-dashboard" element={<JobSeeker />}>
            <Route index element={<JobSeekerDashboard />} />
            <Route path="view-resume/:id" element={<ViewResume />} />
            <Route path="manage-resumes" element={<ManageResume />} />
            <Route path="create-resume" element={<CreateResume />} />
            <Route path="edit-resume/:id" element={<EditResume />} />
            <Route path="company-directory" element={<CompanyDirectory />} />
            <Route path="search" element={<Search />} />
            <Route path="search-results" element={<SearchResults />} />
          </Route>

          <Route path="self-employed-dashboard" element={<Recruiter />}>
            <Route index element={<SelfEmployedDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SessionProvider>
  );
};

export default App;
