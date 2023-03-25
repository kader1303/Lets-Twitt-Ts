import NavbarComponent from "~components/navbarComponent"
import "./style.css"
import { useState } from 'react';
import { useFirebase } from '~firebase/hook';
import type { UserInfoClass } from './interface/userinterface';
import useSetUser from './hooks/useSetUser';

function options() {

    const { user } = useFirebase();

    const [idea, setIdea] = useState('');
    const [objective, setObjective] = useState('');
    const [account, setAccount] = useState('');
    const [creativity, setCreativity] = useState(0.5);
    const [loading, setLoading] = useState(false)
    const [warning, setWarning] = useState(false);

    const handleIdeaChange = (event) => {
        setIdea(event.target.value);
    };

    const handleObjectiveChange = (event) => {
        setObjective(event.target.value);
    };

    const handleAccountChange = (event) => {
        setAccount(event.target.value);
    }

    const handleCreativityChange = (event) => {
        setCreativity(Number(event.target.value) / 100);
    }

    const handleComplete = () => {
        setAccount('');
        setObjective('');
        setIdea('');
    }

    const writeUserData = () => {

        if (user) {
            setLoading(true);

            const userData: UserInfoClass = {
                userId: user.uid,
                accountname: account,
                creativity: creativity,
                objectives: objective,
                themes: idea,
                userimage: "test.com",
                username: user.email,
            }

            console.log("UserData: " + JSON.stringify(userData));

            useSetUser(userData).then(() => {
                setLoading(false);
                handleComplete();
            })

        } else {
            setWarning(true);
        }

    }

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
            
            {/* Nombre de la cuenta  */}
            <div className="form-control flex-row mt-5">

                <div className="flex-column">
                    <label className="label">
                        <span className="label-text">Como se llama tu cuenta?</span>
                    </label>
                    <input type="text" placeholder="Escribe aquí" className="input input-bordered w-auto" onChange={handleAccountChange} value={account} />
                    <label className="label">
                    </label>
                </div>

                <div className="flex-column ml-10 mt-2 w-full">
                    <span className="label-text">Nivel de creatividad</span>
                    <input type="range" min="0" max="100" className="range range-secondary w-full mt-2" onChange={handleCreativityChange} />
                    <div className="w-auto flex justify-between text-xs px-2">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                </div>

            </div>

            {/* Descripcion para generar ideas de twitts */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Descríbeme sobre que temas quieres que te de ideas</span>
                </label>
                <textarea className="textarea textarea-bordered h-20" placeholder="Ejemplo: Dame tres temas para tratar en una cuenta de twitter que responde a una APP de delivery de comida. Varía el objetivo de cada tema de acuerdo a estos parámetros: uno para promoción de la cuenta, otro para aportar valor sobre los beneficios de la comida y otro enfocado en generar interacciones" onChange={handleIdeaChange} value={idea}></textarea>
                <label className="label">
                </label>
            </div>

            {/* Describe tu cuenta y publico objetivo */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Descríbe tu cuenta y publico objetivo</span>
                </label>
                <textarea className="textarea textarea-bordered h-20" placeholder="Ejemplo: Cuenta empresarial que corresponde a una aplicación para móviles que permite a los usuarios pedir comida a domicilio. La aplicación está en proceso de desarrollo pero se quiere comenzar a generar espectativa. Nuestro publico objetivo son cubanos de entre 18 y 60 años de edad." onChange={handleObjectiveChange} value={objective}></textarea>
                <label className="label">
                </label>
            </div>

            {/* Align center */}
            <div className="flex flex-row">
                <button className="btn btn-primary" onClick={writeUserData} type='button'>
                    Guardar
                </button>
                {
                    loading &&
                    <progress className="progress progress-secondary w-2/3 mt-5 ml-8"></progress>
                }
            </div>


        </>
    )
}

export default options