import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import * as flushPromises from 'flush-promises';
import DataTableBodyCellComponent from './body-cell.component.vue';

import { numericIndexGetter } from '../../utils/column-prop-getters';
import { setColumnDefaults } from '../../utils/column-helper';
import { TableColumn } from '../../types/table-column.type';

let wrapper: Wrapper<DataTableBodyCellComponent>;
let component: DataTableBodyCellComponent;

async function setupTest(componentClass) {
  try {
    wrapper = mount(componentClass, {
      sync: false,
      propsData: {
        cellColumnCssClasses: (context) => {},
        cellStyleObject: (context) => {},
        marginCellStyle: (context) => {},
        context: {
          row: [],
          column: { visible: true },
        }
      }
    });
    // await Vue.nextTick();
    await flushPromises();
    component = wrapper.vm;
    await Vue.nextTick();
  } catch (e) {
    console.error(e);
  }
}

describe('DataTableBodyCellComponent', () => {

  beforeEach(async () => {
    await setupTest(DataTableBodyCellComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('prop tests', () => {
    // verify there wasn't a mistake where the falsey 0 value
    // resulted in a code path for missing column prop
    it('should get value from zero-index prop', async () => {
      const columns: TableColumn[] = [{ name: 'First Column', prop: 0 }];
      // users should never set columns on DataTableBodyCellComponent directly
      // setColumnDefaults will be run on columns before they are set on BodyCellComponent
      setColumnDefaults(columns[0], wrapper.vm);
      expect(columns[0].$$valueGetter).toBe(numericIndexGetter);

      wrapper.setProps({
        cellColumnCssClasses: (context) => {},
        context: {
          row: ['Hello'],
          column: columns[0],
          value: 'Hello'
        }
      });
      await component.$nextTick();
      expect((component as any).context.value).toEqual('Hello');
    });
  });
});
