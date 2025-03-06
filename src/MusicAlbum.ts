import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('music-album')
export class MusicAlbum extends LitElement {
  static styles = css`
    :host {
      --primary-text-color: var(--muza-primary-text-color, #333333);
      --secondary-text-color: var(--muza-secondary-text-color, #5f5f5f);
      --tertiary-text-color: var(--muza-tertiary-text-color, #aaa);
      --border-radius-sm: var(--muza-border-radius-sm, 4px);
      --border-radius-md: var(--muza-border-radius-md, 8px);
      --box-shadow: var(--muza-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      --spacing-xs: var(--muza-spacing-xs, 4px);
      --spacing-sm: var(--muza-spacing-sm, 8px);
      --spacing-md: var(--muza-spacing-md, 12px);
      --spacing-xl: var(--muza-spacing-xl, 24px);
      --primary-font-size: var(--muza-primary-font-size, 14px);
      --secondary-font-size: var(--muza-secondary-font-size, 12px);
      --font-weight-normal: var(--muza-font-weight-normal, 400);

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      padding: var(--spacing-md) var(--spacing-xl) var(--spacing-md) 0;
      border-radius: var(--border-radius-md);
    }

    .image-container {
      position: relative;
      width: 170px;
      height: 170px;
      margin-bottom: var(--spacing-sm);
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius-md);
      margin-bottom: 0;
      box-shadow: var(--box-shadow);
    }

    .play-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: var(--border-radius-sm);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .play-button {
      width: 50px;
      height: 50px;
      background: rgba(128, 128, 128, 0.8);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .play-button::after {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 0 10px 16px;
      border-color: transparent transparent transparent white;
      margin-left: var(--spacing-xs);
    }

    .image-container:hover .play-overlay {
      opacity: 1;
    }

    h3 {
      font-size: var(--primary-font-size);
      color: var(--primary-text-color);
      font-weight: var(--font-weight-normal);
      margin: 0 0 calc(var(--spacing-xs) * 0.75) 0;
      cursor: pointer;
    }

    p {
      font-size: var(--secondary-font-size);
      color: var(--tertiary-text-color);
      font-weight: var(--font-weight-normal);
      margin: 0;
      cursor: pointer;
    }
  `;

  @property({ type: String, attribute: 'image-src' })
  imageSrc = '';

  @property({ type: String })
  title = '';

  @property({ type: String, attribute: 'sub-title' })
  subTitle = '';

  private handleTrackClick() {
    const event = new CustomEvent('album-selected', {
      detail: {
        title: this.title,
        subTitle: this.subTitle,
        imageSrc: this.imageSrc,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div @click=${this.handleTrackClick}>
        <div class="image-container">
          <img src=${this.imageSrc} alt=${this.title} />
          <div class="play-overlay">
            <div class="play-button"></div>
          </div>
        </div>
        <h3>${this.title}</h3>
        <p>${this.subTitle}</p>
      </div>
    `;
  }
}
