
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const projects = {
    charvonnex74: {
      json: "charvonnex.json",
      images: [
        { file: "exterieur1.jpg", width: "100%", caption: "Vue extérieure 1" },
        { file: "exterieur2.jpg", width: "85%", caption: "Vue extérieure 2" },
        { file: "exterieur3.jpg", width: "95%", caption: "Vue extérieure 3" },
        { file: "interieur1.jpg", width: "75%", caption: "Vue intérieure 1" },
        { file: "interieur2.jpg", width: "100%", caption: "Vue intérieure 2" },
        { file: "interieur3.jpg", width: "90%", caption: "Vue intérieure 3" },
        { file: "interieur4.jpg", width: "80%", caption: "Vue intérieure 4" },
        { file: "interieur5.jpg", width: "100%", caption: "Vue intérieure 5" }
      ]
    },
    sdis74: {
      json: "sdis.json",
      images: [
        { file: "exterieur1.jpg", width: "100%", caption: "Vue extérieure 1" },
        { file: "exterieur2.jpg", width: "85%", caption: "Vue extérieure 2" },
        { file: "exterieur3.jpg", width: "95%", caption: "Vue extérieure 3" },
        { file: "exterieur4.jpg", width: "75%", caption: "Vue extérieure 4" },
        { file: "exterieur5.jpg", width: "100%", caption: "Vue extérieure 5" },
        { file: "interieur1.jpg", width: "90%", caption: "Vue intérieure 1" },
        { file: "interieur2.jpg", width: "80%", caption: "Vue intérieure 2" }
      ]
    },
    vulbens74: {
      json: "vulbens.json",
      images: [
        { file: "exterieur1.jpg", width: "100%", caption: "Vue extérieure 1" },
        { file: "exterieur2.jpg", width: "80%", caption: "Vue extérieure 2" },
        { file: "exterieur3.jpg", width: "95%", caption: "Vue extérieure 3" },
        { file: "exterieur4.jpg", width: "75%", caption: "Vue extérieure 4" },
        { file: "exterieur5.jpg", width: "90%", caption: "Vue extérieure 5" },
        { file: "exterieur6.jpg", width: "100%", caption: "Vue extérieure 6" }
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


  gallery.innerHTML = "";


  project.images.forEach((item) => {
    const filename = typeof item === "string" ? item : item.file;
    const width = typeof item === "string" ? "100%" : (item.width || "100%");

    const defaultCaption = filename
      .replace(/\.[^.]+$/, "")
      .replace(/(\D)(\d+)$/, "$1 $2");

    const captionText = typeof item === "string"
      ? defaultCaption
      : (item.caption ?? defaultCaption);

    // Conteneur de chaque photo
    const figure = document.createElement("figure");
    figure.className = "project-figure";
    figure.style.setProperty("--photo-width", width);

    // Image
    const image = document.createElement("img");
    image.src = basePath + filename;
    image.alt = `${data.titre} — ${captionText}`;
    image.loading = "lazy";

    // Légende
    const caption = document.createElement("figcaption");
    caption.textContent = captionText;

    // Conteneur image + légende
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "project-image-wrapper";

    imageWrapper.appendChild(caption);
    imageWrapper.appendChild(image);

    figure.appendChild(imageWrapper);
    gallery.appendChild(figure);
  });



  } catch (error) {
    console.error(error);

    document.querySelector(".project-detail").textContent =
      "Erreur lors du chargement du projet.";
  }
}

loadProject();
