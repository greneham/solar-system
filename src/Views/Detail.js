import React from "react";
import Planet3D from "../Components/Planet/Planet";
import Planets from "../planets.json";
import "./Detail.css";
import { useHistory, useParams } from "react-router-dom";
import { ReactComponent as SvgArrow } from "../SVG/iconmonstr-arrow-25.svg";

function Detail() {
  const history = useHistory();
  const { id } = useParams();

  const planet = Planets.find(p => p.id === parseInt(id));


  console.log(id)
  console.log(planet)

  // todo: unknown planet, goto 404 page
  if(!planet) {

  }

  return (
    <div className="relative">
      <Planet3D gltf={`/gltf/${planet.Name.toLowerCase()}.gltf`} />
      <button
        style={{top: '20px', right: '20px'}}
        onClick={() => history.goBack()}
        className="absolute font-bold py-2 pr-4 rounded inline-flex items-center"
      >
        <SvgArrow style={{transform: 'scaleX(-1)'}} />
        <span>Back</span>
      </button>
      <div className="planet-detail-panel">
        <div className="w-full md:w-25 lg:w-25 xl:w-25 md:top-1/2 lg:top-1/2 xl:top-1/2  px-6">
          <div className="border-r border-b border-l border-t border-gray-400 rounded-b p-4 flex flex-col">
            <div className="mb-2">
              <div className="text-white font-bold text-xl mb-2">{planet.Name}</div>
              <p className="text-gray-600 text-base">{planet["Desc_Long"]}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
