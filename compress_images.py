from pathlib import Path
from PIL import Image, ImageOps
from io import BytesIO

DOSSIER = Path(__file__).resolve().parent / "assets/projets"
TAILLE_MAX = 2400
QUALITE = 85

total_avant = 0
total_apres = 0

for fichier in DOSSIER.rglob("*"):
    if fichier.suffix.lower() not in (".jpg", ".jpeg"):
        continue

    poids_avant = fichier.stat().st_size
    total_avant += poids_avant

    try:
        with Image.open(fichier) as image:
            profil_icc = image.info.get("icc_profile")

            image = ImageOps.exif_transpose(image)
            image = image.convert("RGB")
            image.thumbnail(
                (TAILLE_MAX, TAILLE_MAX),
                Image.Resampling.LANCZOS
            )

            buffer = BytesIO()

            image.save(
                buffer,
                format="JPEG",
                quality=QUALITE,
                optimize=True,
                progressive=True,
                icc_profile=profil_icc
            )

        contenu = buffer.getvalue()

        if len(contenu) < poids_avant:
            fichier.write_bytes(contenu)

        poids_apres = fichier.stat().st_size
        total_apres += poids_apres

        print(
            f"{fichier.parent.name}/{fichier.name} : "
            f"{poids_avant / 1024:.0f} Ko -> "
            f"{poids_apres / 1024:.0f} Ko"
        )

    except Exception as erreur:
        total_apres += poids_avant
        print(f"Erreur : {fichier} : {erreur}")

print("\n--- RESULTAT ---")
print(f"Avant : {total_avant / 1024**2:.2f} Mo")
print(f"Apres : {total_apres / 1024**2:.2f} Mo")
print(f"Economie : {(total_avant - total_apres) / 1024**2:.2f} Mo")