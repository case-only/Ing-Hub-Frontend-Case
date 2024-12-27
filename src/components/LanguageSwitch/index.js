import {LitElement, html, css} from 'lit';
import {getLocale, setLocale} from '../../localization';
import {updateWhenLocaleChanges} from '@lit/localize';

export class LanguageSwitch extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .container {
      position: relative;
    }

    .language-flag {
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
      font-size: 22px;
    }

    .dropdown {
      position: absolute;
      left: -4px;
      display: none;
      flex-direction: column;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }

    .container:hover .dropdown {
      display: flex;
    }

    .dropdown-item {
      font-size: 22px;
      padding: 2px 4px;
      cursor: pointer;
      white-space: nowrap;
    }

    .dropdown-item:hover {
      background-color: #f0f0f0;
    }
  `;

  constructor() {
    super();
    this.selectedLanguage = 'en-EN'; // Default selected language
    this.languages = [
      {code: 'en-EN', label: '🇬🇧'},
      {code: 'tr-TR', label: '🇹🇷'},
    ];
  }

  switchLanguage(x) {
    setLocale(x);
    updateWhenLocaleChanges(this);
  }
  render() {
    return html`
      <div class="container">
        <div class="language-flag">
          ${this.languages.find((lang) => lang.code === getLocale())?.label ||
          '🌐'}
        </div>
        <div class="dropdown">
          ${this.languages.map(
            (lang) => html`
              <div
                class="dropdown-item"
                @click="${() => this.switchLanguage(lang.code)}"
              >
                ${lang.label}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

window.customElements.define('language-switch', LanguageSwitch);
