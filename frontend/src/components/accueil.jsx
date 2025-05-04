import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Accueil.css';
import maPhoto from "../assets/photo.jpg";
import logo from "../assets/R.jpeg";

function Accueil() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const isFormValid = name.trim().length >= 3 && email.trim() && message.trim().length >= 10;

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        return value.trim().length < 3 ? "Le nom est obligatoire et doit contenir au moins 3 caractères." : "";
      case "email":
        return !value.trim() ? "L'email est obligatoire." : "";
      case "message":
        return value.trim().length < 10 ? "Le message doit contenir au moins 10 caractères." : "";
      default:
        return "";
    }
  };

  const verifyField = (field, value) => {
    const error = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleChange = (field, value) => {
    if (field === "name") setName(value);
    else if (field === "email") setEmail(value);
    else if (field === "message") setMessage(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await fetch("http://localhost:3000/projects/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        alert("Votre message a bien été soumis !");
        setName("");
        setEmail("");
        setMessage("");
        setErrors({ name: "", email: "", message: "" });
      } else {
        alert("Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Erreur réseau.");
    }
  };

  return (
    <div id="homePage">
      <header id="intro">
        <img src={logo} alt="Logo" id="logo" />
        <h1>Prêt(e) à découvrir qui je suis ?</h1>
        <img src={maPhoto} alt="Mon Portfolio" id="intro-image" />
      </header>

      <section id="projet">
        <Link to="/projets">
          <button id="btn-projets">Voir mes projets</button>
        </Link>
      </section>

      <section id="a-propos">
        <h2>À propos de moi</h2>
        <p>Bonjour ! Je suis Stevine AYEMELE, étudiante en alternance en 4ème année à l'ENSIM, spécialité informatique.</p>
        <p>Depuis septembre 2024, j'occupe le poste d'Apprentie Ingénieure Logiciel chez Capgemini T.S.</p>
        <p>J'ai déjà travaillé sur de nombreux projets passionnants, je vous invite à les découvrir !</p>
      </section>

      <section id="contact-form">
        <h2>Contactez-moi</h2>
        <form onSubmit={handleSubmit}>
          <div className="monForm">
            <div className="form-group">
              <label htmlFor="name">Nom :</label>
              <input
                type="text"
                id="name"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={(e) => verifyField("name", e.target.value)}
                required
              />
              <em className="error">{errors.name}</em>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                placeholder="Votre adresse e-mail"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={(e) => verifyField("email", e.target.value)}
                required
              />
              <em className="error">{errors.email}</em>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message :</label>
              <textarea
                id="message"
                placeholder="Votre message"
                value={message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={(e) => verifyField("message", e.target.value)}
                required
              />
              <em className="error">{errors.message}</em>
            </div>

            <div>
              <button type="submit" disabled={!isFormValid}>Envoyer</button> 
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Accueil;
