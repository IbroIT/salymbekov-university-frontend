import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from './components/Navbar';
import './App.css';
import Footer from "./components/Footer";
import Hero from "./components/Home/hero";

import About from "./components/About/About";
import Management from "./components/About/Management";
import Careers from "./components/About/Careers";
import VacancyDetail from "./components/About/VacancyDetail";
import Partners from "./components/About/Partners";

import HSM from './components/academics/academics'
import Faculties from './components/academics/faculties'
import Deparments from './components/academics/departments'
import Calendar from './components/academics/calendar'
import Resources from "./components/academics/resources";

import LifeOverview from "./components/Life/LifeOverview";
import ClubsSection from "./components/Life/ClubsSection";
import InternationalStudents from "./components/Life/InternationalStudents";
import Gallery from "./components/Life/Gallery";

import AdmissionsOverview from "./components/Admissions/AdmissionsOverview";
import Requirements from "./components/Admissions/Requirements";
import Tuition from "./components/Admissions/Tuition";
import FAQ from "./components/Admissions/FAQ";
import OnlineApplication from "./components/Admissions/OnlineApplication";

import News from "./components/News/News";
import NewsDetail from "./components/News/NewsDetail";
import NewsEvents from "./components/News/NewsEvents";
import NewsAnnouncements from "./components/News/NewsAnnouncements";

import Research from "./components/Research/research";
import Centers from "./components/Research/centers";
import Publications from "./components/Research/publications";
import Conferences from "./components/Research/conferences";
import Grants from "./components/Research/grants";

import Contacts from "./components/Contacts/contacts";

// Страницы-заглушки
const Page = ({ title }) => <h1 className="text-2xl font-bold p-8">{title}</h1>;

function App() {
  const { i18n } = useTranslation();

  // Инициализация сохраненного языка при загрузке приложения
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && ['ru', 'kg', 'en'].includes(savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <BrowserRouter>
    <Router>
      <div className="App">
        <Navbar />
        <div className="pt-16">
          <Routes>
            {/* About */}
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/management" element={<Management />} />
            <Route path="/about/vacancies" element={<Careers />} />
            <Route path="/about/careers" element={<Careers />} />
            <Route path="/about/careers/:id" element={<VacancyDetail />} />
            <Route path="/about/partners" element={<Partners />} />

            {/* Academics */}
            <Route path="/hsm" element={<HSM />} />
            <Route path="/hsm/faculties" element={<Faculties />} />
            <Route path="/hsm/departments" element={<Deparments />} />
            <Route path="/hsm/calendar" element={<Calendar />} />
            <Route path="/hsm/resources" element={<Resources />} />

            {/* Admission */}
            <Route path="/admissions" element={<AdmissionsOverview />} />
            <Route path="/admissions/requirements" element={<Requirements />} />
            <Route path="/admissions/tuition" element={<Tuition />} />
            <Route path="/admissions/faq" element={<FAQ />} />
            <Route path="/admissions/apply" element={<OnlineApplication />} />

            {/* Legacy admission routes for compatibility */}
            <Route path="/admission" element={<AdmissionsOverview />} />
            <Route path="/admission/requirements" element={<Requirements />} />
            <Route path="/admission/tuition" element={<Tuition />} />
            <Route path="/admission/scholarships" element={<Page title="Scholarships" />} />
            <Route path="/admission/apply" element={<OnlineApplication />} />

            {/* Research */}
            <Route path="/research" element={<Research />} />
            <Route path="/research/centers" element={<Centers />} />
            <Route path="/research/publications" element={<Publications />} />
            <Route path="/research/conferences" element={<Conferences />} />
            <Route path="/research/grants" element={<Grants />} />

            {/* Campus Life */}
            <Route path="/campus-life" element={<LifeOverview />} />
            <Route path="/campus-life/events" element={<Page title="Campus Events" />} />
            <Route path="/campus-life/clubs" element={<ClubsSection/>} />
            <Route path="/campus-life/gallery" element={<Gallery/>} />
            <Route path="/campus-life/international" element={<InternationalStudents/>} />

            {/* News */}
            <Route path="/news" element={<News />} />
            <Route path="/news/detail/:id" element={<NewsDetail />} />
            <Route path="/news/events" element={<NewsEvents />} />
            <Route path="/news/announcements" element={<NewsAnnouncements />} />

            {/* Contacts */}
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </BrowserRouter>
  );
}

export default App;
