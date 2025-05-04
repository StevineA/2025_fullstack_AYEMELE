const API_URL = "http://localhost:3000/projects"; 

// Récupérer tous les projets
export async function fetchProjects() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des projets");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur dans fetchProjects:", error);
    return [];
  }
}

// Créer un nouveau projet
export async function createProject(project) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création du projet");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur dans createProject:", error);
    throw error;
  }
}

// Récupérer un projet spécifique par ID
export async function findProjectById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du projet");
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur dans fetchProjectById:", error);
      return null;
    }
  }
  

// Mettre à jour un projet
export async function updateProject(id, updatedProject) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour du projet");
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json(); 
    } else {
      return await response.text(); 
    }
    
  } catch (error) {
    console.error("Erreur dans updateProject:", error);
    throw error;
  }
}


// Supprimer un projet
export async function deleteProject(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du projet");
    }
    return true;
  } catch (error) {
    console.error("Erreur dans deleteProject:", error);
    throw error;
  }
}
