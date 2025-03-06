import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface PlayerDetails {
  imageSrc: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  isPlaying: boolean;
  duration?: number;
  currentTime?: number;
}
@customElement('music-player')
export class MusicPlayer extends LitElement {
  @property({type:HTMLElement}) audioElement : HTMLAudioElement | null = null;

  @property({ type: Object }) details:PlayerDetails = {
    imageSrc: '',
    title: '',
    artist: '',
    album: '',
    year: 0,
    isPlaying:false,
  }
  @property({ type: Function }) onPrevious?: () => void =()=>{};
  @property({ type: Function }) onPlayPause?: () => void=()=>{};
  @property({ type: Function }) onNext?: () => void=()=>{};
  @property({ type: Function }) onSeek?: (time: number) => void = (time:number)=>{};

  private _initializeAudio() {
    if (this.audioElement) {
    }   
    this.audioElement?.addEventListener('loadeddata', () => {
      this.details.isPlaying = true;
      this.requestUpdate('details.isPlaying');

    });
    this.audioElement?.addEventListener('ended', () => {
      this.details.isPlaying = false;
      this.requestUpdate('details.isPlaying');

    });
    this.audioElement?.addEventListener('waiting', () => {
      this.details.isPlaying = false;
      this.requestUpdate('details.isPlaying');

    });
    this.audioElement?.addEventListener('playing', () => {
      this.details.isPlaying = true;
      this.requestUpdate('details.isPlaying');

    });
    this.audioElement?.addEventListener('pause', () => {
      this.details.isPlaying = false;
      this.requestUpdate('details.isPlaying');

    });
    this.audioElement?.addEventListener('durationchange', () => {
      this.duration = this.audioElement?.duration || 0;
      this.requestUpdate('duration');

    });
    this.audioElement?.addEventListener('timeupdate', () => {
      this.currentTime = this.audioElement?.currentTime || 0;
      this.requestUpdate('currentTime');

    });
  }
  private duration = this.details.duration?this.details.duration:120;
  private currentTime = this.details.currentTime?this.details.currentTime:0;
 
  protected updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('audioElement')) {
      this._initializeAudio();
      this.requestUpdate();

    }
  }
  
  constructor(){
    super();
    if(this.audioElement){
          this._initializeAudio();

    }
  
  }
  static styles = css`
    :host {
      display: block;
      position: fixed; /* Stays at the bottom */
      bottom: 0;
      right: 30px;
      left: 240px;
      z-index: 1000;
      opacity: 0.9;

      backdrop-filter: blur(20px);
      border-radius: 10px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
      margin: 5px;
    }
    .player {
      display: flex;
      align-items: center;
      background: #edededcc;
      border-radius: 10px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
      padding: 12px;
    }
    .album-art {
      width: 7.3vh;
      height: 7.3vh;
      border-radius: 5px;
      object-fit: cover;
      margin-right: 10px;
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
    .track-info h5 {
      font-size: 0.8rem;
      color: #a9a9a9;
    }
    .track-info p {
      color: #a9a9a9;
    }
    .progress-bar {
      width: 100%;
      height: 5px;
      background: #ddd;
      position: relative;
      margin: 5px 0;
      border-radius: 5px;
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
      background: #666;
      border-radius: 5px;
      transition: width 0.5s ease;
    }
    .controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .controls button {
      margin-top: -7px;
      font-size: 1.5em;
      color: #5f5f5f;
    }
    button {
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 18px;
    }
    .durations {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .durations span {
      font-size: 0.8rem;
      color: #5f5f5f;
    }
    .album-name: {
      font-size: 0.5em;
    }
  `;
  // controllers events
  private _onPrevious() {
    this.onPrevious?.();
    this.dispatchEvent(
      new CustomEvent('previous-track', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onPlayPause() {
    this.onPlayPause?.();
    if (this.details.isPlaying) {
      this.dispatchEvent(
        new CustomEvent('pause', {
          bubbles: true,
          composed: true,
        })
      );
      this.audioElement?.pause();
    } else {
      this.dispatchEvent(
        new CustomEvent('play', {
          bubbles: true,
          composed: true,
        })
      );
      this.audioElement?.play();
    }
  }

  private _onNext() {
    this.onNext?.()
    this.dispatchEvent(

      new CustomEvent('next-track', {
        bubbles: true,
        composed: true,
      })
    );
  }
  //progress bar events
  private _isDragging = false;

  private _onStartDrag(e: MouseEvent) {
    this._isDragging = true;
    this._updateTimeFromClick(e);
  }

  private _onDrag(e: MouseEvent) {
    if (!this._isDragging) return;
    this._updateTimeFromClick(e);
  }

  private _onStopDrag() {
    this._isDragging = false;
  }

  private _updateTimeFromClick(e: MouseEvent) {
    const progressBar = e.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.min(Math.max(x / width, 0), 1);
    const newTime = percentage * this.duration;
    this.onSeek?.(newTime);

    this.audioElement!.currentTime = newTime;
    this.dispatchEvent(
      new CustomEvent('time-update', {
        bubbles: true,
        composed: true,
        detail: { currentTime: newTime },
      })
    );
  }
  render() {
    if (this.audioElement) {
      return html`
      <div class="player">
        <img class="album-art" src=${this.details.imageSrc} alt="Album Art">
        <div class="track-info">
          <h4>${this.details.title}</h4>
          <p>${this.details.artist} </p>
          <h5>${this.details.album} • ${this.details.year}</h5>
        </div>
        <div class="player-controls">
            <div class="progress-bar"
              @mousedown=${this._onStartDrag}
              @mousemove=${this._onDrag}
              @mouseup=${this._onStopDrag}
              @mouseleave=${this._onStopDrag}
              >
                <div class="progress" 
                     style="width: ${
                       (this.currentTime / this.duration) * 100
                     }%">
                </div>
            </div>
            <div class="durations">
            <span>${Math.floor(this.currentTime / 60)}:${Math.floor(
              this.currentTime % 60
      )
        .toString()
        .padStart(2, '0')}</span>
            <span>${Math.floor(
              (this.duration - this.currentTime) / 60
            )}:${Math.floor((this.duration - this.currentTime) % 60)
        .toString()
        .padStart(2, '0')}</span>
            
            </div>
            <div class="controls">
              <button @click=${this._onPrevious}>⏮</button>
              <button @click=${this._onPlayPause}>${
        this.details.isPlaying ? '⏸' : '▶'
      }</button>
              <button @click=${this._onNext}>⏭</button>
            </div>
          </div>
        </div>
      </div>
    `;
    } else {
      return html``;
    }
  }
}
