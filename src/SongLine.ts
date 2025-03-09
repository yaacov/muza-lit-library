import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SongDetails } from './models';
import { formatSongNumber } from './utils';

@customElement('song-line')
export class SongLine extends LitElement {
  @property({ type: Object }) details: SongDetails = {
    index: 1,
    title: 'song',
    time: 200,
    audioUrl: '',
    imageSrc: '',
    artist: '',
    album: '',
    year: 0,
  };
  static styles = css`
    :host {
      --primary-text-color: var(--muza-primary-text-color, #000000);
      --secondary-text-color: var(--muza-secondary-text-color, #5f5f5f);
      --tertiary-text-color: var(--muza-tertiary-text-color, #888888);
      --border-color: var(--muza-border-color, #a9a9a9);
      --hover-background: var(--muza-hover-background, #ededed);
      --song-title-font-size: var(--muza-songline-title-font-size, 16px);
      --song-number-font-size: var(--muza-songline-number-font-size, 14px);
      --song-duration-font-size: var(--muza-songline-duration-font-size, 14px);
      --song-line-padding: var(--muza-songline-padding, 12px 8px);
      --song-line-height: var(--muza-songline-height, 28px);

      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--song-line-padding);
      border-top: 1px solid var(--border-color);
      height: var(--song-line-height);
      cursor: default;

      .song-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        width: 100%;
      }

      .track-info {
        display: flex;
        align-items: center;
        min-width: 20px;
      }

      .track-number {
        color: var(--tertiary-text-color);
        margin-right: 8px;
        min-width: 20px;
        display: inline-block;
        font-size: var(--song-title-font-size);
      }

      .play-icon {
        display: none;
        color: var(--tertiary-text-color);
        margin-right: 8px;
        min-width: 20px;
        text-align: center;
      }

      .track-title {
        color: var(--primary-text-color);
        font-size: var(--song-title-font-size);
      }

      .track-duration {
        color: var(--tertiary-text-color);
        font-weight: bold;
        font-size: var(--song-duration-font-size);
      }
      .wave-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        width: 20px;
        height: 20px;
        margin-right: 8px;
      }

      .bar {
        width: 30%;
        height: 100%;
        border-radius: 5px;
        animation: wave 1s infinite ease-in-out;
        background-color: var(--tertiary-text-color);
      }
      .bar:nth-child(1) {
        animation-delay: 0s;
      }
      .bar:nth-child(2) {
        animation-delay: 0.2s;
      }
      .bar:nth-child(3) {
        animation-delay: 0.4s;
      }
      @keyframes wave {
        0%,
        100% {
          height: 40%;
        }
        50% {
          height: 90%;
        }
      }
    }

    :host(:hover) {
      background: var(--hover-background);
    }

    :host(:hover) .track-number {
      display: none;
    }

    :host(:hover) .play-icon {
      display: inline-block;
    }
  `;

  private formatDuration(seconds: number): string {
    const minutes = Math.round(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  }
  private renderIcon() {
    return this.details.isPlaying
      ? html`
          <div class="wave-container">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        `
      : html` <span class="track-number"
            >${formatSongNumber(this.details.index || 1)}</span
          >
          <span class="play-icon">
            <i class="fa-solid fa-play"></i>
          </span>`;
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <div class="song-container">
        <div class="track-info">
          ${this.renderIcon()}
          <span class="track-title">${this.details.title}</span>
        </div>
        <span class="track-duration"
          >${this.details.time && this.formatDuration(this.details.time)}</span
        >
      </div>
    `;
  }
}
