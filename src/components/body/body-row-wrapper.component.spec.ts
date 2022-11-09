/* eslint-disable @typescript-eslint/no-floating-promises */
import { mount, Wrapper } from '@vue/test-utils';
import * as flushPromises from 'flush-promises';
import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';
import DataTableRowWrapperComponent from './body-row-wrapper.component';

let wrapper: Wrapper<DataTableRowWrapperComponent>;
let component: DataTableRowWrapperComponent;

async function setupTest(componentClass: VueConstructor) {
  try {
    wrapper = mount(componentClass, {
      sync: false,
      propsData: {
        row: {},
        rowDetail: false,
        expanded: false,
        offsetX: 10,
      },
    }) as Wrapper<DataTableRowWrapperComponent>;
    // await Vue.nextTick();
    await flushPromises();
    component = wrapper.vm;
    await Vue.nextTick();
  } catch (e) {
    // eslint-disable-next-line no-console
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
      const styles = component.groupTitleStyles;
      expect(styles).toBeTruthy();
    });
  });
});
