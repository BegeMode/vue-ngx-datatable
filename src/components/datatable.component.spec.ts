/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable max-classes-per-file */
import { mount, Wrapper } from '@vue/test-utils';
import DatatableComponentClass from 'components/datatable.component';
import * as flushPromises from 'flush-promises';
import { ISortPropDir } from 'types/sort-prop-dir.type';
import { TableColumn } from 'types/table-column.type';
import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';
import { Component } from 'vue-property-decorator';
import DataTableBodyCellComponent from './body/body-cell.component.vue';
import DataTableBodyRowComponent from './body/body-row.component.vue';
import DataTableColumnComponent from './columns/column.component';
import DatatableComponent from './datatable.component.vue';

let wrapper: Wrapper<TestFixtureComponent | TestFixtureComponentWithCustomTemplates>;
let component: TestFixtureComponent | TestFixtureComponentWithCustomTemplates;

@Component({
  name: 'TestFixtureComponent',
  components: {
    'ngx-datatable': DatatableComponent,
  },
  template: ' <ngx-datatable :columns="columns" :rows="rows" :sorts="sorts"> </ngx-datatable> ',
})
class TestFixtureComponent extends Vue {
  columns: TableColumn[] = [];
  rows: Record<string, unknown>[] = [];
  sorts: ISortPropDir[] = [];
  offset? = 0;
}

@Component({
  name: 'TestFixtureComponentWithCustomTemplates',
  components: {
    'ngx-datatable': DatatableComponent,
    'ngx-datatable-column': DataTableColumnComponent,
  },
  template: `
    <ngx-datatable :rows="rows" :sorts="sorts">
      <ngx-datatable-column name="Id" prop="id">
        <template v-slot:header="scope">
          <span
            ><strong>{{ scope.column.name }}</strong></span
          >
        </template>
        <template v-slot:default="scope">
          <span v-if="scope.row">{{ scope.row.id }}</span>
        </template>
      </ngx-datatable-column>
      <ngx-datatable-column :prop="columnTwoProp">
        <template v-slot:header="scope">
          <span
            ><strong>{{ scope.column.name }}</strong></span
          >
        </template>
        <template v-slot:default="scope">
          <span v-if="scope.row">{{ scope.value }}</span>
        </template>
      </ngx-datatable-column>
    </ngx-datatable>
  `,
})
class TestFixtureComponentWithCustomTemplates extends Vue {
  columns: TableColumn[] = [];
  rows: Record<string, unknown>[] = [];
  sorts: ISortPropDir[] = [];
  columnTwoProp = '';
  offset? = 0;
}

describe('DatatableComponent', () => {
  beforeEach(async () => {
    await setupTest(TestFixtureComponent);
  });
  // wrapper = mount(TestFixtureComponent);
  // component = wrapper.vm;

  it('should sort date values', async () => {
    const initialRows = [
      { birthDate: new Date(1980, 11, 1) },
      { birthDate: new Date(1978, 8, 5) },
      { birthDate: new Date(1995, 4, 3) },
    ];

    const columns = [
      {
        prop: 'birthDate',
      },
    ];

    component.rows = initialRows;
    component.columns = columns;
    await component.$nextTick();
    await flushPromises();

    // sort by `birthDate` ascending
    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('1978', 'Ascending');
    expect(textContent({ row: 2, column: 1 })).toContain('1980', 'Ascending');
    expect(textContent({ row: 3, column: 1 })).toContain('1995', 'Ascending');

    // sort by `birthDate` descending
    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('1995', 'Descending');
    expect(textContent({ row: 2, column: 1 })).toContain('1980', 'Descending');
    expect(textContent({ row: 3, column: 1 })).toContain('1978', 'Descending');
  });

  it('should sort number values', async () => {
    const initialRows = [{ id: 5 }, { id: 20 }, { id: 12 }];

    const columns = [
      {
        prop: 'id',
      },
    ];

    component.rows = initialRows;
    component.columns = columns;
    await Vue.nextTick();
    await flushPromises();

    // sort by `id` ascending
    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('5', 'Ascending');
    expect(textContent({ row: 2, column: 1 })).toContain('12', 'Ascending');
    expect(textContent({ row: 3, column: 1 })).toContain('20', 'Ascending');

    // sort by `id` descending
    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('20', 'Descending');
    expect(textContent({ row: 2, column: 1 })).toContain('12', 'Descending');
    expect(textContent({ row: 3, column: 1 })).toContain('5', 'Descending');
  });

  it('should sort string values', async () => {
    const initialRows = [{ product: 'Computers' }, { product: 'Bikes' }, { product: 'Smartphones' }];

    const columns = [
      {
        prop: 'product',
      },
    ];

    component.rows = initialRows;
    component.columns = columns;
    await Vue.nextTick();
    await flushPromises();

    // sort by `product` ascending
    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('Bikes', 'Ascending');
    expect(textContent({ row: 2, column: 1 })).toContain('Computers', 'Ascending');
    expect(textContent({ row: 3, column: 1 })).toContain('Smartphones', 'Ascending');

    // sort by `product` descending
    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('Smartphones', 'Descending');
    expect(textContent({ row: 2, column: 1 })).toContain('Computers', 'Descending');
    expect(textContent({ row: 3, column: 1 })).toContain('Bikes', 'Descending');
  });

  it('should sort with a custom comparator', async () => {
    const initialRows = [{ product: 'Smartphones' }, { product: 'Cars' }, { product: 'Bikes' }];

    const columns = [
      {
        prop: 'product',
        comparator: (productA: string, productB: string) => productA.length - productB.length,
      },
    ];

    component.rows = initialRows;
    component.columns = columns;
    await Vue.nextTick();
    await flushPromises();

    // sort by `product` ascending
    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('Cars', 'Ascending');
    expect(textContent({ row: 2, column: 1 })).toContain('Bikes', 'Ascending');
    expect(textContent({ row: 3, column: 1 })).toContain('Smartphones', 'Ascending');

    // sort by `product` descending
    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('Smartphones', 'Descending');
    expect(textContent({ row: 2, column: 1 })).toContain('Bikes', 'Descending');
    expect(textContent({ row: 3, column: 1 })).toContain('Cars', 'Descending');
  });

  it('should sort using a stable sorting algorithm', async () => {
    const initialRows = [
      { name: 'sed', state: 'CA' },
      { name: 'dolor', state: 'NY' },
      { name: 'ipsum', state: 'NY' },
      { name: 'foo', state: 'CA' },
      { name: 'bar', state: 'CA' },
      { name: 'cat', state: 'CA' },
      { name: 'sit', state: 'CA' },
      { name: 'man', state: 'CA' },
      { name: 'lorem', state: 'NY' },
      { name: 'amet', state: 'NY' },
      { name: 'maecennas', state: 'NY' },
    ];

    /**
     * assume the following sort operations take place on `initialRows`:
     * 1) initialRows.sort(byLengthOfNameProperty) (Ascending)
     * 2) initialRows.sort(byState)                (Descending)
     *
     * in browsers that do not natively implement stable sort (such as Chrome),
     * the result could be:
     *
     *  [
     *    { name: 'maecennas',  state: 'NY' },
     *    { name: 'amet',       state: 'NY' },
     *    { name: 'dolor',      state: 'NY' },
     *    { name: 'ipsum',      state: 'NY' },
     *    { name: 'lorem',      state: 'NY' },
     *    { name: 'sed',        state: 'CA' },
     *    { name: 'cat',        state: 'CA' },
     *    { name: 'man',        state: 'CA' },
     *    { name: 'foo',        state: 'CA' },
     *    { name: 'bar',        state: 'CA' },
     *    { name: 'sit',        state: 'CA' }
     *  ]
     *
     * in browsers that natively implement stable sort the result is guaranteed
     * to be:
     *
     *  [
     *    { name: 'amet',       state: 'NY' },
     *    { name: 'dolor',      state: 'NY' },
     *    { name: 'ipsum',      state: 'NY' },
     *    { name: 'lorem',      state: 'NY' },
     *    { name: 'maecennas',  state: 'NY' },
     *    { name: 'sed',        state: 'CA' },
     *    { name: 'foo',        state: 'CA' },
     *    { name: 'bar',        state: 'CA' },
     *    { name: 'cat',        state: 'CA' },
     *    { name: 'sit',        state: 'CA' },
     *    { name: 'man',        state: 'CA' }
     *  ]
     */

    const columns = [
      {
        prop: 'name',
        comparator: (nameA: string, nameB: string) => nameA.length - nameB.length,
      },
      {
        prop: 'state',
      },
    ];

    component.rows = initialRows;
    component.columns = columns;
    await Vue.nextTick();
    await flushPromises();

    // sort by `name` ascending
    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    // sort by `state` descending
    sortBy({ column: 2 });
    await Vue.nextTick();
    await flushPromises();

    sortBy({ column: 2 });
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('amet');
    expect(textContent({ row: 2, column: 1 })).toContain('dolor');
    expect(textContent({ row: 3, column: 1 })).toContain('ipsum');
    expect(textContent({ row: 4, column: 1 })).toContain('lorem');
    expect(textContent({ row: 5, column: 1 })).toContain('maecennas');
    expect(textContent({ row: 6, column: 1 })).toContain('sed');
    expect(textContent({ row: 7, column: 1 })).toContain('foo');
    expect(textContent({ row: 8, column: 1 })).toContain('bar');
    expect(textContent({ row: 9, column: 1 })).toContain('cat');
    expect(textContent({ row: 10, column: 1 })).toContain('sit');
    expect(textContent({ row: 11, column: 1 })).toContain('man');
  });

  it('should sort correctly after push events', async () => {
    const initialRows = [
      { name: 'sed', state: 'CA' },
      { name: 'dolor', state: 'NY' },
      { name: 'ipsum', state: 'NY' },
      { name: 'foo', state: 'CA' },
      { name: 'bar', state: 'CA' },
      { name: 'cat', state: 'CA' },
      { name: 'sit', state: 'CA' },
      { name: 'man', state: 'CA' },
      { name: 'lorem', state: 'NY' },
      { name: 'amet', state: 'NY' },
      { name: 'maecennas', state: 'NY' },
    ];
    const additionalRows = [...initialRows];

    const columns = [
      {
        prop: 'name',
        comparator: (nameA: string, nameB: string) => nameA.length - nameB.length,
      },
      {
        prop: 'state',
      },
    ];

    component.rows = initialRows;
    component.columns = columns;
    await Vue.nextTick();
    await flushPromises();

    // sort by `state` descending
    sortBy({ column: 2 });
    await Vue.nextTick();
    await flushPromises();

    sortBy({ column: 2 });
    await Vue.nextTick();
    await flushPromises();

    // sort by `name` ascending
    sortBy({ column: 1 });

    // mimic new `rows` data pushed to component
    component.rows = additionalRows;
    await Vue.nextTick();
    await flushPromises();

    // sort by `state` descending
    sortBy({ column: 2 });
    await Vue.nextTick();
    await flushPromises();

    sortBy({ column: 2 });
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('amet');
    expect(textContent({ row: 2, column: 1 })).toContain('dolor');
    expect(textContent({ row: 3, column: 1 })).toContain('ipsum');
    expect(textContent({ row: 4, column: 1 })).toContain('lorem');
    expect(textContent({ row: 5, column: 1 })).toContain('maecennas');
    expect(textContent({ row: 6, column: 1 })).toContain('sed');
    expect(textContent({ row: 7, column: 1 })).toContain('foo');
    expect(textContent({ row: 8, column: 1 })).toContain('bar');
    expect(textContent({ row: 9, column: 1 })).toContain('cat');
    expect(textContent({ row: 10, column: 1 })).toContain('sit');
    expect(textContent({ row: 11, column: 1 })).toContain('man');
  });

  it('should set offset to 0 when sorting by a column', async () => {
    const initialRows = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const columns = [
      {
        prop: 'id',
      },
    ];

    component.rows = initialRows;
    component.columns = columns;
    component.offset = 1;
    await Vue.nextTick();
    await flushPromises();

    // sort by `id` descending
    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    sortBy({ column: 1 });
    await Vue.nextTick();
    await flushPromises();

    const datatableComponent = wrapper.findComponent(DatatableComponent);
    expect((datatableComponent.vm as DatatableComponentClass).innerOffset).toBe(0);
  });

  it('should support array data', async () => {
    const initialRows = [['Hello', 123]];
    const columns = [{ prop: 0 }, { prop: 1 }];

    // previously, an exception was thrown from column-helper.ts setColumnDefaults()
    component.columns = columns;
    await Vue.nextTick();
    component.rows = initialRows as unknown as Record<string, unknown>[];
    await Vue.nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('Hello');
    expect(textContent({ row: 1, column: 2 })).toContain('123');
  });
});

// //////////////////////////////////////////////////////////////////////////////
// slots tests
// //////////////////////////////////////////////////////////////////////////////
describe('DatatableComponent With Custom Templates', () => {
  beforeEach(async () => {
    await setupTest(TestFixtureComponentWithCustomTemplates);
  });

  it('should sort when the table is initially rendered if `sorts` are provided', async () => {
    const initialRows = [
      { id: 5, user: 'Bob' },
      { id: 20, user: 'Sam' },
      { id: 12, user: 'Joe' },
    ];

    const sorts = [
      {
        prop: 'id',
        dir: 'asc',
      },
    ];

    (component as TestFixtureComponentWithCustomTemplates).columnTwoProp = 'user';
    component.rows = initialRows;
    component.sorts = sorts as ISortPropDir[];

    await component.$nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 1 })).toContain('5', 'Ascending');
    expect(textContent({ row: 2, column: 1 })).toContain('12', 'Ascending');
    expect(textContent({ row: 3, column: 1 })).toContain('20', 'Ascending');
  });

  it('should reflect changes to input bindings of `ngx-datatable-column`', async () => {
    const initialRows = [
      { id: 5, user: 'Sam', age: 35 },
      { id: 20, user: 'Bob', age: 50 },
      { id: 12, user: 'Joe', age: 60 },
    ];

    /**
     * initially display `user` column as the second column in the table
     */
    (component as TestFixtureComponentWithCustomTemplates).columnTwoProp = 'user';
    await component.$nextTick();
    component.rows = initialRows;

    await component.$nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 2 })).toContain('Sam', 'Displays user');
    expect(textContent({ row: 2, column: 2 })).toContain('Bob', 'Displays user');
    expect(textContent({ row: 3, column: 2 })).toContain('Joe', 'Displays user');

    /**
     * switch to displaying `age` column as the second column in the table
     */
    (component as TestFixtureComponentWithCustomTemplates).columnTwoProp = 'age';
    await component.$nextTick();
    await flushPromises();

    expect(textContent({ row: 1, column: 2 })).toContain('35', 'Displays age');
    expect(textContent({ row: 2, column: 2 })).toContain('50', 'Displays age');
    expect(textContent({ row: 3, column: 2 })).toContain('60', 'Displays age');
  });
});

async function setupTest(componentClass: VueConstructor) {
  try {
    wrapper = mount(componentClass, { sync: false }) as Wrapper<
      TestFixtureComponent | TestFixtureComponentWithCustomTemplates
    >;
    // await Vue.nextTick();
    await flushPromises();
    component = wrapper.vm;
    await Vue.nextTick();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

/**
 * mimics the act of a user clicking a column to sort it
 */
function sortBy({ column }: { column: number }) {
  const columnIndex = column - 1;
  const headerCells = wrapper.findAll('.datatable-header-cell');
  // if (!headerCells.length) {
  //   await waitForHeader();
  // }
  const headerCell = headerCells.wrappers[columnIndex];
  const span = headerCell.find('span:last-child');
  span.trigger('click');
}

/**
 * test helper function to return text content of a cell within the
 * body of the ngx-datatable component
 */
function textContent({ row, column }: { row: number; column: number }) {
  const [rowIndex, columnIndex] = [row - 1, column - 1];
  const bodyRows = wrapper.findAllComponents(DataTableBodyRowComponent);
  const bodyRow = bodyRows.wrappers[rowIndex] as Wrapper<DataTableBodyRowComponent>;
  const rowCols = bodyRow.findAllComponents(DataTableBodyCellComponent);
  const rowCol = rowCols.wrappers[columnIndex];
  return rowCol.text();
}
