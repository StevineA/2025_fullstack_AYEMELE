import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { findProjectById } from "../services/service_portfolio";
import { useAuth } from "../pages/useAuth"; 
import './DetailsProjet.css';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth(); 

  useEffect(() => {
    async function loadProject() {
      try {
        const data = await findProjectById(id);
        setProject(data);
      } catch (error) {
        console.error("Erreur lors du chargement du projet:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!project) return <p>Projet non trouvé.</p>;

  return (
    <>
    <div className="project-detail-container">
      <h1>{project.title}</h1>

      <p className="description">
        <strong className="description-label">Description :</strong> {project.shortDescription}
      </p>

      <img
        src={project.thumbnail}
        alt={`Aperçu de ${project.title}`}
        className="main-thumbnail"
      />

      <div className="project-content">
        <p className="description">
          <strong className="description-label">Description complète :</strong> {project.fullDescription}
        </p>

        <div className="keywords-box">
          <h3>Mots-clés</h3>
          <ul className="keywords">
            {project.keywords.map((kw, index) => (
              <li key={index} className="keyword">{kw}</li>
            ))}
          </ul>
        </div>
      </div>

      {project.images.length > 0 && (
        <>
          <h3>Images du projet</h3>
          <div className="gallery">
            {project.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                className="gallery-image"
              />
            ))}
          </div>
        </>
      )}

      {isAuthenticated && (
        <Link to={`/projets/edit/${project._id}`}>
          <button className="btn-edit">Mettre à jour</button>
        </Link>
      )}
     </div>
    </>
  );
}

export default ProjectDetail;
