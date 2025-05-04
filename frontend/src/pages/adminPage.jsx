import React, { useState } from 'react';
import { useAuth } from '../pages/useAuth';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Utilisation du hook useAuth pour accéder à login
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/projets'); // Redirige vers la page des projets
    } else {
      alert('Connexion échouée');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Connexion Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default AdminLogin;
