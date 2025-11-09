import { Button } from "flowbite-react";
import { useState } from "react";
import api from "../services/api";


const Login = ()  => {

    const [datasLogin, setDatasLogin] = useState({
        email: "",
        password: ""
    });
    const [messageError, setMessageError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit () {
        try {
            // console.log(DatasetDatasLogin);
            if (!datasLogin.email || !datasLogin.password) {
                setMessageError(true);
            } else {
                setLoading(true);
                setErrorTitle(false);
                await api.post('/auth/login', datasLogin);
                setDatasLogin({ 
                    email: "",
                    password: ""
                });
            }

        } catch(err) {
            console.error("Connexion echouée : ", err);
        } finally {
            setLoading(false);
            // errorTitle ? setOpenModal(false) : setOpenModal(true)
        }
    }

    return(
        <div className="w-full flex flex-col gap-4 items-center h-screen">
            <form className="md:w-[400px] box-shadow-css shadow-blue-400 rounded-xl p-4 w-full flex flex-col gap-8">
                <h2 className="text-gray-600 text-center font-bold text-2xl">Connexion</h2>
                <p className="text-gray-700 text-left px-2">Connectez-vous pour avoir accès à vos tâches</p>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2 justify-start">
                        <label className="text-left font-semibold text-gray-500" htmlFor="email">Votre email</label>
                        <input 
                            className="bg-transparent rounded-lg border border-gray-500 no-underline" 
                            id="email"
                            type="email"
                            onChange={(e) => {setDatasLogin({...datasLogin, email: e.target.value})}}
                            placeholder="monemail@gmail.com" 
                        />
                    </div>
                     <div className="flex flex-col gap-2 justify-start">
                        <label className="text-left font-semibold text-gray-500" htmlFor="password">Votre mot de passe</label>
                        <input 
                            className="bg-transparent rounded-lg border border-gray-500 no-underline" 
                            id="password" 
                            type="password"
                            value={datasLogin.password}
                            onChange={(e) => {setDatasLogin({...datasLogin, password: e.target.value})}}
                        />
                    </div>
                    {messageError &&
                    <p className="text-red-400 text-base text-left font-medium">Veuillez remplir tous les champs</p>}
                </div>
                <Button type="submit" onClick={handleSubmit}>Se connecter</Button>
                <div className="flex flex-row gap-1 justify-center text-sm">
                    <p>Pas encore de compte ? </p>
                    <a className="font-semibold text-blue-500" href="/inscription">créer un compte</a>
                </div>
            </form>
        </div>
    )
};

export default Login;