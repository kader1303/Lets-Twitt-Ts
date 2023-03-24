import React, { useState } from "react";
import DividerComponent from "~components/dividerComponent";
import FooterComponent from "~components/footerComponent";
import { useGetIdeas } from "~hooks/useGetIdeas";
import useGetTwitt from "~hooks/useGetTwitt";
import NavbarComponent from './components/navbarComponent';
import "./style.css"
import * as http from 'http';

function IndexPopup() {

  const [tema, setTema] = useState('');
  const [twitt, setTwitt] = useState('');
  const [ideas, setIdeas] = useState('');
  const [loading, setLoading] = useState(false)

  const handleTemaChange = (event) => {
    setTema(event.target.value);
  };

  const handleGenerateTwitt = async () => {
    setLoading(true);

    const Twitt = await useGetTwitt(tema);

    setLoading(false);

    setTwitt(Twitt.replace(/\n/g, ''));
    console.log(Twitt);
  };

  const handleGenerateIdeas = async () => {
    setLoading(true);

    const Ideas = await useGetIdeas();

    setLoading(false);

    setIdeas('Aquí tienes algunas ideas:' + Ideas);
  };

  return (
    <>
      <NavbarComponent />
      <DividerComponent />

      {/* Generate Ideas */}
      <div className="text-suggestion">
        <button className="btn btn-primary" onClick={handleGenerateIdeas} style={{ marginRight: 10, }}>
          Sugerir Temas
        </button>
        <textarea className="textarea textarea-bordered w-full" placeholder='Las ideas aparecerán aquí' defaultValue={ideas}></textarea>
      </div>

      {/* Generate Twitts */}
      <div className="setidea-container">
        <button className="btn btn-primary" onClick={handleGenerateTwitt} style={{ marginRight: 10, marginTop: 37 }}>
          Generar Twitt
        </button>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Sobre que quieres Twittear?</span>
          </label>
          <input type="text" placeholder="Escribe aquí" className="input input-bordered w-full" onChange={handleTemaChange} />
          <label className="label">
          </label>
        </div>
      </div>

      {/* Si se está haciendo un llamado al API establcer Loading... */}
      {
        loading &&
        <progress className="progress w-full" style={{ marginTop: 10 }}></progress>
      }

      {/* Twitt */}
      <div id="twitt-container">
        <textarea className="textarea textarea-bordered w-full" placeholder='Este Twitt se va viral...' style={{ marginTop: 20 }} defaultValue={twitt}></textarea>
      </div>

      <FooterComponent />

    </>
  )
}

export default IndexPopup;
