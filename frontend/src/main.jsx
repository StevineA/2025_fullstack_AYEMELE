import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from './components/accueil';
import Projects from './components/Projets';
import ProjectDetail from './components/detailsProjet';
import AddProject from './components/ajouterProjet';
import EditProject from './components/editProjet';
import { AuthProvider } from './pages/authProvider';
import AdminLogin from './pages/adminPage'; 
import AdminAnalytics from './components/analyticProjetcs';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/projets" element={<Projects />} /> 
          <Route path="/projets/:id" element={<ProjectDetail />} />         
          <Route path="/ajouter" element={<AddProject />} /> 
          <Route path="/projets/edit/:id" element={<EditProject />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />

        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
