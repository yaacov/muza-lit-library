import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SongDetails } from './models';
import { formatSongNumber } from './utils';

@customElement('playlist-item')
export class SongDetailsView extends LitElement {
  @property({ type: Object }) details: SongDetails = {
    imageSrc: '',
    title: '',
    artist: '',
    index: 0,
  };

  static styles = css`
    :host {
      --tertiary-text-color: var(--muza-tertiary-text-color, #888888);
      --button-background: var(--muza-hover-background, #ededed);
      --border-color: var(--muza-border-color, #a9a9a9);

      display: flex;
      justify-content: space-between;

      border-bottom: solid var(--border-color) 1px;
      align-items: center;

      .right {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 2px;
        font-size: 17px;
        padding: 10px 9px;

        .track-number {
          padding: 7px;
          color: var(--tertiary-text-color);
          min-width: 20px;
          display: inline-block;
          font-size: var(--song-title-font-size);
        }
      }
      .left {
        border-radius: 50%;
        background-color: var(--button-background);
        width: 26px;
        height: 26px;
        display: flex;
        justify-content: center;
        font-size: 12px;
        align-items: center;
      }
    }
  `;

  render() {
    return html`
      <span class="right">
        <span class="track-number"
          >${formatSongNumber(this.details.index || 1)}</span
        >
        <song-details .details=${this.details}></song-details>
      </span>
      <span class="left">•••</span>
    `;
  }
}
