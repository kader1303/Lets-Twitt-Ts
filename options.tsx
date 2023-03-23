import DividerComponent from "~components/dividerComponent"
import NavbarComponent from "~components/navbarComponent"
import "./style.css"

function options() {
    return (
        <>
            <NavbarComponent />
            <DividerComponent />

            {/* Nombre de la cuenta  */}
            <div className="form-control flex-row">

                <div className="flex-column">
                    <label className="label">
                        <span className="label-text">Como se llama tu cuenta?</span>
                    </label>
                    <input type="text" placeholder="Escribe aquí" className="input input-bordered w-auto" />
                    <label className="label">
                    </label>
                </div>

                <div className="flex-column ml-10 mt-2 w-full">
                    <span className="label-text">Nivel de creatividad</span>
                    <input type="range" min="0" max="100" className="range range-secondary w-full mt-2" />
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
                <textarea className="textarea textarea-bordered h-24" placeholder="Ejemplo: Dame tres temas para tratar en una cuenta de twitter que responde a una APP de delivery de comida. Varía el objetivo de cada tema de acuerdo a estos parámetros: uno para promoción de la cuenta, otro para aportar valor sobre los beneficios de la comida y otro enfocado en generar interacciones"></textarea>
                <label className="label">
                </label>
            </div>

            {/* Describe tu cuenta y publico objetivo */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Descríbe tu cuenta y publico objetivo</span>
                </label>
                <textarea className="textarea textarea-bordered h-24" placeholder="Ejemplo: Cuenta empresarial que corresponde a una aplicación para móviles que permite a los usuarios pedir comida a domicilio. La aplicación está en proceso de desarrollo pero se quiere comenzar a generar espectativa. Nuestro publico objetivo son cubanos de entre 18 y 60 años de edad."></textarea>
                <label className="label">
                </label>
            </div>


        </>
    )
}

export default options