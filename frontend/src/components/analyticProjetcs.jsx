import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../services/service_portfolio';
import './Analytics.css'; 

function AdminAnalytics() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProjects();
      setProjects(data);
    }
    fetchData();
  }, []);

  const totalProjects = projects.length;
  const totalKeywords = projects.reduce((acc, project) => acc + (project.keywords?.length || 0), 0);

  return (
    <>
    <div className="analytics-container">
      <h1>Tableau de bord des Analyses</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>{totalProjects}</h2>
          <p>Projets publiés</p>
        </div>
        <div className="stat-card">
          <h2>{totalKeywords}</h2>
          <p>Mots-clés utilisés</p>
        </div>
      </div>
     </div>
    </> 
  );
}

export default AdminAnalytics;
