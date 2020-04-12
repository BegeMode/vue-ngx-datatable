import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import * as flushPromises from 'flush-promises';
import DataTableRowWrapperComponent from './body-row-wrapper.component';

let wrapper: Wrapper<DataTableRowWrapperComponent>;
let component: DataTableRowWrapperComponent;

async function setupTest(componentClass) {
  try {
    wrapper = mount(componentClass, {
      sync: false,
      propsData: {
        row: {},
        rowDetail: false,
        expanded: false,
        offsetX: 10
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

describe('DataTableRowWrapperComponent', () => {

  beforeEach(async () => {
    await setupTest(DataTableRowWrapperComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have a group header styles', () => {
      const styles = component.groupHeaderStyles;
      expect(styles.transform.includes('translate3d(10')).toBeTruthy();
    });
  });
});
