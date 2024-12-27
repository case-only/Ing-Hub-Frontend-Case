import {DataTable} from '../src/components/DataTable';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('data-table', () => {
  test('is defined', () => {
    const el = document.createElement('data-table');
    assert.instanceOf(el, DataTable);
  });

  suite('data-table', () => {
    test('renders with provided data and columns', async () => {
      const el = await fixture(html`
        <data-table
          .data="${[
            {id: 1, name: 'John Doe', role: 'Developer'},
            {id: 2, name: 'Jane Smith', role: 'Designer'},
          ]}"
          .columns="${[
            {key: 'name', label: 'Name'},
            {key: 'role', label: 'Role'},
          ]}"
        ></data-table>
      `);
      const rows = el.shadowRoot.querySelectorAll('tbody tr');
      assert.equal(rows.length, 2, 'There should be 2 rows');
      assert.include(rows[0].innerHTML, 'John Doe');
      assert.include(rows[0].innerHTML, 'Developer');
      assert.include(rows[1].innerHTML, 'Jane Smith');
      assert.include(rows[1].innerHTML, 'Designer');
    });
  });

  test('pagination works correctly', async () => {
    const el = await fixture(html`
      <data-table
        .data="${Array.from({length: 20}, (_, i) => ({
          id: i,
          name: `Item ${i}`,
        }))}"
        .columns="${[{key: 'name', label: 'Name'}]}"
        .pageSize="${5}"
      ></data-table>
    `);

    const paginationNumbers = el.shadowRoot.querySelectorAll(
      '.pagination__number'
    );

    assert.equal(paginationNumbers.length, 4, 'There should be 4 pages');

    paginationNumbers[1].click();
    await el.updateComplete;

    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    const displayedItems = Array.from(rows).map((row) =>
      row.textContent.trim()
    );

    assert.include(
      displayedItems[0],
      'Item 5',
      'First row should display Item 5'
    );
    assert.include(
      displayedItems[4],
      'Item 9',
      'Last row should display Item 9'
    );
  });

  test('select all functionality', async () => {
    const el = await fixture(html`
      <data-table
        .data="${[
          {id: 1, name: 'John Doe'},
          {id: 2, name: 'Jane Smith'},
        ]}"
        .columns="${[{key: 'name', label: 'Name'}]}"
      ></data-table>
    `);
    el.selectAll();
    await el.updateComplete;
    assert.deepEqual(el.selectedIds, [1, 2]);
  });

  test('box functionality', async () => {
    const el = await fixture(html`
      <data-table
        .data="${[
          {id: 1, name: 'John Doe'},
          {id: 2, name: 'Jane Smith'},
        ]}"
        .columns="${[{key: 'name', label: 'Name'}]}"
        tableType="box"
      ></data-table>
    `);

    const dataBoxes = el.shadowRoot.querySelectorAll('.box-wrapper .data-box');

    assert.isNotEmpty(dataBoxes, 'Data boxes should be rendered in box mode');
    assert.equal(
      dataBoxes.length,
      2,
      'The number of data boxes should match the number of data items'
    );
  });

  test('deletion event is dispatched', async () => {
    const el = await fixture(html`
      <data-table
        .data="${[
          {id: 1, name: 'John Doe'},
          {id: 2, name: 'Jane Smith'},
        ]}"
        .columns="${[{key: 'name', label: 'Name'}]}"
        .deletable="${true}"
      ></data-table>
    `);
    const deleteButton = el.shadowRoot.querySelector(
      '.action-icon[icon="trash"]'
    );
    const deleteEventPromise = new Promise((resolve) => {
      el.addEventListener('onDeletePress', resolve);
    });
    deleteButton.click();
    const event = await deleteEventPromise;
    assert.deepEqual(event.detail.row, {id: 1, name: 'John Doe'});
  });
});
