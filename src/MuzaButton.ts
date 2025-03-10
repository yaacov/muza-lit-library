import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('muza-button')
export class MuzaButton extends LitElement {
  @property({ type: String }) content: string = '';

  static styles = css`
    :host {
      --button-background: var(--muza-hover-background, #ededed);

      border-radius: 50%;
      background-color: var(--button-background);
      width: 26px;
      height: 26px;
      display: flex;
      justify-content: center;
      font-size: 12px;
      align-items: center;
    }
  `;

  render() {
    return html` ${this.content} `;
  }
}
