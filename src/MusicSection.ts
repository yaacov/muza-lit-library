import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("music-section")
export class MusicSection extends LitElement {
  static styles = css`
    :host {
      margin-bottom: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 16px 0.1rem 16px;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #666;
      min-height: 32px;
      border-top: 2px solid #666;
      margin-top: 2rem;
      padding-top: 0.5rem;
    }

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #444;
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

    .track-list {
      display: flex;
      overflow-x: auto;
      padding: 0;
    }
  `;

  @property({ type: String })
  title = "";

  @property({ type: String })
  subTitle = "";

  @property({ type: Array })
  tracks: { imageSrc: string; title: string; subTitle: string }[] = [];

  private handleShowAll() {
    this.dispatchEvent(
      new CustomEvent("show-all", {
        bubbles: true,
        composed: true,
        detail: { sectionTitle: this.title },
      })
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
      ${this.subTitle ? html`<p>${this.subTitle}</p>` : ""}
      <div class="track-list">
        ${this.tracks.map(
          (track) => html`
            <music-track
              image-src=${track.imageSrc}
              title=${track.title}
              sub-title=${track.subTitle}
            ></music-track>
          `
        )}
      </div>
    `;
  }
}
