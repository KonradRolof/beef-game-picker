import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('koro-beef-game-picker')
export class KoroBeefGamePicker extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: 10px 20px;
      margin: 0 auto;
      max-width: 750px;
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 600;
      line-height: 1.1;
    }
    h1 span {
      display: block;
      font-size: 0.6em;
      font-weight: 200;
      line-height: 1.2;
    }
  `;

  override render() {
    return html`
      <article class="koro-beef-game-picker">
        <h1>Royal Beef:
          <span>Get the Games to play</span>
        </h1>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'koro-beef-game-picker': KoroBeefGamePicker;
  }
}