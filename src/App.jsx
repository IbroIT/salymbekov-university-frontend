import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './i18n';
import Navbar from './components/Navbar';
import './App.css';
import Footer from "./components/Footer";
import Hero from "./components/Home/hero";

import About from "./components/About/About";
import Management from "./components/About/Management";
import Documents from "./components/About/Documents";
import Careers from "./components/About/Careers";
import Partners from "./components/About/Partners";

import Academics from './components/academics/academics'
import Faculties from './components/academics/faculties'
import Deparments from './components/academics/departments'
import Calendar from './components/academics/calendar'
import Resources from "./components/academics/resources";

import LifeOverview from "./components/Life/LifeOverview";
import ClubsSection from "./components/Life/ClubsSection";
import InternationalStudents from "./components/Life/InternationalStudents";
import Gallery from "./components/Life/Gallery";

// Страницы-заглушки
const Page = ({ title }) => <h1 className="text-2xl font-bold p-8">{title}</h1>;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="pt-16">
          <Routes>
            {/* About */}
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/management" element={<Management />} />
            <Route path="/about/documents" element={<Documents />} />
            <Route path="/about/vacancies" element={<Careers />} />
            <Route path="/about/partners" element={<Partners />} />

            {/* Academics */}
            <Route path="/academics" element={<Academics />} />
            <Route path="/academics/faculties" element={<Faculties />} />
            <Route path="/academics/departments" element={<Deparments />} />
            <Route path="/academics/calendar" element={<Calendar />} />
            <Route path="/academics/resources" element={<Resources />} />

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
            <Route path="/campus-life" element={<LifeOverview />} />
            <Route path="/campus-life/events" element={<Page title="Campus Events" />} />
            <Route path="/campus-life/clubs" element={<ClubsSection/>} />
            <Route path="/campus-life/gallery" element={<Gallery/>} />
            <Route path="/campus-life/international" element={<InternationalStudents/>} />

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
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
