import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";


@customElement("music-player")
export class MusicPlayer extends LitElement{
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
    }
    .progress {
      height: 100%;
      width: 50%;
      background: #666;
      border-radius: 5px;
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
    .album-name:{
    font-size: 0.5em;
    }
  `;

  render() {
    return html`
      <div class="player">
        <img class="album-art" src="art/imag_2.jpg" alt="Album Art">
        <div class="track-info">
          <h4>Nancy (With The Laughing Face)</h4>
          <p>John Coltrane  1961</p>
          <h5>Album name • year</h5>
        </div>
        <div class="player-controls">
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
            <div class="controls">
                <button>&#x23EE;</button>
                <button>&#x23F5;</button>
                <button>&#x23ED;</button>
            </div>
            
        </div>
      </div>
    `;
  }

}