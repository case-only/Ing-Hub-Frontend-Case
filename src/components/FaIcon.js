import {LitElement, html, css} from 'lit';

class FaIcon extends LitElement {
  static properties = {
    icon: {type: String},
    color: {type: String},
    type: {type: String},
  };

  constructor() {
    super();
    this.icon = 'gear';
    this.type = '';
  }

  static styles = css`
    :host {
      display: inline-block;
    }
  `;

  firstUpdated() {
    const version = 'fontawesome-free@6.2.1';
    const href = `https://cdn.jsdelivr.net/npm/@fortawesome/${version}/css/all.min.css`;

    const linkFontAwesome = document.createElement('link');
    linkFontAwesome.rel = 'stylesheet';
    linkFontAwesome.href = href;

    if (!document.querySelector(`link[href="${href}"]`)) {
      document.head.append(linkFontAwesome);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('icon')) {
      this.shadowRoot.querySelector('icon').innerHTML = `<i class="${
        this.type ? this.type : 'fa'
      } fa-${this.icon}"></i>`;
    }
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/all.min.css"
      />
      <icon @click="${this.handleClick}" style="color: ${this.color};"></icon>
    `;
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('clicked'));
  }
}

customElements.define('fa-icon', FaIcon);
