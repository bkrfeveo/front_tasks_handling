import { useState } from "react";
import api from "../services/api";
import { Button } from "flowbite-react";


const Register = ()  => {

    const [datasRegister, setDatasRegister] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit (e) {
        e.preventDefault();
        try {
            // console.log(DatasetDatasRegister);
            if (datasRegister.firstName === "" ||
                datasRegister.lastName === "" ||
                datasRegister.username === "" ||
                datasRegister.email === "" || 
                password1 === "" ||
                password2 === ""
            ) {
                setError(true);
                setMessageError("Veuillez remplir tous les champs !");
            } else if (password1 !== password2) {
                setError(true);
                setMessageError("Les mots de passe entres ne sont pas identiques");
                console.log(messageError);    
            } else {
                setMessageError("");
                setDatasRegister({...datasRegister, password: password1});
                
                setLoading(true);
                setError(false);
                
                const response = await api.post('/auth/register', datasRegister);
                console.log(response);
                
                setDatasRegister({
                    firstName: "",
                    lastName: "",
                    username: "",
                    email: "",
                    password: ""
                });
            }

        } catch(err) {
            console.error("Inscription echouée : ", err);
            setError(true);
            setMessageError()
        } finally {
            setLoading(false);
            // errorTitle ? setOpenModal(false) : setOpenModal(true)
        }
    }
    
    return(
        <div className="w-full flex flex-col gap-4 items-center">
            <form className="w-full box-shadow-css shadow-blue-400 rounded-xl mb-20 p-4 flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <h2 className="text-gray-600 text-center font-bold text-3xl">Inscription</h2>
                    <p className="text-gray-700 px-2">Creer un compte et commencer à gérer vos tâches</p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex md:flex-row flex-col gap-2">
                        <div className="flex flex-col gap-2 justify-start">
                            <label className="text-left font-semibold text-gray-500" htmlFor="firstName">Votre Prénom *</label>
                            <input 
                                className="bg-transparent rounded-lg border border-gray-500 no-underline" 
                                value={datasRegister.firstName}
                                onChange={(e) => setDatasRegister({...datasRegister, firstName: e.target.value})}
                                id="firstName"
                                type="text"
                                placeholder="" 
                            />
                        </div>
                        <div className="flex flex-col gap-2 justify-start">
                            <label className="text-left font-semibold text-gray-500" htmlFor="lastName">Votre Nom *</label>
                            <input 
                                className="bg-transparent rounded-lg border border-gray-500 no-underline" 
                                value={datasRegister.lastName}
                                onChange={(e) => setDatasRegister({...datasRegister, lastName: e.target.value})}
                                id="lastName"
                                type="text"
                                placeholder="" 
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-2">
                        <div className="flex flex-col gap-2 justify-start">
                            <label className="text-left font-semibold text-gray-500" htmlFor="email">Votre email *</label>
                            <input
                                className="bg-transparent rounded-lg border border-gray-500 no-underline"
                                value={datasRegister.email}
                                onChange={(e) => setDatasRegister({...datasRegister, email: e.target.value})}
                                id="email"
                                type="email"
                                placeholder="monemail@gmail.com"
                            />
                        </div>
                        <div className="flex flex-col gap-2 justify-start">
                            <label className="text-left font-semibold text-gray-500" htmlFor="email">Votre nom utilisateur *</label>
                            <input
                                className="bg-transparent rounded-lg border border-gray-500 no-underline"
                                value={datasRegister.username}
                                onChange={(e) => setDatasRegister({...datasRegister, username: e.target.value})}
                                id="email"
                                type="text"
                                placeholder="Ex: Abou, fadel..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-start">
                        <label className="text-left font-semibold text-gray-500" htmlFor="password1">Entrer un mot de passe *</label>
                        <input 
                            className="bg-transparent rounded-lg border border-gray-500 no-underline" 
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            id="password1" 
                            type="password" 
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-start">
                        <label className="text-left font-semibold text-gray-500" htmlFor="password2">Confirmer le mot de passe *</label>
                        <input 
                            className="bg-transparent rounded-lg border border-gray-500 no-underline" 
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            id="password2" 
                            type="password" 
                        />
                    </div>
                    {error && <p className="text-red-400 text-base text-left font-medium">{messageError}</p>}
                    <p className="text-red-400 text-base text-left font-medium">{messageError}</p>                    
                </div>
                <Button onClick={handleSubmit} className="text-md" type="submit">S'inscrire</Button>
                <p className="text-center text-sm">
                    <span>Déjà un compte ? </span>
                    <a className="font-semibold text-blue-500" href="/connexion">connectez-vous</a>
                </p>
            </form>
        </div>
    )
};

export default Register;