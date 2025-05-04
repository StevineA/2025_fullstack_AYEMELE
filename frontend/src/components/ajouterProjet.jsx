import React, { useState } from "react";
import './ajouterProjet.css';

function AddProject() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    keywords: "",
    thumbnail: "",
    images: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.shortDescription.length > 80) {
      setError("La courte description ne doit pas dépasser 80 caractères.");
      return;
    }

    const wordCount = formData.fullDescription.trim().split(/\s+/).length;
    if (wordCount > 250) {
      setError("La description complète ne doit pas dépasser 250 mots.");
      return;
    }

    const keywordsArray = formData.keywords
      .split(",")
      .map(k => k.trim())
      .filter(k => k);
    if (keywordsArray.length > 10) {
      setError("Pas plus de 10 mots-clés autorisés.");
      return;
    }

    const imagesArray = formData.images
      .split(",")
      .map(img => img.trim())
      .filter(img => img);
    if (imagesArray.length < 1 || imagesArray.length > 5) {
      setError("Vous devez fournir entre 1 et 5 images.");
      return;
    }

    const payload = {
      ...formData,
      keywords: keywordsArray,
      images: imagesArray,
    };

    try {
      const response = await fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Projet ajouté avec succès !");
        setFormData({
          title: "",
          shortDescription: "",
          fullDescription: "",
          keywords: "",
          thumbnail: "",
          images: ""
        });
      } else {
        const data = await response.json();
        setError(data.message || "Erreur lors de l'ajout du projet.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setError("Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <div className="add-project-form">
      <h2>Ajouter un nouveau projet</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="title">Titre du projet *</label>
          <input
            id="title"
            name="title"
            placeholder="Ex: Portfolio React"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Courte description *</label>
          <input
            id="shortDescription"
            name="shortDescription"
            placeholder="Ex: Site vitrine personnel"
            value={formData.shortDescription}
            onChange={handleChange}
            maxLength={80}
            required
          />
          <small>{formData.shortDescription.length}/80 caractères</small>
        </div>

        <div className="form-group">
          <label htmlFor="fullDescription">Description complète *</label>
          <textarea
            id="fullDescription"
            name="fullDescription"
            placeholder="Détaillez les fonctionnalités et objectifs..."
            value={formData.fullDescription}
            onChange={handleChange}
            required
          />
          <small>{formData.fullDescription.trim().split(/\s+/).length} mots / 250 mots max</small>
        </div>

        <div className="form-group">
          <label htmlFor="keywords">Mots-clés (séparés par des virgules)</label>
          <input
            id="keywords"
            name="keywords"
            placeholder="React, Frontend, Portfolio"
            value={formData.keywords}
            onChange={handleChange}
          />
          <small>Maximum 10 mots-clés.</small>
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">URL miniature (thumbnail)</label>
          <input
            id="thumbnail"
            name="thumbnail"
            placeholder="https://exemple.com/thumbnail.jpg"
            value={formData.thumbnail}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="images">URLs supplémentaires (séparées par des virgules)</label>
          <input
            id="images"
            name="images"
            placeholder="https://img1.jpg, https://img2.jpg"
            value={formData.images}
            onChange={handleChange}
          />
          <small>Entre 1 et 5 images autorisées.</small>
        </div>

        <button type="submit">Ajouter Projet</button>
      </form>
    </div>
  );
}

export default AddProject;
