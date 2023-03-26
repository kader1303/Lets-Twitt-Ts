import React, { useState, useEffect } from "react";
import FooterComponent from "~components/footerComponent";
import { useGetIdeas } from "~hooks/useGetIdeas";
import useGetTwitt from "~hooks/useGetTwitt";
import NavbarComponent from './components/navbarComponent';
import "./style.css"
import { useFirebase } from '~firebase/hook';
import useGetUser from "~hooks/useGetUser";
import type { UserInfoClass } from "~interface/userinterface";

function IndexPopup() {

  const { user } = useFirebase();

  const [tema, setTema] = useState('');
  const [twitt, setTwitt] = useState('');
  const [ideas, setIdeas] = useState('');
  const [warning, setWarning] = useState(false);
  const [description, setDescription] = useState('');

  const [userinfo, setUserInfo] = useState<UserInfoClass>();
  const [loading, setLoading] = useState(false)

  const handleTemaChange = (event) => {
    setTema(event.target.value);
  };

  const handleGenerateIdeas = async () => {

    if (user) {
      setLoading(true);

      const Ideas = await useGetIdeas(userinfo.objectives);

      setIdeas('Aquí tienes algunas ideas:' + Ideas);
      setLoading(false);
    } else {
      setWarning(true);
    }


  };

  const handleGenerateTwitt = async () => {

    if (user) {
      setLoading(true);

      const Twitt = await useGetTwitt(tema, description, userinfo.creativity);

      setLoading(false);
      setTwitt(Twitt.replace(/\n/g, ''));
    } else {
      setWarning(true);
    }

  };

  const getUserObjectives = () => {
    if (userinfo) {
      // console.log(`User is signed in. ${userinfo.objectives}`);
      setDescription(userinfo.objectives);
    } else {
      console.log(`No user is signed in.`);
    }
  };

  useEffect(() => {
    if (user) {
      useGetUser(user.uid).then((userInfo) => {
        setUserInfo(userInfo);
      });
    } else {
      setUserInfo(null);
    }
  }, [user]);

  useEffect(() => {
    if (userinfo && userinfo.objectives) {
      getUserObjectives();
    } else {
      setDescription('');
    }
  }, [userinfo]);

  return (
    <>
      <NavbarComponent />
      {/* <DividerComponent /> */}

      {
        warning &&
        // align div center
        <div className="fixed alert shadow-lg w-96 z-50 mt-24 ml-14">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Debes loguearte para acceder a las funciones</span>
          </div>
          <div className="flex-none">
            <button className="btn btn-sm btn-primary" onClick={() => setWarning(false)}>Acepto</button>
          </div>
        </div>
      }

      {/* Generate Ideas */}
      <div className="text-suggestion mt-5">
        <button className="btn btn-primary mr-5" onClick={handleGenerateIdeas} type='button'>
          Sugerir Temas
        </button>
        <textarea className="textarea textarea-bordered w-full" placeholder='Las ideas aparecerán aquí' defaultValue={ideas}></textarea>
      </div>

      {/* Generate Twitts */}
      <div className="setidea-container">
        <button className="btn btn-primary mr-5 mt-9" onClick={handleGenerateTwitt}>
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
        <progress className="progress w-full mt-5"></progress>
      }

      {/* Twitt */}
      <div id="twitt-container">
        <textarea className="textarea textarea-bordered w-full h-32 mt-5" placeholder='Este Twitt se va viral...' defaultValue={twitt}></textarea>
      </div>

      <FooterComponent />

    </>
  )
}

export default IndexPopup;
