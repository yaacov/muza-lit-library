import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface MenuItem {
  icon: string;
  text: string;
  action?: () => void;
}

interface Section {
  title: string;
  items: MenuItem[];
}

@customElement('music-sidebar')
export class MusicSidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 240px;
      height: 100vh;
      background: #f8f8f8;
      padding: 20px 0;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .logo {
      padding: 0 20px 20px;
      text-align: center;
    }

    .logo img {
      max-width: 120px;
      margin: 0 auto;
      display: block;
    }

    .section {
      padding: 20px 0;
      margin: 0 10px;
    }

    .section-title {
      font-size: 12px;
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      padding: 7px 7px;
      border-bottom: 1px solid #eee;
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 7px 7px;
      color: #444;
      text-decoration: none;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      font-size: 14px;
    }

    .menu-item:hover {
      background: #eee;
    }

    .menu-item i {
      margin-right: 10px;
      width: 20px;
      text-align: center;
      color: #666;
    }
  `;

  @property({ type: String, attribute: 'logo-src' })
  logoSrc = '';

  @property({ type: String, attribute: 'logo-alt' })
  logoAlt = 'Logo';

  @property({ type: Array })
  sections: Section[] = [];

  constructor() {
    super();
    this.sections = [];
  }

  willUpdate(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('sections')) {
      // Ensure the component updates when sections change
      this.requestUpdate();
    }
  }

  private handleItemClick(action?: () => void) {
    if (action) {
      action();
    }
  }

  private handleMenuItemClick(item: MenuItem) {
    this.handleItemClick(item.action);
  }

  private renderMenuItem(item: MenuItem) {
    return html`
      <a class="menu-item" @click=${() => this.handleMenuItemClick(item)}>
        <i class="fa-solid fa-${item.icon}"></i>
        <span>${item.text}</span>
      </a>
    `;
  }

  private renderSection(section: Section) {
    const menuItems = section.items.map((item) => this.renderMenuItem(item));

    return html`
      <div class="section">
        <div class="section-title">${section.title}</div>
        ${menuItems}
      </div>
    `;
  }

  render() {
    const sectionElements = this.sections.map((section) =>
      this.renderSection(section)
    );

    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <div class="logo">
        <img src="${this.logoSrc}" alt="${this.logoAlt}" />
      </div>

      ${sectionElements}
    `;
  }
}
