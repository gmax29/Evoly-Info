(function() {
  const SPRACHEN = [
    ["de", "Deutsch"],
    ["en", "English"],
    ["fr", "Français"],
    ["es", "Español"],
    ["it", "Italiano"],
    ["pt", "Português"],
    ["nl", "Nederlands"],
    ["pl", "Polski"],
    ["tr", "Türkçe"],
    ["ru", "Русский"],
    ["uk", "Українська"],
    ["zh", "中文"],
    ["ja", "日本語"]
  ];
  const CODES = SPRACHEN.map(([code]) => code);
  const MERKER = "evoly.sprache";
  function lies() {
    try {
      return localStorage.getItem(MERKER);
    } catch {
      return null;
    }
  }
  function merke(code) {
    try {
      localStorage.setItem(MERKER, code);
    } catch {
    }
  }
  let sprache = null;
  const ausAdresse = new URLSearchParams(location.search).get("lang");
  if (CODES.includes(ausAdresse)) {
    sprache = ausAdresse;
    merke(sprache);
  }
  if (!sprache && CODES.includes(lies())) sprache = lies();
  if (!sprache) {
    for (const eintrag of navigator.languages || [navigator.language]) {
      const code = String(eintrag || "").slice(0, 2).toLowerCase();
      if (CODES.includes(code)) {
        sprache = code;
        break;
      }
    }
  }
  sprache = sprache || "de";
  window.EVOLY_SPRACHE = sprache;
  window.EVOLY_TEXTE = window.EVOLY_TEXTE || {};
  window.evolyText = function(schluessel, ersatz, werte) {
    const tabelle = window.EVOLY_TEXTE[sprache] || {};
    let text = Object.prototype.hasOwnProperty.call(tabelle, schluessel) ? tabelle[schluessel] : ersatz;
    if (werte) for (const [name, wert] of Object.entries(werte)) text = String(text).split("{" + name + "}").join(String(wert));
    return text;
  };
  if (sprache !== "de") {
    document.documentElement.classList.add("i18n-wartet");
    const pfad = document.currentScript && document.currentScript.src ? new URL("i18n/" + sprache + ".js", document.currentScript.src).href : "i18n/" + sprache + ".js";
    document.write('<script src="' + pfad + '"><\/script>');
  }
  function anwenden() {
    const tabelle = window.EVOLY_TEXTE[sprache];
    document.documentElement.lang = sprache;
    if (sprache !== "de" && tabelle) {
      for (const element of document.querySelectorAll("[data-i18n]")) {
        const text = tabelle[element.getAttribute("data-i18n")];
        if (text == null) continue;
        if (element.tagName === "TITLE") document.title = text;
        else element.innerHTML = text;
      }
      for (const element of document.querySelectorAll("[data-i18n-attr]")) {
        for (const teil of element.getAttribute("data-i18n-attr").split("|")) {
          const [attribut, schluessel] = teil.split(":");
          if (tabelle[schluessel] != null) element.setAttribute(attribut, tabelle[schluessel]);
        }
      }
      for (const element of document.querySelectorAll("[data-nur-uebersetzt]")) element.hidden = false;
    }
    document.documentElement.classList.remove("i18n-wartet");
    wahlBauen();
  }
  function wahlBauen() {
    const leiste = document.querySelector(".nav");
    if (!leiste || leiste.querySelector(".sprachwahl")) return;
    const wahl = document.createElement("select");
    wahl.className = "sprachwahl";
    wahl.setAttribute("aria-label", window.evolyText("js.sprachwahl", "Sprache wählen"));
    for (const [code, name] of SPRACHEN) wahl.append(new Option(name, code, false, code === sprache));
    wahl.addEventListener("change", function() {
      merke(wahl.value);
      const adresse = new URL(location.href);
      adresse.searchParams.delete("lang");
      location.replace(adresse.href);
    });
    leiste.append(wahl);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", anwenden);
  else anwenden();
  setTimeout(function() {
    document.documentElement.classList.remove("i18n-wartet");
  }, 2500);
})();
