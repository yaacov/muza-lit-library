import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SongDetails } from './models';

@customElement('suggestions-list-item')
export class SuggestionsListItem extends LitElement {
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
      padding: 10px 16px;

      .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 2px;
        font-size: 17px;
      }
    }
  `;

  render() {
    return html`
      <span class="left">
        <song-details .details=${this.details}></song-details>
      </span>
      <muza-button content="+"></muza-button>
    `;
  }
}
