import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
interface AlbumDetailsData {
  imageSrc: string;
  title: string;
  subTitle: string;
  artist: string;
  genre?: string;
}
@customElement('album-details')
export class AlbumDetails extends LitElement {
  @property({ type: Object }) details: AlbumDetailsData = {
    imageSrc: '',
    title: '',
    subTitle: '',
    artist: '',
    genre: '',
  };
  static styles = css`
    :host {
      display: block;
      margin: var(--muza-spacing-lg) 0;
    }

    .card {
      display: flex;
      align-items: center;
      background: white;
      padding: var(--muza-spacing-lg);
      border-radius: var(--muza-border-radius-md);
    }

    .image-container {
      width: 235px;
      height: 235px;
      border-radius: var(--muza-border-radius-md);
      overflow: hidden;
      background: var(--muza-image-background-color-bg);
      box-shadow: var(--muza-box-shadow);
      margin-right: var(--muza-spacing-lg);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .info {
      margin-left: var(--muza-spacing-lg);
      flex: 1;
    }

    .title {
      font-size: var(--muza-title-font-size);
      font-weight: var(--muza-font-weight-bold-extra);
      color: var(--muza-primary-text-color);
    }

    .artist {
      font-size: var(--muza-heading-font-size);
      color: var(--muza-secondary-text-color);
      font-weight: var(--muza-font-weight-medium);
    }

    .subtitle {
      font-size: var(--muza-secondary-font-size);
      color: var(--muza-tertiary-text-color);
      margin-top: var(--muza-spacing-xs);
    }

    .buttons {
      display: flex;
      gap: var(--muza-spacing-sm);
      margin-top: var(--muza-spacing-md);
    }

    button {
      background: var(--muza-buttons-color);
      border: none;
      padding: var(--muza-spacing-sm);
      border-radius: var(--muza-border-radius-sm);
      cursor: pointer;
      transition: background 0.2s;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
      width: var(--button-size);
      height: var(--button-size);
    }

    button:hover {
      background: var(--muza-button-hover-background);
    }

    .icon-button:hover {
      background: var(--button-hover-bg);
    }

    .icon {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--muza-secondary-text-color);
    }

    /* Three Dots (⋮) */
    .icon-dots::before {
      content: '⋮';
      font-size: 16px;
      font-weight: bold;
    }

    /* Info (ℹ️) */
    .icon-info::before {
      content: 'i';
      font-size: 16px;
      font-weight: bold;
    }

    /* Plus (+) */
    .icon-plus::before {
      content: '+';
      font-size: 18px;
      font-weight: bold;
    }

    /* Shuffle Icon (SVG Styling) */
    .icon-shuffle svg {
      width: 18px;
      height: 18px;
      fill: var(--muza-secondary-text-color);
      stroke: var(--muza-secondary-text-color);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `;

  render() {
    return html`
      <div class="card">
        <div class="image-container">
          <img src="${this.details.imageSrc}" alt="${this.details.title}" />
        </div>
        <div class="info">
          <div class="title">${this.details.title}</div>
          <div class="artist">${this.details.artist}</div>
          <div class="subtitle">
            ${this.details.genre && this.details.genre + '•'}
            ${this.details.subTitle}
          </div>
          <div class="buttons">
            <button class="icon-button">
              <span class="icon icon-dots"></span>
            </button>
            <button class="icon-button">
              <span class="icon icon-info"></span>
            </button>
            <button class="icon-button">
              <span class="icon icon-plus"></span>
            </button>
            <button class="icon-button">
              <span class="icon icon-shuffle">
                <svg viewBox="0 0 24 24">
                  <path d="M16 3h5v5" />
                  <path d="M4 20l16-16" />
                  <path d="M4 4l5 5" />
                  <path d="M21 16v5h-5" />
                  <path d="M15 15l6 6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
