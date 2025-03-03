import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('music-section')
export class MusicSection extends LitElement {
  static styles = css`
    :host {
      margin-bottom: 2rem;
      flex: 1;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0 0.1rem 16px;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #a9a9a9;
      min-height: 32px;
      border-top: 2px solid #a9a9a9;
      margin-top: 2rem;
      padding-top: 0.3rem;
    }

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #5f5f5f;
      flex-grow: 1;
      line-height: 32px;
    }

    p {
      margin: 0 0 1rem 0;
      color: #888;
    }

    .show-all-button {
      text-decoration: none;
      color: #333;
      background-color: #eee;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 12px;
      align-self: center;
      border: none;
      cursor: pointer;
    }

    .show-all-button:hover {
      background-color: #ddd;
    }

    .album-list {
      overflow-x: auto;
      max-width: 100%;
      flex: 1;
      padding: 0;
      display: flex;
    }

    ::-webkit-scrollbar {
      height: 9px;
    }
    ::-webkit-scrollbar-button {
      background: #eee;
      width: 0px;
      border-radius: 100px;
    }
    ::-webkit-scrollbar-album-piece {
      background: #c2c2c2;
      border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb {
      background: #5f5f5f;
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
      <div class="header">
        <h2>${this.title}</h2>
        <button class="show-all-button" @click=${this.handleShowAll}>
          Show All
        </button>
      </div>
      ${this.subTitle ? html`<p>${this.subTitle}</p>` : ''}
      <div class="albums-container">
        <div class="album-list">${this.renderAlbums()}</div>
      </div>
    `;
  }
}
