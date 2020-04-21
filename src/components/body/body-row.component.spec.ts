import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import * as flushPromises from 'flush-promises';
import DataTableBodyRowComponent from './body-row.component';
// import DataTableBodyCellComponent from './body-cell.component';

let wrapper: Wrapper<DataTableBodyRowComponent>;
let component: DataTableBodyRowComponent;

async function setupTest(componentClass) {
  try {
    wrapper = mount(componentClass, {
      sync: false,
      propsData: {
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

describe('DataTableBodyRowComponent', () => {

  beforeEach(async () => {
    await setupTest(DataTableBodyRowComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

});
