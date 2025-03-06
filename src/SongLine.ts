import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SongDetails } from './models';

@customElement('song-line')
export class SongLine extends LitElement {
  @property({ type: Object }) details: SongDetails = {
    index: 1,
    title: 'song',
    time: 200,
  };

  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 11px 7px;
      border-top: 1px solid #a9a9a9;
      font-size: 14px;
    }
    :host:hover {
      background: #ededed;
    }
    :host:hover .song-number {
      display: none;
    }
    :host(:hover) .play-sign {
      display: inherit;
    }
    .song-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row; /* Default: Left to Right */
      width: 100%;
    }
    .play-sign {
      display: none;
      font-weight: bold;
      color: gray;
      margin-right: 12px;
    }
    .song-number {
      font-weight: bold;
      color: gray;
      margin-right: 8px;
    }

    .song-title {
      font-weight: bold;
    }

    .song-time {
      color: gray;
    }
    :host(:hover) {
      background: #ededed;
    }
    :host(:hover) .song-number {
      display: none;
    }
    :host(:hover) .play-sign {
      display: inline;
    }
    .song-title {
      font-size: 1.2em;
    }
  `;

  render() {
    return html`
      <div class="song-row">
        <div class="text">
          <span class="song-number"
            >${String(this.details.index).padStart(2, '0')}</span
          >
          <span class="play-sign">&#x23F5;</span>
          <span class="song-title">${this.details.title}</span>
        </div>
        <span class="song-time"
          >${String(Math.round((this.details.time || 0) / 60)).padStart(
            2,
            '0'
          )}:${String((this.details.time || 0) % 60).padStart(2, '0')}</span
        >
      </div>
    `;
  }
}
