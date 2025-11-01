import { useTranslation } from "react-i18next";
import SEOComponent from "../SEO/SEOComponent";
import Home from './Home';
import Facts from './FactsSection';
import Programs from './ProgramCards';
import Reviews from './Reviews';
import Partners from "./Partners";
import News from "./News";

const Hero = () => {
  return (
    <>
      <SEOComponent />
      
      <div className="hero-wrapper">
        <Home />
        <Facts />
        <Programs />
        <News />
        <Reviews />
        <Partners />
      </div>
    </>
  );
};

export default Hero;