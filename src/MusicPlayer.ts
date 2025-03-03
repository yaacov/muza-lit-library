import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement("music-player")
export class MusicPlayer extends LitElement{
  @property({ type: String }) src = "art/imag_3.jpg";
  @property({ type: String }) title = "";
  @property({ type: String }) artist = "Unknown Artist";
  @property({ type: String }) album = "Unknown Album";
  @property({ type: Number }) year = 2000;
  @property({ type: Number }) duration =30;
  @property({ type: Number }) currentTime = 20;
  @property({ type: Boolean }) isPlaying = false;
    static styles = css`
      :host {
      display: block;
      position: fixed; /* Stays at the bottom */
      bottom: 0;
      right:30px;
      left:240px;
      z-index: 1000;
      opacity: 0.9;
      
        backdrop-filter: blur(20px);
        border-radius: 10px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        margin:5px;
    }
    .player {
        display: flex;
        align-items: center;
        background:#EDEDEDCC;;
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
    .track-info h4, .track-info p, .track-info h5 {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .track-info h5 {
    font-size: 0.8rem;
    color: #A9A9A9;
    }
    .track-info p{
    color: #A9A9A9;
    }
    .progress-bar {
      width: 100%;
      height: 5px;
      background: #ddd;
      position: relative;
      margin: 5px 0;
      border-radius: 5px;
    }
    .player-controls{
        display: flex;
        flex:10; 
        align-items: center;
        flex-direction:column;
        height:90%;
    }
    .progress {
      height: 100%;
      background: #666;
      border-radius: 5px;
      transition: width 0.1s ease;
    }
    .controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    button {
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 18px;
    }
    .durations{
    display:flex;
    width:100%;
    justify-content: space-between;
    }
    .durations span{
    font-size:0.8rem;
    color:#5F5F5F;
    }
    .album-name:{
    font-size: 0.5em;
    }
  `;
  private _onPrevious() {
    this.dispatchEvent(new CustomEvent('previous-track', {
        bubbles: true,
        composed: true
    }));
}

private _onPlayPause() {
    this.isPlaying = !this.isPlaying;
    this.dispatchEvent(new CustomEvent('playback-toggle', {
        bubbles: true,
        composed: true,
        detail: { isPlaying: this.isPlaying }
    }));
}

private _onNext() {
    this.dispatchEvent(new CustomEvent('next-track', {
        bubbles: true,
        composed: true
    }));
}
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
    
    this.currentTime = newTime;
    this.dispatchEvent(new CustomEvent('time-update', {
        bubbles: true,
        composed: true,
        detail: { currentTime: newTime }
    }));
}
  render() {
    if(this.title){
    return html`
      <div class="player">
        <img class="album-art" src=${this.src} alt="Album Art">
        <div class="track-info">
          <h4>${this.title}</h4>
          <p>${this.artist} </p>
          <h5>${this.album} • ${this.year}</h5>
        </div>
        <div class="player-controls">
            <div class="progress-bar"
              @mousedown=${this._onStartDrag}
              @mousemove=${this._onDrag}
              @mouseup=${this._onStopDrag}
              @mouseleave=${this._onStopDrag}
              >
                <div class="progress" 
                     style="width: ${(this.currentTime / this.duration) * 100}%">
                </div>
            </div>
            <div class="durations">
            <span>${Math.floor(this.currentTime / 60)}:${Math.floor(this.currentTime % 60).toString().padStart(2, '0')}</span>
            <span>${Math.floor((this.duration-this.currentTime) / 60)}:${Math.floor((this.duration-this.currentTime) % 60).toString().padStart(2, '0')}</span>
            
            </div>
            <div class="controls">
                 <button @click=${this._onPrevious}>⏮</button>
            <button @click=${this._onPlayPause}>${this.isPlaying ? '⏸' : '▶'}</button>
            <button @click=${this._onNext}>⏭</button>
        </div>
            </div>
        </div>
      </div>
    `;
  }else{
     return html``
  }

}
}
