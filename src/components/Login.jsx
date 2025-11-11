import { Button } from "flowbite-react";
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
// import isAuthenticated from "../services/isAuthenticated";


const Login = ()  => {

    const [datasLogin, setDatasLogin] = useState({
        username: "",
        password: ""
    });
    const [messageError, setMessageError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate  = useNavigate();

    async function handleSubmit (e) {
        e.preventDefault();
        try {
            // console.log(DatasetDatasLogin);
            if (!datasLogin.username || !datasLogin.password) {
                setMessageError(true);
                // alert("User non connecté");
            } else {
                setLoading(true);
                setMessageError(false);
                const response = await api.post('/auth/login', datasLogin);
                console.log(response);

                // Stocker le token dans le localStorage
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                // Rediriger l'utilisateur a la page d'accueil
                navigate("/");
                
                setDatasLogin({ 
                    username: "",
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
                <p className="text-gray-700 text-center px-2">Connectez-vous pour avoir accès à vos tâches</p>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2 justify-start">
                        <label className="text-left font-semibold text-gray-500" htmlFor="username">Votre nom d'utilisateur *</label>
                        <input 
                            className="bg-transparent rounded-lg border border-gray-500 no-underline" 
                            id="username"
                            type="text"
                            onChange={(e) => {setDatasLogin({...datasLogin, username: e.target.value})}}
                            placeholder="Nom d'utilisateur" 
                            />
                    </div>
                     <div className="flex flex-col gap-2 justify-start">
                        <label className="text-left font-semibold text-gray-500" htmlFor="password">Votre mot de passe *</label>
                        <input 
                            className="bg-transparent rounded-lg border border-gray-500 no-underline" 
                            id="password" 
                            placeholder="••••••••••••••••" 
                            type="password"
                            value={datasLogin.password}
                            onChange={(e) => {setDatasLogin({...datasLogin, password: e.target.value})}}
                        />
                    </div>
                    {messageError &&
                    <p className="text-red-400 text-base text-left font-medium">Veuillez remplir tous les champs</p>}
                </div>
                <Button className={loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} type="submit" onClick={handleSubmit}>
                    {loading ? "Chargement..." : "Se connecter"}
                </Button>
                <p className="text-center text-sm">
                    <span>Pas encore de compte ? </span>
                    <a className="font-semibold text-blue-500" href="/inscription">créer un compte</a>
                </p>
            </form>
        </div>
    )
};

export default Login;