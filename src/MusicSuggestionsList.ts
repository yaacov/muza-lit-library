import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SongDetails } from './models';

@customElement('music-suggestions-list')
export class MusicSuggestionsList extends LitElement {
  static styles = css`
    :host {
      .content {
        background-color: var(---muza-section-background, #f7f7f7);
        border-radius: 5px;
      }
      .header {
        font-size: 20px;
        padding: 0 16px;
        color: var(--muza-secondary-text-color, #5f5f5f);
        height: 46px;
        font-weight: var(--muza-font-weight-bold, 600);
        display: flex;
        align-items: center;
      }

      .playlist {
        padding: 0;

        .songs-list {
          border-top: solid var(--border-color) 1px;
          display: flex;
          flex-flow: column;
        }
      }
    }
  `;

  @property({ type: [] })
  songs: SongDetails[] = [];

  @property({ type: String })
  title = '';

  private renderSongs() {
    return this.songs.map(
      (song) =>
        html` <suggestions-list-item .details=${song}></suggestions-list-item> `
    );
  }

  render() {
    return html`
      <div class="content">
        <div class="header">${this.title}</div>
        <div class="playlist">
          <div class="songs-list">${this.renderSongs()}</div>
        </div>
      </div>
    `;
  }
}
