import {LitElement, html, css} from 'lit';
import {msg, str, updateWhenLocaleChanges} from '@lit/localize';
import * as colors from '../../theme/colors';
import '../../components/DataTable/index';
import {Router} from '@vaadin/router';
import {deleteEmployee, getEmployees} from '../../helpers/employee_helper';
import modal from '../../helpers/modal';

class EmployeeListView extends LitElement {
  static properties = {
    employeeData: {type: Array},
    searchTerm: {type: String},
    tableType: {type: String},
  };

  constructor() {
    super();
    this.searchTerm = '';
    this.tableType = 'row';

    updateWhenLocaleChanges(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.employeeData = getEmployees();
  }

  onSearchInputChanged(event) {
    this.searchTerm = event.target.value;
    // this.requestUpdate();
  }

  changeTableType(type) {
    this.tableType = type;
  }

  onEditPress(event) {
    const {id} = event.detail.row;
    Router.go(`/employee-list/edit-employee/${id}`);
  }

  onDeletePress(event) {
    const {id, firstName, lastName} = event.detail.row;
    const name = `${firstName} ${lastName}`;
    modal
      .open(
        msg('Are you sure?'),
        msg(str`Selected Employee record of ${name} will be deleted`)
      )
      .then((result) => {
        if (!result) return null;
        deleteEmployee(id);
        this.fetchData();
      });
  }

  get columns() {
    return [
      {
        label: msg('First Name'),
        key: 'firstName',
        customCss: css`
          font-family: 'ING Me Bold';
        `,
      },
      {
        label: msg('Last Name'),
        key: 'lastName',
        customCss: css`
          font-family: 'ING Me Bold';
        `,
      },
      {label: msg('Date of Employment'), key: 'dateOfEmployment'},
      {label: msg('Date of Birth'), key: 'dateOfBirth'},
      {label: msg('Phone'), key: 'phone'},
      {label: msg('Email'), key: 'email'},
      {
        label: msg('Department'),
        key: 'department',
        overrideCell: (row) => {
          switch (row.department) {
            case 'tech':
              return msg('Tech');
            case 'analytics':
              return msg('Analytics');
            default:
              return row.department;
          }
        },
      },
      {
        label: msg('Position'),
        key: 'position',
        overrideCell: (row) => {
          switch (row.position) {
            case 'junior':
              return msg('Junior');
            case 'medior':
              return msg('Medior');
            case 'senior':
              return msg('Senior');
            default:
              return row.position;
          }
        },
      },
    ];
  }

  onDeleteSelecteds(event) {
    const selectedIds = event.detail.selectedIds;
    const deleteCount = selectedIds.length;
    modal
      .open(
        msg('Are you sure?'),
        msg(str`${deleteCount} of item(s) will be deleted.`)
      )
      .then((result) => {
        if (!result) return null;
        selectedIds.forEach((id) => {
          deleteEmployee(id);
        });
        this.fetchData();
      });
  }

  async fetchData() {
    this.employeeData = getEmployees();
  }

  render() {
    return html`
      <div class="page-header">
        <h2>${msg('Employee List')}</h2>
        <div class="header-right">
          <div class="search-wrapper">
            <label for="search">${msg('Search')}: </label>
            <input
              id="search"
              type="text"
              @input="${this.onSearchInputChanged}"
            />
          </div>
          <fa-icon
            class="list-style-icon"
            icon="bars"
            color="${colors.ingOrange}"
            @click="${() => this.changeTableType('row')}"
          ></fa-icon>
          <fa-icon
            class="list-style-icon"
            icon="table-cells"
            color="${colors.ingOrange}"
            @click="${() => this.changeTableType('box')}"
          ></fa-icon>
        </div>
      </div>
      <slot></slot>

      ${this.showDeleteModal}
      <data-table
        .data="${this.employeeData}"
        .columns="${this.columns}"
        .editable="${true}"
        .deletable="${true}"
        .searchTerm="${this.searchTerm}"
        .tableType="${this.tableType}"
        @onEditPress="${this.onEditPress}"
        @onDeletePress="${this.onDeletePress}"
        @onDeleteSelecteds="${this.onDeleteSelecteds}"
      ></data-table>
      </custom-modal>
    `;
  }

  static styles = css`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @media (max-width: 568px) {
      .page-header {
        flex-direction: column;
      }
    }
    h2 {
      color: ${colors.ingOrange};
    }
    .header-right {
      display: flex;
      justify-content: center;
    }
    .list-style-icon {
      margin-left: 2px;
      margin-right: 2px;
      cursor: pointer;
      font-size: 20px;
    }

    .search-wrapper {
      margin-right: 10px;
    }
    input,
    select {
      padding: 5px 10px 5px 10px;
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
    .link {
      color: pink;
    }
  `;
}

customElements.define('employee-list-view', EmployeeListView);
