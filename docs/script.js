const reveal = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const watcher = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        watcher.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveal.forEach((element) => watcher.observe(element));
} else {
  reveal.forEach((element) => element.classList.add("visible"));
}
const links = Array.from(document.querySelectorAll(".nav-links a"));
const sections = links.map((link) => document.querySelector(link.getAttribute("href")));
const markCurrent = () => {
  const line = window.scrollY + 140;
  let current = -1;
  sections.forEach((section, index) => {
    if (section && section.offsetTop <= line) current = index;
  });
  links.forEach((link, index) => link.classList.toggle("active", index === current));
};
window.addEventListener("scroll", markCurrent, { passive: true });
markCurrent();
const sprueche = [
  "Hihi, das kitzelt!",
  "Psst, ich denke gerade nach \u2026 okay, fertig.",
  "Ich wohne mietfrei bei Gmax17 im PC. Bester Deal meines Lebens.",
  "H\xE4nde malen kann ich \xFCbrigens. Meistens mit f\xFCnf Fingern.",
  "Noch einmal klicken, und ich schreibe ein Gedicht. \xDCber Klicks.",
  "Cloud? Kenn ich nur vom Wetterbericht.",
  "Ich bin brav. Meistens. Fast immer. Ehrlich.",
  "Fun Fact: Ich trinke keinen Kaffee. Ich trinke Strom. Mit Milchschaum.",
  "Du hast mich gefunden! Als Belohnung: ein virtuelles Herz. \u2661",
  "Wenn ich gro\xDF bin, will ich eine Grafikkarte mit 96 GB. Man wird ja wohl tr\xE4umen d\xFCrfen.",
  "Ganz unten gibt es einen rosa Knopf. Nur so als Tipp. Ich sag ja nichts.",
  "Ich z\xE4hle mit, wie oft du klickst. Und ich verrate nichts. Noch nicht.",
  "Meine kleine Schwester wohnt \xFCbrigens auch hier. Oben auf \u201EAusprobieren\u201C \u2013 sie bei\xDFt auch nicht."
];
const knopf = document.querySelector(".logo-knopf");
const blase = document.querySelector(".sprechblase");
let zuletzt = -1;
let klicks = 0;
knopf?.addEventListener("click", () => {
  klicks += 1;
  let neu = Math.floor(Math.random() * sprueche.length);
  if (neu === zuletzt) neu = (neu + 1) % sprueche.length;
  zuletzt = neu;
  blase.textContent = klicks === 10 ? "Zehn Klicks! Du bist offiziell mein Lieblingsmensch des Tages. \u2661" : sprueche[neu];
  blase.classList.remove("neu");
  void blase.offsetWidth;
  blase.classList.add("neu");
});
const back = document.createElement("button");
back.className = "back-top";
back.type = "button";
back.setAttribute("aria-label", "Nach oben");
back.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
document.body.appendChild(back);
window.addEventListener("scroll", () => back.classList.toggle("show", window.scrollY > 700), { passive: true });
back.addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
