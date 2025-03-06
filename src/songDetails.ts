import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SongDetails } from './models';

@customElement('song-details')
export class SongLine extends LitElement {
  @property({ type: Object }) details: SongDetails = {
    imageSrc: 'art/imag_2.jpg',
    title: 'song',
    artist: 'song artist ',
  };

  static styles = css`
    :host {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 11px 7px;
      gap: 7px;
      font-size: 14px;

      img {
        border-radius: 3px;
        backgruond-color: #d9d9d9;
      }
      .song-details {
        display: flex;
        flex-direction: column;
      }
      .song-title {
        font-weight: bold;
        font-size: 16px;
        color: #5f5f5fs;
        line-height: 16px;
      }
      .song-artist {
        color: #a9a9a9;
        line-height: 17px;
        font-size: 15px;
      }
    }
  `;

  render() {
    return html`
      <img
        width="38px"
        heigh="38px"
        src=${this.details.imageSrc}
        alt=${this.title}
      />
      <div class="song-details">
        <span class="song-title">${this.details.title}</span>
        <span class="song-artist">${this.details.title}</span>
      </div>
    `;
  }
}
