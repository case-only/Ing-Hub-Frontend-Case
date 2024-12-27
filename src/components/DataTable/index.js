import {LitElement, html, css} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';
import * as colors from '../../theme/colors';

import '../CheckboxInput';
import '../FaIcon';

export class DataTable extends LitElement {
  static properties = {
    data: {type: Array},
    columns: {type: Array},
    editable: {type: Boolean},
    deletable: {type: Boolean},
    searchTerm: {type: String},
    selectedIds: {type: Array},
    pageSize: {type: Number},
    currentPage: {type: Number},
    tableType: {type: String},
  };

  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    @media (max-width: 968px) {
      table {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        display: block;
        width: 100%;
      }
    }
    thead {
      th {
        color: ${colors.ingOrange};
        font-size: 14px;
        font-family: 'ING Me Bold';
      }
    }
    th,
    td {
      padding: 8px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
    .search-input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
    }
    .action-buttons-wrapper {
      display: flex;
      justify-content: space-between;
      padding-left: 2px;
      padding-right: 2px;
    }
    .action-icon {
      cursor: pointer;
    }
    th.checkbox-cell {
      width: 20px;
      text-align: left;
    }
    th.actions-cell {
      width: 20px;
    }
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    .pagination__number,
    .pagination__arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      color: ${colors.black};
      margin-left: 4px;
      border-radius: 50%;
      transition: ease-in-out 0.2s all;
      cursor: pointer;
    }
    .pagination__number:hover {
      background-color: ${colors.ingOrange};
      color: ${colors.white};
    }
    .pagination__number[active] {
      background-color: ${colors.ingOrange};
      color: ${colors.white};
    }
    .pagination__arrow:hover:not([disabled]) {
      background-color: ${colors.ingOrange};
      color: ${colors.white};
    }
    .pagination__arrow[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .box-wrapper {
      /* display: flex;
      flex-wrap: wrap;
      justify-content: center; */
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, max-content));
      grid-gap: 16px;
      justify-content: center;
      padding: initial;
    }
    .data-box {
      margin: 10px;
      padding-top: 30px;
      padding-bottom: 20px;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      flex-direction: column;
      width: 250px;
      height: 250px;
      border: 2px solid ${colors.ingOrange};
      border-radius: 10px;
      position: relative;
    }
    .box-title {
      font-family: 'ING Me Bold';
    }
    .box-value {
      font-family: 'ING Me';
    }
    .box-checkbox-input {
      position: absolute;
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 4px;
      right: 1px;
    }
    .box-action-buttons-wrapper {
      position: absolute;
      left: 0;
      bottom: 10px;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    .box-action-buttons-wrapper .action-icon {
      margin-left: 5px;
      margin-right: 5px;
    }

    .no-data {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .short-tools-wrapper {
      display: flex;
      justify-content: flex-end;
    }

    .select-all,
    .delete-selecteds {
      cursor: pointer;
      color: ${colors.ingOrange};
    }
    .vertical-ruler {
      color: ${colors.ingOrange};
      margin-left: 10px;
      margin-right: 10px;
    }
  `;

  constructor() {
    super();
    this.data = [];
    this.columns = [];
    this.editable = false;
    this.deletable = false;
    this.selectedIds = [];
    this.pageSize = 10;
    this.currentPage = 1;
    this.tableType = 'row';
    updateWhenLocaleChanges(this);
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages || this.currentPage == page)
      return null;
    this.currentPage = page;
    this.requestUpdate();
  }

  selectAll() {
    if (this.selectedIds.length >= this.filteredData.length) {
      this.selectedIds = [];
    } else {
      this.selectedIds = [...this.filteredData.map((x) => x.id)];
    }

    this.requestUpdate();
  }

  selectOnChange(event, row) {
    const isChecked = event.target.checked;
    if (isChecked && !this.selectedIds.includes(row.id)) {
      this.selectedIds = [...this.selectedIds, row.id];
    } else {
      this.selectedIds = this.selectedIds.filter((x) => x !== row.id);
    }
  }

  deleteSelecteds() {
    this.dispatchEvent(
      new CustomEvent('onDeleteSelecteds', {
        detail: {selectedIds: this.selectedIds},
      })
    );
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    return this.filteredData.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  renderPagination() {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    return html`
      <div class="pagination">
        <span
          class="pagination__arrow"
          ?disabled="${currentPage === 1}"
          @click="${() => this.goToPage(currentPage - 1)}"
        >
          <fa-icon icon="angle-left">
        </span>
        ${Array.from({length: totalPages}, (_, index) => index + 1).map(
          (page) => html`
            <span
              class="pagination__number"
              ?active=${page === currentPage}
              @click="${() => this.goToPage(page)}"
            >
              ${page}
            </span>
          `
        )}
        <span
          class="pagination__arrow"
          ?disabled="${currentPage === totalPages}"
          @click="${() => this.goToPage(currentPage + 1)}"
        >
          <fa-icon icon="angle-right">
        </span>
      </div>
    `;
  }

  renderTableView() {
    return html`
      <div class="short-tools-wrapper">
        ${this.selectedIds.length > 0
          ? html`
              <div class="delete-selecteds" @click="${this.deleteSelecteds}">
                ${msg('Delete Selecteds')}
              </div>
            `
          : ''}
      </div>

      <table>
        <thead>
          <tr>
            <th class="checkbox-cell">
              <checkbox-input
                id="select_all"
                @change="${this.selectAll}"
                .checked=${this.filteredData.length > 0 &&
                this.selectedIds.length >= this.filteredData.length}
              />
            </th>
            ${this.columns.map((column) => html`<th>${column.label}</th>`)}
            ${this.editable || this.deletable
              ? html`<th class="actions-cell">
                  ${msg('Actions', {desc: 'Actions title in table head'})}
                </th>`
              : ''}
          </tr>
        </thead>
        <tbody>
          ${this.paginatedData.map(
            (employee) => html`
              <tr>
                <td class="checkbox-cell">
                  <checkbox-input
                    @change="${(event) => this.selectOnChange(event, employee)}"
                    id="checkbox_${employee.id}"
                    .checked=${this.selectedIds.includes(employee.id)}
                  />
                </td>
                ${this.columns.map(
                  (column) =>
                    html`<td style="${column.customCss}">
                      ${column.overrideCell
                        ? column.overrideCell(employee)
                        : employee[column.key]}
                    </td>`
                )}
                ${this.editable || this.deletable
                  ? html`
                      <td>
                        <div class="action-buttons-wrapper">
                          ${this.editable
                            ? html`<fa-icon
                                class="action-icon"
                                @click="${() => this.editIconPress(employee)}"
                                icon="pen-to-square"
                                color="${colors.ingOrange}"
                                alt="${msg('Edit')}"
                              ></fa-icon>`
                            : ''}
                          ${this.deletable
                            ? html`
                                <fa-icon
                                  class="action-icon"
                                  @click="${() =>
                                    this.deleteIconPress(employee)}"
                                  icon="trash"
                                  color="${colors.ingOrange}"
                                  alt="${msg('Delete')}"
                                ></fa-icon>
                              `
                            : ''}
                        </div>
                      </td>
                    `
                  : ''}
              </tr>
            `
          )}
        </tbody>
      </table>
      ${this.filteredData.length <= 0
        ? html` <div class="no-data">${msg('No Data')}</div> `
        : null}
      ${this.renderPagination()}
    `;
  }

  renderBoxView() {
    return html`
      <div class="short-tools-wrapper">
        <div class="select-all" @click="${this.selectAll}">
          ${this.selectedIds.length >= this.filteredData.length
            ? msg('Unselect All')
            : msg('Select All')}
        </div>
        ${this.selectedIds.length > 0
          ? html`
              <div class="vertical-ruler">|</div>
              <div class="delete-selecteds" @click="${this.deleteSelecteds}">
                ${msg('Delete Selecteds')}
              </div>
            `
          : ''}
      </div>
      <div class="box-wrapper">
        ${this.paginatedData.map((employee) => {
          return html`
            <div class="data-box">
              <checkbox-input
                class="box-checkbox-input"
                @change="${(event) => this.selectOnChange(event, employee)}"
                id="checkbox_${employee.id}"
                .checked=${this.selectedIds.includes(employee.id)}
              ></checkbox-input>
              <div class="box-action-buttons-wrapper">
                ${this.editable
                  ? html`<fa-icon
                      class="action-icon"
                      @click="${() => this.editIconPress(employee)}"
                      icon="pen-to-square"
                      color="${colors.ingOrange}"
                      alt="${msg('Edit')}"
                    ></fa-icon>`
                  : ''}
                ${this.deletable
                  ? html`
                      <fa-icon
                        class="action-icon"
                        @click="${() => this.deleteIconPress(employee)}"
                        icon="trash"
                        color="${colors.ingOrange}"
                        alt="${msg('Delete')}"
                      ></fa-icon>
                    `
                  : ''}
              </div>
              ${this.columns.map(
                (column) => html` <div class="box-title">
                  ${column.label}:
                  <span class="box-value">
                    ${column.overrideCell
                      ? column.overrideCell(employee)
                      : employee[column.key]}
                  </span>
                </div>`
              )}
            </div>
          `;
        })}
      </div>
      ${this.filteredData.length <= 0
        ? html` <div class="no-data">${msg('No Data')}</div> `
        : null}
      ${this.renderPagination()}
    `;
  }

  render() {
    return this.tableType == 'box'
      ? this.renderBoxView()
      : this.renderTableView();
  }

  get filteredData() {
    if (!this.searchTerm) return this.data;
    const searchRegex = new RegExp(this.searchTerm, 'i');
    return this.data.filter((employee) =>
      Object.values(employee).some((value) => searchRegex.test(value))
    );
  }

  editIconPress(data) {
    this.dispatchEvent(new CustomEvent('onEditPress', {detail: {row: data}}));
  }

  deleteIconPress(data) {
    this.dispatchEvent(new CustomEvent('onDeletePress', {detail: {row: data}}));
  }
}

customElements.define('data-table', DataTable);
