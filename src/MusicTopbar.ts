import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

import "./VolumeControl";

@customElement("music-topbar")
export class MusicTopbar extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #f0f0f0;
      padding: 12px 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .search-container {
      position: relative;
      width: 300px;
    }

    .search-container i {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    input {
      width: 100%;
      padding: 8px 8px 8px 35px;
      border: 1px solid #ddd;
      border-radius: 20px;
      font-size: 14px;
      outline: none;
      background-color: #e0e0e0;
    }

    input:focus {
      border-color: #999;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .volume-control {
      display: flex;
      align-items: center;
    }

    .user-menu {
      position: relative;
    }

    .user-icon {
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      color: #666;
    }

    .user-icon:hover {
      background: #e0e0e0;
    }
  `;

  @state()
  private volume = 75;

  private handleVolumeChange(e: CustomEvent) {
    this.volume = e.detail.value;
  }

  private userIconClick() {
    const event = new CustomEvent("user-icon-click", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private handleSearch(e: Event) {
    const searchText = (e.target as HTMLInputElement).value;
    const event = new CustomEvent("search-change", {
      detail: { searchText },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <div class="topbar">
        <div class="search-container">
          <i class="fa-solid fa-search"></i>
          <input
            type="text"
            placeholder="Artist / Album / Song"
            @input=${this.handleSearch}
          />
        </div>
        <div class="controls">
          <div class="volume-control">
            <volume-control
              .value=${this.volume}
              @volume-change=${this.handleVolumeChange}
            ></volume-control>
          </div>
          <div class="user-menu">
            <i
              class="fa-solid fa-circle-user user-icon"
              @click=${this.userIconClick}
            ></i>
          </div>
        </div>
      </div>
    `;
  }
}
