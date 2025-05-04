import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjects, deleteProject } from '../services/service_portfolio';
import { useAuth } from "../pages/useAuth"; 

import './Projets.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
        alert("Erreur lors du chargement des projets");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce projet ?")) return;

    try {
      const isDeleted = await deleteProject(id);
      if (isDeleted) {
        setProjects(projects.filter(project => project._id !== id));
        alert("Projet supprimé avec succès");
      } else {
        alert("Erreur lors de la suppression du projet");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du projet:", error);
      alert("Erreur interne du serveur");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (projects.length === 0) return <p>Aucun projet trouvé.</p>;

  return (
    <>
    <div className="projects-container">
      <div id="admin-connexion">
        {isAuthenticated ? (
          <div className="admin-info">
            <p>Connecté en tant qu'Admin</p>
            <button id="btn-logout" onClick={logout}>Se déconnecter</button>
            <Link to="/admin/analytics">
              <button className="btn-analytics">Voir Analytics</button>
            </Link>
          </div>
        ) : (
          <Link to="/admin/login">
            <button id="btn-admin">Connexion Admin</button>
          </Link>
        )}
      </div>

      <h1 className="title">Mes Projets</h1>
      <div className="project-list">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <img src={project.thumbnail} alt={project.title} className="thumbnail" />
            <h2>{project.title}</h2>
            <p>{project.shortDescription}</p>

            <Link to={`/projets/${project._id}`}>
              <button id="details">Voir détails du projet</button>
            </Link>

            <button
              className="btn-delete"
              onClick={() => handleDeleteProject(project._id)}
              disabled={!isAuthenticated}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <div className="add-project-container">
        <Link to="/ajouter">
          <button id="btn-ajouter" disabled={!isAuthenticated}>
            Ajouter un projet
          </button>
        </Link>
      </div>
    </div>
  </>
  );
}

export default Projects;
