import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('music-section')
export class MusicSection extends LitElement {
  static styles = css`
    :host {
      flex: 1;
      margin-bottom: var(--muza-section-margin-bottom, 2rem);
      --section-horizontal-padding: var(--muza-songline-padding, 8px 8px);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: var(--muza-section-header-min-height, 32px);
      margin: 0;
      margin-top: var(--muza-section-header-margin-top, 2rem);
      padding: var(--muza-section-header-padding-top, 0.3rem)
        var(--muza-spacing-md, 8px)
        var(--muza-section-header-padding-bottom, 0.3rem);
      border-top: 2px solid var(--muza-section-border-color, #a9a9a9);
      border-bottom: 1px solid var(--muza-section-border-color, #a9a9a9);
    }

    h2 {
      flex-grow: 1;
      margin: 0;
      line-height: var(--muza-section-header-min-height, 32px);
      font-size: var(--muza-heading-font-size, 18px);
      font-weight: var(--muza-font-weight-bold, 600);
      color: var(--muza-section-title-color, #5f5f5f);
    }

    p {
      margin: 0;
      padding: 0 var(--muza-spacing-md, 8px) 1rem var(--muza-spacing-md, 8px);
      color: var(--muza-section-subtitle-color, #888);
    }

    .section-content {
      padding: 0;
    }

    .content-items {
      display: flex;
      max-width: 100%;
      flex: 1;
      padding: 0 0 0 0;
      overflow-x: auto;
    }

    .content-items > music-album:first-child {
      margin-left: 0;
    }

    .section-button {
      align-self: center;
      padding: var(--muza-section-button-padding, 6px 10px);
      border: none;
      border-radius: var(--muza-border-radius-sm, 6px);
      background-color: var(--muza-button-background, #eee);
      color: var(--muza-section-button-color, #333);
      font-size: var(--muza-section-button-font-size, 12px);
      text-decoration: none;
      cursor: pointer;
    }

    .section-button:hover {
      background-color: var(--muza-button-hover-background, #ddd);
    }

    /* Scrollbar styles */
    ::-webkit-scrollbar {
      height: var(--muza-section-scrollbar-height, 9px);
    }
    ::-webkit-scrollbar-button {
      width: 0px;
      background: var(--muza-section-scrollbar-button-bg, #eee);
      border-radius: 100px;
    }
    ::-webkit-scrollbar-album-piece {
      background: var(--muza-section-scrollbar-track-bg, #c2c2c2);
      border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--muza-section-scrollbar-thumb-bg, #5f5f5f);
      border-radius: 100px;
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  subTitle = '';

  @property({ type: Array })
  albums: { imageSrc: string; title: string; subTitle: string }[] = [];

  private handleShowAll() {
    this.dispatchEvent(
      new CustomEvent('show-all', {
        bubbles: true,
        composed: true,
        detail: { sectionTitle: this.title },
      })
    );
  }

  private renderAlbums() {
    return this.albums.map(
      (album) => html`
        <music-album
          image-src=${album.imageSrc}
          title=${album.title}
          sub-title=${album.subTitle}
        ></music-album>
      `
    );
  }

  render() {
    return html`
      <div class="section-header">
        <h2>${this.title}</h2>
        <button class="section-button" @click=${this.handleShowAll}>
          Show All
        </button>
      </div>
      ${this.subTitle ? html`<p>${this.subTitle}</p>` : ''}
      <div class="section-content">
        <div class="content-items">${this.renderAlbums()}</div>
      </div>
    `;
  }
}
