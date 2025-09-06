import Home from './Home';
import Facts from './FactsSection';
import Programs from './ProgramCards';
import Reviews from './Reviews';
import Partners from "./Partners";
import News from "./News";

const Hero = () => {
  return (
    <div>
      <Home />
      <Facts />
      <Programs />
      <News />
      <Reviews />
      <Partners />
    </div>
  );
};

export default Hero;