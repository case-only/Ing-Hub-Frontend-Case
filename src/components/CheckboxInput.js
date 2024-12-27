import {LitElement, html, css} from 'lit';
import * as colors from '../theme/colors';
import {updateWhenLocaleChanges} from '@lit/localize';

class CheckboxInput extends LitElement {
  static styles = css`
    .checkbox * {
      box-sizing: border-box;
    }
    .checkbox .cbx {
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
      padding: 6px 8px;
      border-radius: 6px;
      overflow: hidden;
      transition: all 0.2s ease;
      display: inline-block;
    }
    .checkbox .cbx span {
      float: left;
      vertical-align: middle;
      transform: translate3d(0, 0, 0);
    }
    .checkbox .cbx span:first-child {
      position: relative;
      width: 18px;
      height: 18px;
      border-radius: 4px;
      transform: scale(1);
      border: 1.5px solid #cccfdb;
      transition: all 0.2s ease;
      /* box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05); */
    }
    .checkbox .cbx span:first-child svg {
      position: absolute;
      top: 3px;
      left: 2px;
      fill: none;
      stroke: #fff;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 16px;
      stroke-dashoffset: 16px;
      transition: all 0.3s ease;
      transition-delay: 0.1s;
      transform: translate3d(0, 0, 0);
    }
    .checkbox .cbx span:last-child {
      padding-left: 8px;
      line-height: 18px;
    }
    .checkbox .cbx:hover span:first-child {
      border-color: ${colors.ingOrange};
    }
    .checkbox .inp-cbx {
      position: absolute;
      visibility: hidden;
    }
    .checkbox .inp-cbx:checked + .cbx span:first-child {
      background: ${colors.ingOrange};
      border-color: ${colors.ingOrange};
      animation: wave-4 0.4s ease;
    }
    .checkbox .inp-cbx:checked + .cbx span:first-child svg {
      stroke-dashoffset: 0;
    }
    .checkbox .inline-svg {
      position: absolute;
      width: 0;
      height: 0;
      pointer-events: none;
      user-select: none;
    }
    @media screen and (max-width: 640px) {
      .checkbox .cbx {
        width: 100%;
        display: inline-block;
      }
    }
    @-moz-keyframes wave-4 {
      50% {
        transform: scale(0.9);
      }
    }
    @-webkit-keyframes wave-4 {
      50% {
        transform: scale(0.9);
      }
    }
    @-o-keyframes wave-4 {
      50% {
        transform: scale(0.9);
      }
    }
    @keyframes wave-4 {
      50% {
        transform: scale(0.9);
      }
    }
  `;

  static properties = {
    label: {type: String},
    id: {type: String},
    checked: {type: Boolean},
  };

  constructor() {
    super();
    const uuid = self.crypto.randomUUID();

    this.label = '';
    this.id = uuid;
    this.checked = false;
    updateWhenLocaleChanges(this);
  }

  onCheckBoxChange(event) {
    this.checked = true;
    this.dispatchEvent(new CustomEvent('change', event));
  }

  render() {
    return html`
      <div class="checkbox">
        <input
          class="inp-cbx"
          id="${this.id}"
          type="checkbox"
          .checked="${this.checked}"
          @change="${this.onCheckBoxChange}"
        />
        <label class="cbx" for="${this.id}"
          ><span>
            <svg width="12px" height="10px">
              <use xlink:href="#cbx"></use></svg></span
          ><span>${this.label}</span></label
        >
        <svg class="inline-svg">
          <symbol id="cbx" viewbox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </symbol>
        </svg>
      </div>
    `;
  }
}

customElements.define('checkbox-input', CheckboxInput);
