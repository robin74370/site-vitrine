
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const projects = {
    charvonnex74: {
        json: "charvonnex.json",
        images: [
        "exterieur1.jpg",
        "exterieur2.jpg",
        "exterieur3.jpg",
        "interieur1.jpg",
        "interieur2.jpg",
        "interieur3.jpg",
        "interieur4.jpg",
        "interieur5.jpg"
        ]
    },
    sdis74: {
        json: "sdis.json",
        images: [
        "exterieur1.jpg",
        "exterieur2.jpg",
        "exterieur3.jpg",
        "exterieur4.jpg",
        "exterieur5.jpg",
        "interieur1.jpg",
        "interieur2.jpg"
        ]
    },
    vulbens74: {
        json: "vulbens.json",
        images: [
        "exterieur1.jpg",
        "exterieur2.jpg",
        "exterieur3.jpg",
        "exterieur4.jpg",
        "exterieur5.jpg",
        "exterieur6.jpg",
        ]
    }
};

async function loadProject() {
  const project = projects[projectId];

  if (!project) {
    document.querySelector(".project-detail").textContent =
      "Projet introuvable.";
    return;
  }

  const basePath = `assets/projets/${projectId}/`;

  try {
    const response = await fetch(basePath + project.json);

    if (!response.ok) {
      throw new Error("Impossible de charger le projet.");
    }

    const data = await response.json();

    document.title =
      `${data.titre} — Atelier Catherine Boidevaix`;

    document.getElementById("project-title").textContent =
      data.titre;

    document.getElementById("project-date").textContent =
      data.date || "";

    document.getElementById("project-description").textContent =
      data.texte || "";

    const gallery = document.getElementById("project-gallery");


    project.images.forEach((filename) => {
    const figure = document.createElement("figure");
    figure.className = "project-figure";

    const image = document.createElement("img");
    image.src = basePath + filename;
    image.alt = `${data.titre} — ${filename}`;
    image.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.textContent = filename
        .replace(/\.[^.]+$/, "")
        .replace(/(\D)(\d+)$/, "$1 $2");

    figure.appendChild(image);
    figure.appendChild(caption);

    gallery.appendChild(figure);
    });


  } catch (error) {
    console.error(error);

    document.querySelector(".project-detail").textContent =
      "Erreur lors du chargement du projet.";
  }
}

loadProject();
