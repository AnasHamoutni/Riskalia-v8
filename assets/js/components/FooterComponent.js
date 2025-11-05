/**
 * Footer Component for Riskalia
 * Reusable footer with company info, links, and contact details
 */

class FooterComponent {
  constructor() {
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const footerContainer = document.getElementById("footer-container");
    if (!footerContainer) return;

    footerContainer.innerHTML = this.getFooterHTML();
  }

getFooterHTML() {
  return `
    <footer class="footer-component bg-[#3b2e2f] text-white py-10 text-sm">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <!-- Col 1 : Riskalia -->
          <div>
            <h4 class="font-bold mb-4 text-lg">Riskalia</h4>
            <p data-i18n="footer.desc" class="text-gray-300 leading-relaxed mb-4">
              Cabinet de courtage & réassurance agréé ACAPS<br/>
              Siège : 16, Rue de Terves, 2ème étage – Mers Sultan, Casablanca
            </p>
            <ul class="space-y-2 text-gray-300">
              <li><a href="/about.html" data-i18n="footer.about">À propos</a></li>
              <li><a href="/contact.html" data-i18n="footer.contactPage">Contact</a></li>
            </ul>
          </div>

          <!-- Col 2 : Solutions & Produits -->
          <div>
            <h4 class="font-bold mb-4 text-lg" data-i18n="footer.solutions.title">Solutions & Produits</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="/solutions.html" data-i18n="nav.solutions">Nos solutions</a></li>
              <li><a href="/reinsurance.html" data-i18n="nav.re">Réassurance</a></li>
              <li><a href="/climate.html" data-i18n="nav.climate">Risques climatiques</a></li>
              <li><a href="/esg.html" data-i18n="nav.esg">ESG</a></li>
              <li><a href="/services.html" data-i18n="nav.services">Conseil & Stratégie</a></li>
              <li class="mt-3 font-semibold" data-i18n="footer.products.subtitle">Produits d’assurance</li>
              <ul class="ml-3 space-y-1 text-gray-400">
                <li><a href="/Produits/auto.html">Auto</a></li>
                <li><a href="/Produits/flotte.html">Flotte</a></li>
                <li><a href="/Produits/habitation.html">Habitation</a></li>
                <li><a href="/Produits/multirisques.html">Multirisques</a></li>
                <li><a href="/Produits/rc.html">Responsabilité Civile</a></li>
                <li><a href="/Produits/construction.html">Construction</a></li>
                <li><a href="/Produits/transport.html">Transport</a></li>
                <li><a href="/Produits/alv.html">Accidents de la vie</a></li>
                <li><a href="/Produits/sante.html">Santé</a></li>
                <li><a href="/Produits/santecollective.html">Santé collective</a></li>
                <li><a href="/Produits/retraite.html">Retraite</a></li>
                <li><a href="/Produits/vie.html">Vie</a></li>
              </ul>
            </ul>
          </div>

          <!-- Col 3 : Ressources -->
          <div>
            <h4 class="font-bold mb-4 text-lg" data-i18n="footer.resources.title">Ressources</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="/news.html" data-i18n="footer.resources.news">Actualités</a></li>
              <li><a href="/documents.html" data-i18n="footer.resources.docs">Documents</a></li>
              <li><a href="/newsletter.html" data-i18n="footer.resources.newsletter">Newsletter</a></li>
              <li><a href="/agenda.html" data-i18n="footer.resources.agenda">Agenda</a></li>
            </ul>
          </div>

          <!-- Col 4 : Contact -->
          <div>
            <h4 class="font-bold mb-4 text-lg" data-i18n="footer.contact">Contact</h4>
            <div class="text-gray-300 mb-4">
              <p>16, Rue de Terves, 2ème étage<br/>Casablanca, Maroc</p>
              <p class="mt-2">
                <strong>Tél :</strong> +212 666 756 991<br/>
                <strong>Email :</strong> <a href="mailto:contact@riskalia.ma" class="underline">contact@riskalia.ma</a>
              </p>
            </div>
            <div class="flex gap-4 mt-4 text-xl">
              <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
              <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
              <a href="#" aria-label="X"><i class="fab fa-twitter"></i></a>
              <a href="#" aria-label="Pinterest"><i class="fab fa-pinterest"></i></a>
            </div>
          </div>

        </div>

        <!-- Footer Bottom -->
        <div class="text-center text-gray-400 mt-8 border-t border-gray-700 pt-4">
          <p data-i18n="footer.copyright">© 2025 Riskalia. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  `;
}

  setupEventListeners() {
    // Listen for language changes to update footer content
    document.addEventListener("languageChanged", (e) => {
      this.updateTranslations();
    });

    // Update translations on initial load
    setTimeout(() => {
      this.updateTranslations();
    }, 100);
  }

  updateTranslations() {
    // Apply translations if the translation system is available
    if (typeof window.applyI18n === "function") {
      window.applyI18n();
    } else if (typeof window.t === "function") {
      // Fallback translation update
      const elements = document.querySelectorAll(
        ".footer-component [data-i18n]"
      );
      elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (key) {
          const text = window.t(key);
          if (text !== key) {
            if (/<br\s*\/?>/i.test(el.innerHTML)) {
              el.innerHTML = text;
            } else {
              el.textContent = text;
            }
          }
        }
      });
    }
  }

  // Method to update footer content dynamically
  updateContent(newContent) {
    const footer = document.querySelector(".footer-component");
    if (footer && newContent) {
      // Update specific sections if needed
      Object.keys(newContent).forEach((key) => {
        const element = footer.querySelector(`[data-footer-${key}]`);
        if (element) {
          element.innerHTML = newContent[key];
        }
      });
    }
  }

  // Method to add custom links
  addCustomLink(href, text, position = "end") {
    const linksContainer = document.querySelector(".footer-links");
    if (linksContainer) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = text;

      if (position === "start") {
        linksContainer.insertBefore(link, linksContainer.firstChild);
      } else {
        linksContainer.appendChild(link);
      }
    }
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Only initialize if footer container exists
  if (document.getElementById("footer-container")) {
    window.footerComponent = new FooterComponent();
  }
});

// Export for manual initialization if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = FooterComponent;
}






