import {LitElement, html, css} from 'lit';
import {setupRouter} from './router';
import * as colors from './theme/colors';
import {updateWhenLocaleChanges} from '@lit/localize';

import './components/AppHeader';

class MyApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: ${colors.lightGray};
      font-family: 'ING Me';
    }

    #outlet {
      padding: 16px;
    }

    h1 {
      color: #333;
    }
  `;

  static properties = {
    title: {type: String},
    headerElement: {type: LitElement},
  };

  constructor() {
    super();
    this.title = 'Welcome to Lit!';
    updateWhenLocaleChanges(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.body.style.margin = '0';
  }

  firstUpdated() {
    // Initialize the router
    const outlet = this.shadowRoot.getElementById('outlet');
    setupRouter(outlet);
  }

  render() {
    return html`
      <app-header></app-header>
      <div id="outlet"></div>
    `;
  }
}

customElements.define('my-app', MyApp);
