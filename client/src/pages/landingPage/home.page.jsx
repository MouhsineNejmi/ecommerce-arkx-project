import Header from "../../components/navBar/header";
import Slider from "../../components/swiper";
import slides from '../../data/images.json'

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Slider slides={slides}/>
    </div>
  );
};

export default LandingPage;
