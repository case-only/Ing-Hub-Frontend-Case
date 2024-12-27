import {msg} from '@lit/localize';
import {LitElement, html, css} from 'lit';
import * as colors from '../theme/colors';

class GlobalModal extends LitElement {
  static styles = css`
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }

    .modal {
      font-family: 'ING Me';
      background: white;
      padding: 20px;
      border-radius: 3px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
      width: 100%;
    }

    .modal button {
      font-family: 'ING Me';
      padding: 10px;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 5px;
    }

    .confirm-button {
      background-color: ${colors.ingOrange};
      color: ${colors.white};
      border: none;
    }

    .cancel-button {
      background-color: ${colors.white};
      color: ${colors.purple};
      border: 2px ${colors.purple} solid;
      margin-top: 5px;
    }

    .show {
      opacity: 1;
      pointer-events: auto;
    }

    .button-wrapper {
      display: flex;
      flex-direction: column;
    }
    h3 {
      font-family: 'ING Me Bold';
      color: ${colors.ingOrange};
      margin: 0;
    }
    p {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  `;

  static properties = {
    showModal: {type: Boolean},
    modalTitle: {type: String},
    modalText: {type: String},
    _resolveCallback: {type: Object},
  };

  constructor() {
    super();
    this.showModal = false;
    this.modalTitle = '';
    this.modalText = '';
    this._resolveCallback = null;
  }

  open(title, text) {
    this.modalTitle = title;
    this.modalText = text;
    this.showModal = true;

    return new Promise((resolve) => {
      this._resolveCallback = resolve;
    });
  }

  close(response) {
    this.showModal = false;
    if (this._resolveCallback) {
      this._resolveCallback(response);
      this._resolveCallback = null;
    }
  }

  handleConfirm() {
    this.close(true);
  }

  handleCancel() {
    this.close(false);
  }

  render() {
    return html`
      <div
        class="backdrop ${this.showModal ? 'show' : ''}"
        @click="${this.handleCancel}"
      >
        <div class="modal" @click="${(e) => e.stopPropagation()}">
          <h3>${this.modalTitle}</h3>
          <p>${this.modalText}</p>
          <div class="button-wrapper">
            <button class="confirm-button" @click="${this.handleConfirm}">
              ${msg('Proceed')}
            </button>
            <button class="cancel-button" @click="${this.handleCancel}">
              ${msg('Cancel')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('global-modal', GlobalModal);
