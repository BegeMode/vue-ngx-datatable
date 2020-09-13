import { mount, Wrapper } from '@vue/test-utils';
import * as flushPromises from 'flush-promises';
import Vue, { VueConstructor } from 'vue';
import { TableColumn } from '../../types/table-column.type';
import { setColumnDefaults } from '../../utils/column-helper';
import { numericIndexGetter } from '../../utils/column-prop-getters';
import DataTableBodyCellComponent from './body-cell.component.vue';

let wrapper: Wrapper<DataTableBodyCellComponent>;
let component: DataTableBodyCellComponent;

async function setupTest(componentClass: VueConstructor) {
  try {
    wrapper = mount(componentClass, {
      sync: false,
      propsData: {
        column: {
          visible: true,
          isTreeColumn: false,
          treeToggleTemplate: false,
          $$valueGetter: () => 'test',
        },
        rowContext: {
          treeStatus: 'disabled',
        },
      },
    }) as Wrapper<DataTableBodyCellComponent>;
    // await Vue.nextTick();
    await flushPromises();
    component = wrapper.vm;
    await Vue.nextTick();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

describe('DataTableBodyCellComponent', () => {
  beforeEach(async () => {
    await setupTest(DataTableBodyCellComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', async () => {
      await expect(component).toBeTruthy();
    });
  });

  describe('prop tests', () => {
    // verify there wasn't a mistake where the falsey 0 value
    // resulted in a code path for missing column prop
    it('should get value from zero-index prop', async () => {
      const columns: TableColumn[] = [{ name: 'First Column', prop: 0, value: 'Hello' }];
      // users should never set columns on DataTableBodyCellComponent directly
      // setColumnDefaults will be run on columns before they are set on BodyCellComponent
      setColumnDefaults(columns[0], wrapper.vm);
      await expect(columns[0].$$valueGetter).toBe(numericIndexGetter);

      void wrapper.setProps({
        column: columns[0],
        context: {
          row: ['Hello'],
        },
      });
      await component.$nextTick();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      await expect((component as any).column.value).toEqual('Hello');
    });
  });
});
