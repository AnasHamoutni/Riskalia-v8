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
      <footer class="footer-component">
        <div class="footer-container">
          <div class="footer-grid">
            <!-- Company Info -->
            <div class="footer-section footer-company-info">
              <h4>Riskalia</h4>
              <p data-i18n="footer.desc">
                Cabinet de courtage & réassurance agréé ACAPS<br/>
                Siège : 16, Rue de Terves, 2ème Etage. Quartier Mers Sultan, Casablanca
              </p>
            </div>
            
            <!-- Links -->
            <div class="footer-section">
              <h4 data-i18n="footer.links">Liens</h4>
              <div class="footer-links">
                <a href="/solutions.html" data-i18n="nav.solutions">Solutions</a>
                <a href="/reinsurance.html" data-i18n="nav.re">Réassurance</a>
                <a href="/climate.html" data-i18n="nav.climate">Risques Climatiques</a>
                <a href="/services.html" data-i18n="nav.services">Services de Conseil</a>
                <a href="/esg.html" data-i18n="nav.esg">ESG</a>
              </div>
            </div>
            
            <!-- Contact -->
            <div class="footer-section">
              <h4 data-i18n="footer.contact">Contact</h4>
              <div class="footer-contact-info">
                <div class="footer-contact-item">
                  <strong data-i18n="footer.contactBlock.tel">Tél1:</strong>
                  <span data-i18n="footer.contactBlock.telNum1">+212-666-756991</span>
                </div>
                <div class="footer-contact-item">
                  <strong data-i18n="footer.contactBlock.tel2">Tél2:</strong>
                  <span data-i18n="footer.contactBlock.telNum2">+212-675-208909</span>
                </div>
                <div class="footer-contact-item">
                  <strong data-i18n="footer.contactBlock.nabil">Nabil:</strong>
                  <a href="mailto:nabil.cherkaoui@riskalia.ma">nabil.cherkaoui@riskalia.ma</a>
                </div>
                <div class="footer-contact-item">
                  <strong data-i18n="footer.contactBlock.infos">Infos:</strong>
                  <a href="mailto:contact@riskalia.ma">contact@riskalia.ma</a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>
              © 2024 Riskalia. Tous droits réservés.
            </p>
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
