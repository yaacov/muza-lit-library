/* eslint-disable lit/attribute-value-entities */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SongDetails } from './models';

@customElement('music-playlist')
export class MusicPlaylist extends LitElement {
  static styles = css`
    :host {
      --border-color: var(--muza-border-color, #a9a9a9);

      margin-bottom: 2rem;
      flex: 1;
      border: 1px solid var(--gray-50, #ededed);
      box-shadow: 1px 0px 10px 0px #0000001a;
      max-height: 100%;
      overflow: auto;
      height: 100%;

      .side {
        width: 340px;
        max-width: 340px;
        max-height: 100%;
        display: grid;
        grid-template-rows: 1fr 2fr 2fr;
        grid-auto-flow: column;
      }

      .full {
        width: 100%;
        max-width: 100%;
      }

      .playlist {
        margin: 26px;
        overflow-y: auto;

        .songs-list {
          border-top: solid var(--border-color) 1px;
          display: flex;
          flex-flow: column;
        }
      }

      .top {
        display: flex;
        align-items: center;
        justify-items: center;
        flex-direction: column;

        .buttons {
          position: absolute;
          left: 14px;
          top: 14px;
          gap: 8px;
          display: flex;
          flex-flow: column;
        }

        small-album-details {
          padding-top: 56px;
          padding-bottom: 20px;
        }
      }
      music-suggestions-list {
        margin: 26px 20px;
        overflow-y: auto;
      }
    }
  `;

  @property({ type: String })
  title = '';

  @property({ type: String })
  author = '';

  @property({ type: String })
  imageSrc = '';

  @property({ type: [] })
  songs: SongDetails[] = [];

  @property({ type: [] })
  suggestions: SongDetails[] = [];

  sideMode: string = 'side';

  private renderSongs() {
    return this.songs.map(
      (song) => html` <playlist-item .details=${song}></playlist-item> `
    );
  }

  private getImageSrc() {
    if (this.imageSrc.length) {
      return this.imageSrc;
    } else return this.songs[0]?.imageSrc;
  }

  render() {
    return html`
      <div class="content ${this.sideMode}">
        <div class="top">
          <div class="buttons">
            <muza-button content="x"></muza-button>
            // eslint-disable-next-line lit/attribute-value-entities,
            lit/attribute-value-entities
            <muza-button content="&#xf065;"></muza-button>
          </div>
          <small-album-details
            imageSrc=${this.getImageSrc()}
            title=${this.title}
            author=${this.author}
          ></small-album-details>
        </div>

        <div class="playlist">
          <div class="songs-list">${this.renderSongs()}</div>
        </div>

        <music-suggestions-list
          title="Suggestions"
          .songs=${this.suggestions}
        ></music-suggestions-list>
      </div>
    `;
  }
}
