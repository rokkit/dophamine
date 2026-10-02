// Picks English or Russian: ?lang= wins, then the saved choice, then the browser language.
(function () {
  var root = document.documentElement;
  var param = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var browser = (navigator.language || "en").toLowerCase().indexOf("ru") === 0 ? "ru" : "en";
  var initial = param === "ru" || param === "en" ? param : saved || browser;

  function apply(lang) {
    root.lang = lang;
    var title = document.querySelector("meta[name='title-" + lang + "']");
    if (title) document.title = title.content;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.set === lang));
    });
  }

  apply(initial);
  document.addEventListener("DOMContentLoaded", function () {
    apply(root.lang);
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.dataset.set);
        try { localStorage.setItem("lang", b.dataset.set); } catch (e) {}
      });
    });
  });
})();
