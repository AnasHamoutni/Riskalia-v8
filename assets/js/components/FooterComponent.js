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
    <footer class="footer-component bg-[#232b32] text-gray-200 py-10 text-sm">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <!-- Col 1 : Identity -->
          <div>
            <h4 class="text-white text-lg font-bold mb-3">Riskalia</h4>
            <p class="leading-relaxed mb-3">
              Cabinet de courtage & stratégies agréé ACAPS.<br/>
              Siège : 16, Rue de Terves, 2ème étage.<br/>
              Quartier Mers Sultan, Casablanca.
            </p>
            <p class="text-xs text-gray-400 italic">
              Intermédiaire d'assurance régi par la loi 17-99 portant code des assurances.<br/>
              Sous la décision n°COU5047.00000.0.C.2025.472.
            </p>
          </div>

          <!-- Col 2 : Navigation -->
          <div class="md:pl-10">
            <h4 class="text-white text-lg font-bold mb-3">Navigation</h4>
            <ul class="space-y-2">
              <li><a href="/solutions.html" class="hover:text-white">Solutions</a></li>
              <li><a href="/reinsurance.html" class="hover:text-white">Réassurance</a></li>
              <li><a href="/climate.html" class="hover:text-white">Risques climatiques</a></li>
              <li><a href="/esg.html" class="hover:text-white">ESG</a></li>
              <li><a href="/services.html" class="hover:text-white">Conseil & Stratégie</a></li>
            </ul>
            
            <h5 class="text-white font-semibold mt-5 mb-2 text-sm">Produits d’assurance</h5>
            <div class="grid grid-cols-2 gap-x-4 text-gray-300 text-sm">
              <ul class="space-y-1">
                <li><a href="/Produits/auto.html">Auto</a></li>
                <li><a href="/Produits/flotte.html">Flotte</a></li>
                <li><a href="/Produits/habitation.html">Habitation</a></li>
                <li><a href="/Produits/multirisques.html">Multirisques</a></li>
                <li><a href="/Produits/rc.html">Responsabilité Civile</a></li>
                <li><a href="/Produits/construction.html">Construction</a></li>
              </ul>
              <ul class="space-y-1">
                <li><a href="/Produits/transport.html">Transport</a></li>
                <li><a href="/Produits/alv.html">Accidents de la vie</a></li>
                <li><a href="/Produits/sante.html">Santé</a></li>
                <li><a href="/Produits/santecollective.html">Santé collective</a></li>
                <li><a href="/Produits/retraite.html">Retraite</a></li>
                <li><a href="/Produits/vie.html">Vie</a></li>
              </ul>
            </div>
          </div>

          <!-- Col 3 : Contact -->
          <div>
            <h4 class="text-white text-lg font-bold mb-3">Contact</h4>
            <p class="mb-3">
              16, Rue de Terves, 2ème étage<br/>Casablanca, Maroc
            </p>
            <p>
              <strong>Tél :</strong> +212 666 756 991<br/>
              <strong>Tél :</strong> +212 675 208 909<br/>
              <strong>Email :</strong>
              <a href="mailto:contact@riskalia.ma" class="underline hover:text-white">contact@riskalia.ma</a>
            </p>
            <div class="flex gap-4 mt-4 text-lg text-gray-400">
              <a href="#" aria-label="LinkedIn" class="hover:text-white"><i class="fab fa-linkedin"></i></a>
              <a href="#" aria-label="YouTube" class="hover:text-white"><i class="fab fa-youtube"></i></a>
              <a href="#" aria-label="X" class="hover:text-white"><i class="fab fa-twitter"></i></a>
              <a href="#" aria-label="Pinterest" class="hover:text-white"><i class="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>

        <!-- Bottom -->
        <div class="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4 text-xs">
          © 2025 Riskalia. Tous droits réservés.
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







