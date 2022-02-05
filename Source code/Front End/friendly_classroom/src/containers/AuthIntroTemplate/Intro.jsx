import React from "react";
import AboutUs from "../../components/AboutUs.jsx";
import Footer from "../../components/Footer.jsx";
import IntroFeature from "../../components/IntroFeature.jsx";
import IntroMain from "../../components/IntroMain.jsx";
import NavbarIntro from "../../components/NavbarIntro.jsx";
import { Redirect } from "react-router";

function Intro() {
  if (localStorage.getItem("User") !== null) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <NavbarIntro />
      <IntroMain />
      <IntroFeature />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default Intro;
