import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import * as flushPromises from 'flush-promises';
import DataTableHeaderCellComponent from './header-cell.component';

describe('DataTableHeaderCellComponent', () => {
  let wrapper: Wrapper<DataTableHeaderCellComponent>;
  let component: DataTableHeaderCellComponent;
  let element;

  beforeEach(async () => {
    wrapper = mount(DataTableHeaderCellComponent, { sync: false, propsData: { column: {} } });
    await flushPromises();
    component = wrapper.vm;
    element = component.$el;
    await Vue.nextTick();
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
