
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");


// varier manuellement la largeur  entre 60% - 85% pour un bon rendu
const projects = {
    charvonnex74: {
      json: "charvonnex.json",
      images: [
        { file: "exterieur1.jpg", width: "85%", caption: "Vue extérieure 1" },
        { file: "exterieur2.jpg", width: "60%", caption: "Vue extérieure 2" },
        { file: "exterieur3.jpg", width: "70%", caption: "Vue extérieure 3" },
        { file: "interieur1.jpg", width: "75%", caption: "Vue intérieure 1" },
        { file: "interieur2.jpg", width: "85%", caption: "Vue intérieure 2" },
        { file: "interieur3.jpg", width: "70%", caption: "Vue intérieure 3" },
        { file: "interieur4.jpg", width: "80%", caption: "Vue intérieure 4" },
        { file: "interieur5.jpg", width: "85%", caption: "Vue intérieure 5" }
      ]
    },
    sdis74: {
      json: "sdis.json",
      images: [
        { file: "exterieur1.jpg", width: "80%", caption: "Vue extérieure 1" },
        { file: "exterieur2.jpg", width: "85%", caption: "Vue extérieure 2" },
        { file: "exterieur3.jpg", width: "65%", caption: "Vue extérieure 3" },
        { file: "exterieur4.jpg", width: "75%", caption: "Vue extérieure 4" },
        { file: "exterieur5.jpg", width: "65%", caption: "Vue extérieure 5" },
        { file: "interieur1.jpg", width: "70%", caption: "Vue intérieure 1" },
        { file: "interieur2.jpg", width: "80%", caption: "Vue intérieure 2" }
      ]
    },
    vulbens74: {
      json: "vulbens.json",
      images: [
        { file: "exterieur1.jpg", width: "70%", caption: "Vue extérieure 1" },
        { file: "exterieur2.jpg", width: "80%", caption: "Vue extérieure 2" },
        { file: "exterieur3.jpg", width: "60%", caption: "Vue extérieure 3" },
        { file: "exterieur4.jpg", width: "75%", caption: "Vue extérieure 4" },
        { file: "exterieur5.jpg", width: "65%", caption: "Vue extérieure 5" },
        { file: "exterieur6.jpg", width: "80%", caption: "Vue extérieure 6" }
      ]
    },
    allonzier74: {
      json: "allonzier.json",
      images: [
        { file: "exterieur1.jpg", width: "70%", caption: "Vue extérieure 1" },
        { file: "exterieur2.jpg", width: "80%", caption: "Vue extérieure 2" },
        { file: "exterieur3.jpg", width: "60%", caption: "Vue extérieure 3" },
        { file: "exterieur4.jpg", width: "75%", caption: "Vue extérieure 4" },
        { file: "exterieur5.jpg", width: "65%", caption: "Vue extérieure 5" },
        { file: "interieur1.jpg", width: "80%", caption: "Vue interieur 1" },
        { file: "interieur2.jpg", width: "75%", caption: "Vue interieur 2" },
        // { file: "plan-masse.svg", width: "85%", caption: "Plan masse" },
        // { file: "plan-rdc.svg", width: "85%", caption: "Plan du rez-de-chaussée" }
      ]
    },
    marquisats74: {
      json: "marquisats.json",
      images: [
        { file: "apres1.jpg", width: "70%", caption: "Vue extérieure 1" },
        { file: "apres2.jpg", width: "80%", caption: "Vue extérieure 2" },
        { file: "apres3.jpg", width: "60%", caption: "Vue extérieure 3" },
        { file: "apres4.jpg", width: "75%", caption: "Vue extérieure 4" },
        { file: "avant1.jpg", width: "65%", caption: "Avant 1" },
        { file: "avant2.jpg", width: "80%", caption: "Avant 2" },
        { file: "pendant1.jpg", width: "75%", caption: "Travaux" },
      ]
    },
    annecy74: {
      json: "annecy.json",
      images: [
        { file: "exterieur1.jpg", width: "70%", caption: "Vue extérieure 1" },
        { file: "exterieur2.jpg", width: "80%", caption: "Vue extérieure 2" },
        { file: "exterieur3.jpg", width: "60%", caption: "Vue extérieure 3" },
        { file: "exterieur4.jpg", width: "75%", caption: "Vue extérieure 4" },
        { file: "interieur1.jpg", width: "65%", caption: "Vue interieur 1" },
        { file: "interieur2.jpg", width: "80%", caption: "Vue interieur 2" },
        { file: "interieur3.jpg", width: "855%", caption: "Vue interieur 3" },
        { file: "avant1.jpg", width: "75%", caption: "Travaux" },
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

    document.getElementById("project-description").innerHTML =
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
