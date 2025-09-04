import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './i18n';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home/Home';
import Facts from './components/Home/FactsSection';
import Programs from './components/Home/ProgramCards';
import Reviews from './components/Home/Reviews';
import Partners from "./components/Home/Partners";
import Footer from "./components/Footer";

// About Section Components
import About from './components/About/About';
import Management from './components/About/Management';
import Documents from './components/About/Documents';
import Careers from './components/About/Careers';
import VacancyDetail from './components/About/VacancyDetail';
import AboutPartners from './components/About/Partners';

// Страницы-заглушки
const Page = ({ title }) => <h1 className="text-2xl font-bold p-8">{title}</h1>;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Home Route - показывает все компоненты на главной */}
          <Route path="/" element={
            <>
              <Home />
              <Facts />
              <Programs />
              <Reviews />
              <Partners />
            </>
          } />

          {/* About Section */}
          <Route path="/about" element={<About />} />
          <Route path="/about/management" element={<Management />} />
          <Route path="/about/documents" element={<Documents />} />
          <Route path="/about/vacancies" element={<Careers />} />
          <Route path="/about/vacancies/:id" element={<VacancyDetail />} />
          <Route path="/about/partners" element={<AboutPartners />} />

          {/* Academics */}
          <Route path="/academics" element={<Page title="Programs" />} />
          <Route path="/academics/faculties" element={<Page title="Faculties" />} />
          <Route path="/academics/departments" element={<Page title="Departments" />} />
          <Route path="/academics/calendar" element={<Page title="Academic Calendar" />} />
          <Route path="/academics/resources" element={<Page title="Resources" />} />

          {/* Admission */}
          <Route path="/admission" element={<Page title="Admission Process" />} />
          <Route path="/admission/requirements" element={<Page title="Requirements" />} />
          <Route path="/admission/tuition" element={<Page title="Tuition" />} />
          <Route path="/admission/scholarships" element={<Page title="Scholarships" />} />
          <Route path="/admission/apply" element={<Page title="Apply Online" />} />

          {/* Research */}
          <Route path="/research" element={<Page title="Research Areas" />} />
          <Route path="/research/centers" element={<Page title="Research Centers" />} />
          <Route path="/research/publications" element={<Page title="Publications" />} />
          <Route path="/research/conferences" element={<Page title="Conferences" />} />
          <Route path="/research/grants" element={<Page title="Grants" />} />

          {/* Campus Life */}
          <Route path="/campus-life" element={<Page title="Student Life" />} />
          <Route path="/campus-life/events" element={<Page title="Campus Events" />} />
          <Route path="/campus-life/clubs" element={<Page title="Clubs" />} />
          <Route path="/campus-life/gallery" element={<Page title="Gallery" />} />
          <Route path="/campus-life/international" element={<Page title="International" />} />

          {/* News */}
          <Route path="/news" element={<Page title="All News" />} />
          <Route path="/news/events" element={<Page title="News Events" />} />
          <Route path="/news/announcements" element={<Page title="Announcements" />} />
          <Route path="/news/articles" element={<Page title="Articles" />} />

          {/* Contacts */}
          <Route path="/contacts" element={<Page title="Contacts" />} />
          <Route path="/contacts/admission" element={<Page title="Admission Office" />} />
          <Route path="/contacts/map" element={<Page title="Map" />} />
          <Route path="/contacts/feedback" element={<Page title="Feedback" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
