import React from "react";
import SolarSystem3D from "../Components/SolarSystem/SolarSystem";
import { useHistory } from "react-router-dom";

function Interactive3D() {
  const history = useHistory();

  function handleClick(planetId) {
    history.push(`/detail/${planetId}`);
  }

  return (
    <div>
      <SolarSystem3D />
      <div id="sun" className="planet-tooltip">
        Sun
      </div>
      <div
        id="mercury"
        className="planet-tooltip"
        onClick={() => handleClick(1)}
      >
        Mercury
      </div>
      <div id="venus" className="planet-tooltip" onClick={() => handleClick(2)}>
        Venus
      </div>
      <div id="earth" className="planet-tooltip" onClick={() => handleClick(3)}>
        Earth
      </div>
      <div id="mars" className="planet-tooltip" onClick={() => handleClick(4)}>
        Mars
      </div>
      <div
        id="jupiter"
        className="planet-tooltip"
        onClick={() => handleClick(5)}
      >
        Jupiter
      </div>
      <div
        id="saturn"
        className="planet-tooltip"
        onClick={() => handleClick(6)}
      >
        Saturn
      </div>
      <div
        id="uranus"
        className="planet-tooltip"
        onClick={() => handleClick(7)}
      >
        Uranus
      </div>
      <div
        id="neptune"
        className="planet-tooltip"
        onClick={() => handleClick(8)}
      >
        Neptune
      </div>
    </div>
  );
}

export default Interactive3D;
