/* Déplier les univers de lecture */
const genresGrid = document.getElementById("genres-grid");
const genresToggle = document.querySelector(".genres__toggle");

if (genresGrid && genresToggle) {
  const extraGenres = Array.from(genresGrid.children).slice(4);

  function setGenresExpanded(expanded) {
    extraGenres.forEach((genre) => {
      genre.hidden = !expanded;
    });

    genresToggle.setAttribute("aria-expanded", String(expanded));
    genresToggle.textContent = expanded
      ? "Voir moins d'univers"
      : "Voir tous les univers";
  }

  /* Afficher un univers ciblé par un lien */
  function revealLinkedGenre(hash) {
    const targetId = hash.slice(1);
    const targetIsHiddenGenre = extraGenres.some((genre) => {
      return genre.id === targetId;
    });

    if (targetIsHiddenGenre) {
      setGenresExpanded(true);
    }
  }

  if (extraGenres.length > 0) {
    setGenresExpanded(false);
    genresToggle.hidden = false;

    genresToggle.addEventListener("click", () => {
      const expanded =
        genresToggle.getAttribute("aria-expanded") === "true";

      setGenresExpanded(!expanded);
    });

    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');

      if (link) {
        revealLinkedGenre(link.getAttribute("href"));
      }
    });

    window.addEventListener("hashchange", () => {
      revealLinkedGenre(window.location.hash);
    });

    revealLinkedGenre(window.location.hash);
  }
}
