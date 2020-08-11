import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeart from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";
import api from "../../services/api";

const Landing = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/connections");
      setTotalConnections(res.data.total);
    };

    fetchData();
  }, []);

  return (
    <div id="page-landing">
      <div className="container" id="page-landing-content">
        <div className="logo-container">
          <img src={logoImg} alt="Logo"></img>
          <h2>Sua plataforma de estudos online</h2>
        </div>
        <img src={landingImg} alt="Landing" className="hero-image"></img>
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar"></img>
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"></img>
            Dar aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexoes ja realizadas{" "}
          <img src={purpleHeart} alt="Icon"></img>
        </span>
      </div>
    </div>
  );
};

export default Landing;
