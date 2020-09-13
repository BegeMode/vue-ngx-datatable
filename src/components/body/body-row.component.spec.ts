import { mount, Wrapper } from '@vue/test-utils';
import * as flushPromises from 'flush-promises';
import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';
import DataTableBodyRowComponent from './body-row.component.vue';
// import DataTableBodyCellComponent from './body-cell.component';

let wrapper: Wrapper<DataTableBodyRowComponent>;
let component: DataTableBodyRowComponent;

async function setupTest(componentClass: VueConstructor) {
  try {
    wrapper = mount(componentClass, {
      propsData: {
        columnGroupWidths: {
          left: 0,
          center: 0,
          right: 0,
          total: 100,
        },
      },
    }) as Wrapper<DataTableBodyRowComponent>;
    // await Vue.nextTick();
    await flushPromises();
    component = wrapper.vm;
    await Vue.nextTick();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

describe('DataTableBodyRowComponent', () => {
  beforeEach(async () => {
    await setupTest(DataTableBodyRowComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      void expect(component).toBeTruthy();
    });
  });
});
