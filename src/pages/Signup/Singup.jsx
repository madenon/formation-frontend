import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosIntance";

const Singup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleSIgnup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Entrer votre Nom  complet");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enterz une adresse email valide  ");
      return;
    }

    if (!password) {
      setError("Enterz un mot de passe valide ");
      return;
    }
    setError("");

    //Apel de API

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // Géstion  de réponse de creation de compte réussie
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;

      }
        if (response.data && response.data.accessToken) {
          localStorage.setItem("token", response.data.accessToken)
          navigate('/login')
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Une erreur inattendue s'est produite. Veuillez réessayer");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSIgnup}>
            <h4 className="text-2xl mb-7 text-center">S'inscrire</h4>

            <input
              type="text"
              placeholder="Votre nom "
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Creer un compte
            </button>
            <p className="text-sm text-center mt-4">
              Avez-vous déjà un compte ? {""}
              <Link to="/login" className="font-medium text-primary underline">
                Connectez-vous ici
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Singup;
