import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import   axiosInstance from "../../utils/axiosIntance"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
const navigate  = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Entrer une adresse email valide");
      return;
    }

    if (!password) {
      setError("Entrer votre mot de passe");
      return;
    }
    setError("");

    //API DE LA CONNEXION A LA BASE

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Géstion  de réponse de connexion réussie
      if(response.data  && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")

      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("Une erreur inattendue s'est produite. Veuillez réessayer")
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center ">Connexion</h4>
            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Connexion
            </button>
            <p className="text-sm text-center mt-4">
              Avez-vous déjà un compte ? {""}
              <Link to="/register" className="font-medium text-primary underline">
                Creer un compte ici
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
