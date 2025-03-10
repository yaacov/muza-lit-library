import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { SongLine } from './SongLine';

interface PlayerDetails {
  src: string;
  imageSrc: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  isPlaying: boolean;
  id?: string;
}

@customElement('music-player')
export class MusicPlayer extends LitElement {
  @query('audio') audioElement!: HTMLAudioElement;

  @property({ type: Object }) details: PlayerDetails = {
    src: '',
    imageSrc: '',
    title: '',
    artist: '',
    album: '',
    year: 0,
    isPlaying: false,
  };

  @state() private duration = 0;
  @state() private currentTime = 0;
  @state() private progressPercentage = '0%';
  @state() private volume = 1.0;
  @state() private isLoading = false; // Track loading state

  // Make sure event listeners are only attached once
  private listenersAttached = false;
  // Track play request that should be made after loading
  private pendingPlay = false;

  protected firstUpdated() {
    this._attachAudioListeners();
  }

  /**
   * Update the player volume without triggering unnecessary renders
   * @param value Volume level (0.0 to 1.0)
   */
  public updateVolume(value: number) {
    if (!this.audioElement) return;

    // Clamp volume between 0 and 1
    const newVolume = Math.max(0, Math.min(1, value));

    // Only update if different
    if (this.volume !== newVolume) {
      this.volume = newVolume;
      this.audioElement.volume = this.volume;
    }
  }

  private _attachAudioListeners() {
    if (!this.audioElement || this.listenersAttached) return;

    this.listenersAttached = true;

    // Set up audio event listeners
    this.audioElement.addEventListener('loadeddata', () => {
      this.duration = this.audioElement.duration || 0;
      this._updateProgressPercentage();
      this.isLoading = false; // Audio is loaded

      // If we had a pending play request, execute it now
      if (this.pendingPlay) {
        this._playAudio();
        this.pendingPlay = false;
      }

      this.requestUpdate();
    });

    this.audioElement.addEventListener('timeupdate', () => {
      this.currentTime = this.audioElement.currentTime || 0;
      this._updateProgressPercentage();
      this.requestUpdate();
    });

    this.audioElement.addEventListener('ended', () => {
      this.details = { ...this.details, isPlaying: false };
      this._updateProgressPercentage();
      this.requestUpdate();
      this.dispatchEvent(
        new CustomEvent('song-ended', {
          bubbles: true,
          composed: true,
        })
      );
    });

    this.audioElement.addEventListener('play', () => {
      this.details = { ...this.details, isPlaying: true };
      this.requestUpdate();
    });

    this.audioElement.addEventListener('pause', () => {
      this.details = { ...this.details, isPlaying: false };
      this.requestUpdate();
    });

    // Add loading state events
    this.audioElement.addEventListener('loadstart', () => {
      this.isLoading = true;
      this.requestUpdate();
    });

    this.audioElement.addEventListener('waiting', () => {
      this.isLoading = true;
      this.requestUpdate();
    });

    this.audioElement.addEventListener('canplay', () => {
      this.isLoading = false;
      this.requestUpdate();
    });
  }

  private _updateProgressPercentage() {
    this.progressPercentage = this.getProgressPercentage();
  }

  private updateSongsLine() {
    (document.querySelectorAll('song-line') as NodeListOf<SongLine>).forEach(
      (songLine: SongLine) => {
        if (songLine.details.id === this.details.id) {
          songLine.details.isPlaying = true;
          songLine.requestUpdate();
        } else {
          songLine.details.isPlaying = false;
          songLine.requestUpdate();
        }
      }
    );
  }
  protected updated(changedProperties: Map<PropertyKey, unknown>) {
    if (changedProperties.has('details')) {
      const oldDetails = changedProperties.get('details') as
        | PlayerDetails
        | undefined;
      const srcChanged = !oldDetails || oldDetails.src !== this.details.src;
      this.updateSongsLine();
      // Only reload the audio if the source has changed
      if (srcChanged && this.details.src) {
        if (this.audioElement) {
          // Cancel any pending play request when source changes
          this.pendingPlay = false;

          // Reset current state
          this.currentTime = 0;
          this.duration = 0;
          this.progressPercentage = '0%';
          this.isLoading = true; // Mark as loading

          // Load new audio
          this.audioElement.src = this.details.src;
          this.audioElement.load();

          // Ensure volume is set correctly
          this.audioElement.volume = this.volume;

          // Ensure listeners are attached
          if (!this.listenersAttached) {
            this._attachAudioListeners();
          }
        }

        // Don't call _syncPlayState immediately, let the loadeddata event handle it
        if (this.details.isPlaying) {
          this.pendingPlay = true;
        }
      }
      // If only isPlaying state changed (not the source), handle it without reloading
      else if (oldDetails && oldDetails.isPlaying !== this.details.isPlaying) {
        if (this.details.isPlaying && this.audioElement) {
          if (!this.isLoading) {
            this._playAudio();
          } else {
            this.pendingPlay = true;
          }
        } else if (!this.details.isPlaying && this.audioElement) {
          this.audioElement.pause();
          this.pendingPlay = false;
        }
      }
    }
  }

  /**
   * Safe method to play audio after it's ready
   */
  private _playAudio() {
    if (!this.audioElement || this.isLoading) return false;

    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error('Error playing audio:', error);
        this.details = { ...this.details, isPlaying: false };
      });
    }

    return true;
  }

  private _onPrevious() {
    this.dispatchEvent(
      new CustomEvent('previous-track', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onPlayPause() {
    if (!this.audioElement) return;

    const newPlayState = this.audioElement.paused;

    if (newPlayState) {
      if (this.isLoading) {
        // If still loading, mark as pending and wait
        this.pendingPlay = true;
        this.details = { ...this.details, isPlaying: true };
      } else {
        const played = this._playAudio();
        if (played) {
          this.details = { ...this.details, isPlaying: true };
        }
      }
    } else {
      this.audioElement.pause();
      this.pendingPlay = false;
      this.details = { ...this.details, isPlaying: false };
    }
  }

  private _onNext() {
    this.dispatchEvent(
      new CustomEvent('next-track', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleSeek(e: MouseEvent) {
    if (!this.audioElement || this.duration === 0) return;

    const progressBar = e.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newTime = percentage * this.duration;

    this.audioElement.currentTime = newTime;

    // Update state immediately for responsive UI
    this.currentTime = newTime;
    this._updateProgressPercentage();
    this.requestUpdate();
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  private getProgressPercentage(): string {
    if (this.duration === 0) return '0%';
    return `${(this.currentTime / this.duration) * 100}%`;
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      right: var(--muza-spacing-xl, 24px);
      left: var(--muza-sidebar-width, 240px);
      z-index: 1000;
      opacity: 0.9;
      backdrop-filter: blur(20px);
      border-radius: var(--muza-border-radius-md, 8px);
      box-shadow: var(--muza-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      margin: var(--muza-spacing-xs, 4px);
    }

    :host([hidden]) {
      display: none;
    }

    audio {
      display: none;
    }
    .player {
      display: flex;
      align-items: center;
      background: #edededcc;
      border-radius: var(--muza-border-radius-md, 8px);
      box-shadow: var(--muza-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      padding: var(--muza-spacing-md, 12px);
    }
    .album-art {
      width: 7.3vh;
      height: 7.3vh;
      border-radius: var(--muza-border-radius-sm, 4px);
      object-fit: cover;
      margin-right: var(--muza-spacing-sm, 8px);
    }
    .track-info {
      flex: 4;
      overflow: hidden;
    }
    .track-info h4,
    .track-info p,
    .track-info h5 {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .track-info h4 {
      color: var(--muza-primary-text-color, #333333);
      font-size: var(--muza-songline-title-font-size, 16px);
    }
    .track-info h5 {
      font-size: var(--muza-secondary-font-size, 12px);
      color: var(--muza-tertiary-text-color, #aaa);
    }
    .track-info p {
      color: var(--muza-tertiary-text-color, #aaa);
      font-size: var(--muza-secondary-font-size, 12px);
    }
    .progress-bar {
      width: 100%;
      height: 5px;
      background: var(--muza-slider-track-color, #c2c2c2);
      position: relative;
      margin: var(--muza-spacing-xs, 4px) 0;
      border-radius: var(--muza-border-radius-sm, 4px);
    }
    .player-controls {
      display: flex;
      flex: 10;
      align-items: center;
      flex-direction: column;
      height: 90%;
    }
    .progress {
      height: 100%;
      background: var(--muza-slider-fill-color, #5f5f5f);
      border-radius: var(--muza-border-radius-sm, 4px);
    }
    .controls {
      display: flex;
      align-items: center;
      gap: 36px;
    }
    .controls button {
      color: var(--muza-secondary-text-color, #5f5f5f);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      height: 40px;
    }
    .play-pause-button {
      font-size: 1.8em;
    }
    .prev-next-button {
      font-size: 1.2em;
    }
    button {
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: var(--muza-heading-font-size, 18px);
    }
    .durations {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .durations span {
      font-size: var(--muza-secondary-font-size, 12px);
      color: var(--muza-secondary-text-color, #5f5f5f);
    }
    .album-name: {
      font-size: 0.5em;
    }
  `;

  render() {
    // Only show when audio source is available
    if (!this.details.src) {
      return html``;
    }

    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <audio src="${this.details.src}"></audio>
      <div class="player">
        <img class="album-art" src=${this.details.imageSrc} alt="Album Art">
        <div class="track-info">
          <h4>${this.details.title}</h4>
          <p>${this.details.artist}</p>
          <h5>${this.details.album} • ${this.details.year}</h5>
        </div>
        <div class="player-controls">
            <div class="progress-bar" @click=${this._handleSeek}>
                <div class="progress" style="width: ${
                  this.progressPercentage
                }"></div>
            </div>
            <div class="durations">
              <span>${this.formatTime(this.currentTime)}</span>
              <span>${this.formatTime(this.duration - this.currentTime)}</span>
            </div>
            <div class="controls">
              <button class="prev-next-button" @click=${this._onPrevious}>
                <i class="fa-solid fa-backward"></i>
              </button>
              <button class="play-pause-button" @click=${this._onPlayPause}>
                ${
                  this.isLoading
                    ? html`<i class="fa-solid fa-spinner fa-spin"></i>`
                    : this.details.isPlaying
                    ? html`<i class="fa-solid fa-pause"></i>`
                    : html`<i class="fa-solid fa-play"></i>`
                }
              </button>
              <button class="prev-next-button" @click=${this._onNext}>
                <i class="fa-solid fa-forward"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
