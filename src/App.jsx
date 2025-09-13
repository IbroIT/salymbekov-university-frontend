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
import Mission from "./components/About/Mission";
import Regulations from "./components/About/Regulations";

import HSM from './components/academics/academics'
import Faculties from './components/academics/faculties'
import Deparments from './components/academics/departments'
import Calendar from './components/academics/calendar'
import Resources from "./components/academics/resources";
import AboutHSM from "./components/academics/AboutHSM";
import Accreditation from "./components/academics/Accreditation";
import LearningGoals from "./components/academics/LearningGoals";

// Новые компоненты ВШМ
import Faculty from "./components/HSM/Faculty";
import Programs from "./components/HSM/Programs";
import HSMInfo from "./components/HSM/HSMInfo";
import HSMAccreditation from "./components/HSM/HSMAccreditation";
import HSMLearningGoals from "./components/HSM/HSMLearningGoals";
import HSMAcademicStuff from "./components/HSM/HSMAcademicStuff";


import LifeOverview from "./components/Life/LifeOverview";
import ClubsSection from "./components/Life/ClubsSection";
import InternationalStudents from "./components/Life/InternationalStudents";
import Gallery from "./components/Life/Gallery";
import Internships from "./components/Life/Internships";
import AcademicMobility from "./components/Life/AcademicMobility";
import StudentRegulations from "./components/Life/StudentRegulations";
import Instructions from "./components/Life/Instructions";
import AppealForm from "./components/Life/AppealForm";

import AdmissionsOverview from "./components/Admissions/AdmissionsOverview";
import Requirements from "./components/Admissions/Requirements";
import Tuition from "./components/Admissions/Tuition";
import FAQ from "./components/Admissions/FAQ";
import OnlineApplication from "./components/Admissions/OnlineApplication";
import AdmissionProcess from "./components/Admissions/AdmissionProcess";
import ForApplicants from "./components/Admissions/ForApplicants";
import ForCitizensKG from "./components/Admissions/ForCitizensKG";
import ForForeignCitizens from "./components/Admissions/ForForeignCitizens";

// Новые компоненты для детальных страниц абитуриентов
import RequirementsCitizensKG from "./components/Admissions/Requirements/RequirementsCitizensKG";
import RequirementsForeignCitizens from "./components/Admissions/Requirements/RequirementsForeignCitizens";
import ApplyCitizensKG from "./components/Admissions/Apply/ApplyCitizensKG";
import ApplyForeignCitizens from "./components/Admissions/Apply/ApplyForeignCitizens";
import TuitionCitizensKG from "./components/Admissions/Tuition/TuitionCitizensKG";
import TuitionForeignCitizens from "./components/Admissions/Tuition/TuitionForeignCitizens";

import News from "./components/News/News";
import NewsDetail from "./components/News/NewsDetail";
import NewsEvents from "./components/News/NewsEvents";
import NewsAnnouncements from "./components/News/NewsAnnouncements";

import Research from "./components/Research/research";
import Centers from "./components/Research/centers";
import Publications from "./components/Research/publications";
import Conferences from "./components/Research/conferences";
import Grants from "./components/Research/grants";
import ResearchManagement from "./components/Research/ResearchManagement";
import ScientificJournals from "./components/Research/ScientificJournals";

import Infrastructure from "./components/Infrastructure/Infrastructure";
import Hospitals from "./components/Infrastructure/Hospitals";
import Laboratories from "./components/Infrastructure/Laboratories";
import AcademicBuildings from "./components/Infrastructure/AcademicBuildings";
import Dormitories from "./components/Infrastructure/Dormitories";

import Contacts from "./components/Contacts/contacts";

// Страницы-заглушки для временно отсутствующих компонентов
const Page = ({ title }) => <div className="min-h-screen pt-20"><h1 className="text-2xl font-bold p-8">{title}</h1></div>;

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
    <Router>
      <div className="App">
        <Navbar />
        <div className="pt-16">
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<Hero />} />

            {/* About */}
            <Route path="/about" element={<About />} />
            <Route path="/about/management" element={<Management />} />
            <Route path="/about/vacancies" element={<Careers />} />
            <Route path="/about/careers" element={<Careers />} />
            <Route path="/about/careers/:id" element={<VacancyDetail />} />
            <Route path="/about/partners" element={<Partners />} />
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/regulations" element={<Regulations />} />

            {/* HSM */}
            <Route path="/hsm/programs" element={<HSM />} />
            <Route path="/hsm/faculties" element={<Faculties />} />
            <Route path="/hsm/departments" element={<Deparments />} />
            <Route path="/hsm/calendar" element={<Calendar />} />
            <Route path="/hsm/resources" element={<Resources />} />
            <Route path="/hsm/accreditation" element={<HSMAccreditation />} />
            <Route path="/hsm/learning-goals" element={<HSMLearningGoals />} />
            <Route path="/hsm/about" element={<HSMInfo />} />
            <Route path="/hsm/AS" element={<HSMAcademicStuff />} />


            {/* Admission */}
            <Route path="/admissions" element={<AdmissionsOverview />} />
            <Route path="/admissions/requirements" element={<Requirements />} />
            <Route path="/admissions/tuition" element={<Tuition />} />
            <Route path="/admissions/faq" element={<FAQ />} />
            <Route path="/admissions/apply" element={<OnlineApplication />} />
            <Route path="/admissions/process" element={<AdmissionProcess />} />
            <Route path="/admissions/applicants" element={<ForApplicants />} />
            <Route path="/admissions/applicants/citizens-kg" element={<ForCitizensKG />} />
            <Route path="/admissions/applicants/foreign-citizens" element={<ForForeignCitizens />} />
            <Route path="/admissions/requirements/citizens-kg" element={<RequirementsCitizensKG />} />
            <Route path="/admissions/requirements/foreign-citizens" element={<RequirementsForeignCitizens />} />
            <Route path="/admissions/apply/citizens-kg" element={<ApplyCitizensKG />} />
            <Route path="/admissions/apply/foreign-citizens" element={<ApplyForeignCitizens />} />
            <Route path="/admissions/tuition/citizens-kg" element={<TuitionCitizensKG />} />
            <Route path="/admissions/tuition/foreign-citizens" element={<TuitionForeignCitizens />} />

            {/* Infrastructure */}
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/infrastructure/hospitals" element={<Hospitals />} />
            <Route path="/infrastructure/laboratories" element={<Laboratories />} />
            <Route path="/infrastructure/academic-buildings" element={<AcademicBuildings />} />
            <Route path="/infrastructure/dormitories" element={<Dormitories />} />

            {/* Research */}
            <Route path="/research" element={<Research />} />
            <Route path="/research/centers" element={<Centers />} />
            <Route path="/research/publications" element={<Publications />} />
            <Route path="/research/conferences" element={<Conferences />} />
            <Route path="/research/grants" element={<Grants />} />
            <Route path="/research/management" element={<ResearchManagement />} />
            <Route path="/research/journals" element={<ScientificJournals />} />

            {/* Student Life */}
            <Route path="/student" element={<LifeOverview />} />
            <Route path="/student/life" element={<LifeOverview />} />
            <Route path="/student/clubs" element={<ClubsSection />} />
            <Route path="/student/gallery" element={<Gallery />} />
            <Route path="/student/international" element={<InternationalStudents />} />
            <Route path="/student/internships" element={<Internships />} />
            <Route path="/student/academic-mobility" element={<AcademicMobility />} />
            <Route path="/student/regulations" element={<StudentRegulations />} />
            <Route path="/student/instructions" element={<Instructions />} />
            <Route path="/student/appeal" element={<AppealForm />} />

            {/* News */}
            <Route path="/news" element={<News />} />
            <Route path="/news/detail/:id" element={<NewsDetail />} />
            <Route path="/news/events" element={<NewsEvents />} />
            <Route path="/news/announcements" element={<NewsAnnouncements />} />

            {/* Contacts */}
            <Route path="/contacts" element={<Contacts />} />

            {/* Legacy routes for compatibility */}
            <Route path="/admission" element={<AdmissionsOverview />} />
            <Route path="/admission/requirements" element={<Requirements />} />
            <Route path="/admission/tuition" element={<Tuition />} />
            <Route path="/admission/scholarships" element={<Page title="Scholarships" />} />
            <Route path="/admission/apply" element={<OnlineApplication />} />
            <Route path="/campus-life" element={<LifeOverview />} />
            <Route path="/campus-life/events" element={<Page title="Campus Events" />} />
            <Route path="/campus-life/clubs" element={<ClubsSection />} />
            <Route path="/campus-life/gallery" element={<Gallery />} />
            <Route path="/campus-life/international" element={<InternationalStudents />} />

            {/* 404 Page */}
            <Route path="*" element={<Page title="Страница не найдена" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;