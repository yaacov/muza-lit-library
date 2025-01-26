import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("volume-control")
export class VolumeControl extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .volume-icon {
      color: #666;
      cursor: pointer;
    }

    .slider {
      width: 100px;
      height: 24px;
      cursor: pointer;
      position: relative;
    }

    svg {
      width: 100%;
      height: 100%;
    }

    .track {
      stroke: #ddd;
      stroke-width: 4;
      stroke-linecap: round;
    }

    .fill {
      stroke: #666;
      stroke-width: 4;
      stroke-linecap: round;
    }

    .handle {
      fill: #666;
      cursor: grab;
    }

    .handle:active {
      cursor: grabbing;
    }
  `;

  @property({ type: Number })
  value = 75;

  @state()
  private isMuted = false;

  private previousVolume = 75;
  private isDragging = false;

  private getVolumeIcon() {
    if (this.value === 0 || this.isMuted) return "volume-xmark";
    if (this.value < 50) return "volume-low";
    return "volume-high";
  }

  private toggleMute() {
    if (this.isMuted) {
      this.value = this.previousVolume;
    } else {
      this.previousVolume = this.value;
      this.value = 0;
    }
    this.isMuted = !this.isMuted;
    this.dispatchVolumeChange();
  }

  private dispatchVolumeChange() {
    const event = new CustomEvent('volume-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private handleSliderClick(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const handleRadius = 6;
    const minX = handleRadius;
    const maxX = rect.width - handleRadius;
    const x = Math.max(minX, Math.min(maxX, e.clientX - rect.left));
    const percentage = ((x - minX) / (maxX - minX)) * 100;
    this.value = Math.round(percentage);
    this.dispatchVolumeChange();
  }

  private handleMouseDown = () => {
    this.isDragging = true;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;
    const slider = this.shadowRoot?.querySelector('.slider');
    if (!slider) return;
    
    const rect = slider.getBoundingClientRect();
    const handleRadius = 6;
    const minX = handleRadius;
    const maxX = rect.width - handleRadius;
    const x = Math.max(minX, Math.min(maxX, e.clientX - rect.left));
    const percentage = ((x - minX) / (maxX - minX)) * 100;
    this.value = Math.round(percentage);
    this.dispatchVolumeChange();
  };

  private handleMouseUp = () => {
    this.isDragging = false;
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  private mapValueToPosition(value: number): number {
    return 6 + (value * 88) / 100;
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <i
        class="fa-solid fa-speaker volume-icon"
        @click=${this.toggleMute}
      ></i>
      <i
        class="fa-solid fa-${this.getVolumeIcon()} volume-icon"
        @click=${this.toggleMute}
      ></i>
      <div class="slider" @click=${this.handleSliderClick}>
        <svg viewBox="0 0 100 24">
          <line class="track" x1="2" y1="12" x2="98" y2="12" />
          <line class="fill" x1="2" y1="12" x2="${this.mapValueToPosition(this.value)}" y2="12" />
          <circle
            class="handle"
            cx="${this.mapValueToPosition(this.value)}"
            cy="12"
            r="6"
            @mousedown=${this.handleMouseDown}
          />
          />
        </svg>
      </div>
    `;
  }
}