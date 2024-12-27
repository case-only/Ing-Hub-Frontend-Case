import {LitElement, html, css} from 'lit';
import {getRoutes} from '../../router/routes';
import {msg, updateWhenLocaleChanges} from '@lit/localize';
import * as colors from '../../theme/colors';

import '../LanguageSwitch';

export class AppHeader extends LitElement {
  static get styles() {
    return css`
      .menu {
        display: flex;
        justify-content: center;
      }

      .logo {
        width: 30px;
        border-radius: 5px;
      }
      .main-header {
        background-color: ${colors.white};
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        height: 40px;
      }
      .header-left {
        display: flex;
        align-items: center;
      }
      .header-right {
        display: flex;
      }
      .header-right div {
        display: flex;
        align-items: center;
        margin-left: 10px;
      }
      .main-header .ing_title {
        margin-left: 10px;
        font-family: 'ING Me Bold';
      }
      .link {
        cursor: pointer;
        color: ${colors.black};
        text-decoration: none;
        margin-left: 5px;
        margin-left: 5px;
      }
      .additional-link {
        cursor: pointer;
        color: ${colors.ingOrange};
        text-decoration: none;
        margin-left: 5px;
        margin-left: 5px;
      }
    `;
  }

  static get properties() {
    return {
      currentPageName: {type: String},
      additionalLinks: {type: Array},
    };
  }

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      'vaadin-router-location-changed',
      this._onLocationChanged.bind(this)
    );
  }

  _onLocationChanged(event) {
    const activeRoute = this.routes.find(
      (x) => x.path === event.target.location.pathname
    );
    if (activeRoute?.additionalLinks) {
      this.additionalLinks = activeRoute.additionalLinks;
    } else {
      this.additionalLinks = [];
    }
  }

  get routes() {
    return getRoutes();
  }

  get additionalRoutes() {
    const activeRoute = this.routes.find((x) => x.path === location.pathname);

    if (activeRoute?.additionalLinks) {
      return activeRoute.additionalLinks;
    } else {
      return [];
    }
  }

  render() {
    return html`
      <div class="main-header">
        <div class="header-left">
          <img class="logo" src="/public/images/ing_logo.jpg" />
          <h4 class="ing_title">ING</h4>
          <nav style="margin-left: 20px;">
            ${this.routes.map((route) => {
              return html`
                <a class="link" href="${route.path}" style="margin-left: 5px;"
                  >${route.label}</a
                >
              `;
            })}
          </nav>
        </div>
        <div class="header-right">
          <div>
            <fa-icon
              type="fa-regular"
              icon="user"
              color="${colors.ingOrange}"
            ></fa-icon>
            <h6>${this.currentPageName}</h6>
          </div>
          <div>
            ${this.additionalRoutes.map(
              (x) =>
                html`<a class="additional-link" href="${x.path}">${x.label}</a>`
            )}
          </div>
          <div>
            <language-switch></language-switch>
          </div>
        </div>
      </div>
      <slot></slot>
    `;
  }
}

window.customElements.define('app-header', AppHeader);
