import {LitElement, html, css} from 'lit';

class EmployeeView extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('employee-view', EmployeeView);
