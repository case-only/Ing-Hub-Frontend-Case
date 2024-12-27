import {LitElement, html, css} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';
import * as colors from '../../theme/colors';
import {
  addEmployee,
  getOne,
  getSingleEmployee,
  updateEmployee,
} from '../../helpers/employee_helper';
import {Router} from '@vaadin/router';

export class EditEmployeeView extends LitElement {
  static properties = {
    employeeId: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    dateOfEmployment: {type: String},
    dateOfBirth: {type: String},
    phone: {type: String},
    email: {type: String},
    department: {type: String},
    position: {type: String},
  };

  static styles = css`
    :host {
      display: block;
      max-width: 600px;
      margin: 0 auto;
      font-family: 'ING Me', sans-serif;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    form div {
      display: flex;
      flex-direction: column;
    }
    label {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 4px;
      color: #555;
    }
    input,
    select {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
    input:focus,
    select:focus {
      outline: none;
      border-color: ${colors.ingOrange};
      box-shadow: 0 0 5px rgba(255, 87, 0, 0.5);
    }
    button {
      padding: 12px 20px;
      font-size: 16px;
      color: #fff;
      background-color: ${colors.ingOrange};
      border: none;
      border-radius: 4px;
      cursor: pointer;
      align-self: flex-end;
    }
    button:hover {
      background-color: ${colors.lighterOrange};
    }

    .form-error {
      color: red;
      font-size: 13px;
    }
  `;

  constructor() {
    super();
    this.employeeId = null;
    this.firstName = '';
    this.lastName = '';
    this.dateOfEmployment = '';
    this.dateOfBirth = '';
    this.phone = '';
    this.email = '';
    this.department = '';
    this.position = '';
    this.errorList = [];

    updateWhenLocaleChanges(this);
  }

  connectedCallback() {
    super.connectedCallback();
    const params = this.location?.params;
    this.employeeId = params?.id;

    if (this.employeeId) {
      const data = getSingleEmployee(this.employeeId);
      if (data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.dateOfEmployment = data.dateOfEmployment;
        this.dateOfBirth = data.dateOfBirth;
        this.phone = data.phone;
        this.email = data.email;
        this.department = data.department;
        this.position = data.position;
      }
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.errorList = [];
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    if (this.employeeId) {
      // Update
      updateEmployee(this.employeeId, payload);
    } else {
      const isEmailUsed = getOne({email: payload.email});
      const isPhoneUsed = getOne({phone: payload.phone});
      let hasError = false;
      if (isEmailUsed) {
        this.errorList = [...this.errorList, 'email'];
        hasError = true;
      }
      if (isPhoneUsed) {
        this.errorList = [...this.errorList, 'phone'];
        hasError = true;
      }
      this.requestUpdate();
      if (hasError) return null;
      addEmployee(payload);
    }
    Router.go('/employee-list');
  }

  formErrorText(field) {
    if (field === 'email') {
      return html`${msg('Email is alredy used')}`;
    }
    if (field === 'phone') {
      return html`${msg('Phone is alredy used')}`;
    }
  }

  render() {
    return html`
      <h1>${this.employeeId ? msg('Edit Employee') : msg('Add Employee')}</h1>
      <form @submit="${this.onFormSubmit}">
        <div>
          <label for="firstName">${msg('First Name')}</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            .value=${this.firstName}
            @input=${(e) => (this.firstName = e.target.value)}
            required
          />
        </div>
        <div>
          <label for="lastName">${msg('Last Name')}</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            .value=${this.lastName}
            @input=${(e) => (this.lastName = e.target.value)}
            required
          />
        </div>
        <div>
          <label for="dateOfEmployment">${msg('Date of Employment')}</label>
          <input
            id="dateOfEmployment"
            name="dateOfEmployment"
            type="date"
            .value=${this.dateOfEmployment}
            @input=${(e) => (this.dateOfEmployment = e.target.value)}
            required
          />
        </div>
        <div>
          <label for="dateOfBirth">${msg('Date of Birth')}</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            .value=${this.dateOfBirth}
            @input=${(e) => (this.dateOfBirth = e.target.value)}
            required
          />
        </div>
        <div>
          <label for="phone">${msg('Phone')}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            .value=${this.phone}
            @input=${(e) => (this.phone = e.target.value)}
            required
          />
        </div>
        <div>
          <label for="email">${msg('Email')}</label>
          <input
            id="email"
            name="email"
            type="email"
            .value=${this.email}
            @input=${(e) => (this.email = e.target.value)}
            required
          />
        </div>
        <div>
          <label for="department">${msg('Department')}</label>
          <select
            id="department"
            name="department"
            .value=${this.department}
            @input=${(e) => (this.department = e.target.value)}
            required
          >
            <option value="analytics">Analytics</option>
            <option value="tech">Tech</option>
          </select>
        </div>
        <div>
          <label for="position">${msg('Position')}</label>
          <select
            id="position"
            name="position"
            .value=${this.position}
            @input=${(e) => (this.position = e.target.value)}
            required
          >
            <option value="junior">Junior</option>
            <option value="medior">Medior</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        ${this.errorList.map(
          (field) =>
            html`<span class="form-error">${this.formErrorText(field)}</span>`
        )}
        <button type="submit">Save</button>
      </form>
    `;
  }
}

customElements.define('edit-employee-view', EditEmployeeView);
