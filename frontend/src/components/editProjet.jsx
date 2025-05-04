import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findProjectById, updateProject } from "../services/service_portfolio";
import './ajouterProjet.css'; 

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    keywords: "",
    thumbnail: "",
    images: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const project = await findProjectById(id);
        if (project) {
          setFormData({
            title: project.title || "",
            shortDescription: project.shortDescription || "",
            fullDescription: project.fullDescription || "",
            keywords: project.keywords ? project.keywords.join(", ") : "",
            thumbnail: project.thumbnail || "",
            images: project.images ? project.images.join(", ") : ""
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du projet :", error);
        alert("Erreur de chargement du projet");
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      keywords: formData.keywords.split(",").map(k => k.trim()),
      images: formData.images.split(",").map(img => img.trim())
    };

    try {
      await updateProject(id, payload);
      alert("Projet mis à jour avec succès !");
      navigate("/projets");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour du projet");
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Chargement...</p>;

  return (
    <div className="add-project-form">
      <h2>Modifier le projet</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="title">Titre du projet *</label>
          <input id="title" name="title" placeholder="Ex: Mon Portfolio React" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Courte description *</label>
          <input id="shortDescription" name="shortDescription" placeholder="Ex: Site de présentation personnelle" value={formData.shortDescription} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="fullDescription">Description complète *</label>
          <textarea id="fullDescription" name="fullDescription" placeholder="Décrivez le projet en détail..." value={formData.fullDescription} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="keywords">Mots-clés (séparés par des virgules)</label>
          <input id="keywords" name="keywords" placeholder="React, Portfolio, Web Development" value={formData.keywords} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">URL miniature (thumbnail)</label>
          <input id="thumbnail" name="thumbnail" placeholder="https://exemple.com/miniature.jpg" value={formData.thumbnail} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="images">URLs images supplémentaires (séparées par des virgules)</label>
          <input id="images" name="images" placeholder="https://img1.jpg, https://img2.jpg" value={formData.images} onChange={handleChange} />
        </div>

        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default EditProject;
