import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("music-track")
export class MusicTrack extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      padding: 0.85rem;
      border-radius: 8px;
    }

    .image-container {
      position: relative;
      width: 170px;
      height: 170px;
      margin-bottom: 0.4rem;
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      margin-bottom: 0;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    }

    .play-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 4px;
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
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 0 10px 16px;
      border-color: transparent transparent transparent white;
      margin-left: 4px;
    }

    .image-container:hover .play-overlay {
      opacity: 1;
    }

    h3 {
      font-size: 14px;
      color: #444;
      font-weight: 400;
      margin: 0 0 0.15rem 0;
      cursor: pointer;
    }

    p {
      font-size: 12px;
      color: #aaa;
      font-weight: 400;
      margin: 0;
      cursor: pointer;
    }
  `;

  @property({ type: String, attribute: "image-src" })
  imageSrc = "";

  @property({ type: String })
  title = "";

  @property({ type: String, attribute: "sub-title" })
  subTitle = "";

  private handleTrackClick() {
    const event = new CustomEvent("track-selected", {
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
