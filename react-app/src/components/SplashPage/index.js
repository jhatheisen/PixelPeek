import Navigation from "../Navigation";
import Footer from "./footer";
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <>
      <div className="SplashPage-Container">
        <div className="SplashPage-Image-Slides">
          <div className="pic" id="pic8" />
          <div className="pic" id="pic7" />
          <div className="pic" id="pic6" />
          <div className="pic" id="pic5" />
          <div className="pic" id="pic4" />
          <div className="pic" id="pic3" />
          <div className="pic" id="pic2" />
          <div className="pic" id="pic1" />
        </div>
        <div className="SplashPage-Body-Text">
          <h1>Find your inspiration</h1>
          <p>
            Join the PixelPeek community, home to stunning collections of
            photography
          </p>
          <button>Demo Button Here</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SplashPage;
