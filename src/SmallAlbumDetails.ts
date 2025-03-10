import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('small-album-details')
export class SmallAlbumDetails extends LitElement {
  static styles = css`
    :host {
      --secondary-text-color: var(--muza-secondary-text-color, #5f5f5f);
      --title-font-size: var(--muza-title-font-size, 27px);
      --font-weight-extra: var(--muza-font-weight-bold-extra, 700);
      --primary-font-size: var(--muza-primary-font-size, 14px);

      text-align: center;

      img {
        border-radius: 10px;
        background-color: var(--muza-image-background-color-bg, #d9d9d9);
      }

      h3 {
        font-size: var(--title-font-size);
        color: var(--secondary-text-color);
        font-weight: var(--font-weight-extra);
        margin: 0 0 calc(var(--spacing-xs) * 0.75) 0;
        cursor: pointer;
      }

      p {
        font-size: var(--primary-font-size);
        color: var(--muza-section-border-color, #a9a9a9);
        font-weight: var(--muza-font-weight-medium, 500px);
        margin: 0;
        cursor: pointer;
      }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  author = '';

  @property({ type: String })
  imageSrc = '';

  render() {
    return html`
      <img
        src=${this.imageSrc}
        alt=${this.title}
        width="148px"
        height="148px"
      />
      <h3>${this.title}</h3>
      <p>${this.author}</p>
    `;
  }
}
