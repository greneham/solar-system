import React from "react";
import Planets from "../planets.json";
import "./List2D.css";
import { useHistory } from "react-router-dom";
import { ReactComponent as SvgArrow } from "../SVG/iconmonstr-arrow-25.svg";

function List2D() {
  const history = useHistory();

  function handleClick(planetId) {
    history.push(`/detail/${planetId}`);
  }

  const listPlanets = Planets.map((p) => {
    return (
      <div
        key={p.id}
        className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-6 flex justify-center lg:inline xl:inline"
      >
        <div className="max-w-sm rounded overflow-hidden shadow-lg mb-8">
          <img
            className="w-full"
            src={`/img/planets/${p.Name}.jpg`}
            alt={p.Name}
          />
          <div className="planet-info px-6 py-4 w-full">
            <div className="font-bold text-xl mb-2">{p.Name}</div>
            <p className="text-gray-700 text-base">{p["Desc_Short"]}</p>
          </div>
          <div className="w-full text-right pr-4 py-4">
            <button
              onClick={() => handleClick(p.id)}
              className="font-bold py-2 pl-4 rounded inline-flex items-center"
            >
              <span>Details</span>
              <SvgArrow />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div id="planet-list" className="flex flex-wrap w-full mt-8">
      {listPlanets}
    </div>
    // <div id="planet-list" className="flex">
    //   <div className="md:w-1/5 lg:w-1/5 xl:w-1/5"></div>
    //   <div className="sm:w-full md:w-3/5 lg:w-3/5 xl:w-3/5">
    //     <div className="flex">{listPlanets}</div>
    //   </div>
    //   <div className="md:w-1/5 xl:w-1/5"></div>
    // </div>
  );
}

export default List2D;
