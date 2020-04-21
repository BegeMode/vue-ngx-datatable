import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import * as flushPromises from 'flush-promises';
import ScrollerComponent from './scroller.component';

let wrapper: Wrapper<ScrollerComponent>;
let component: ScrollerComponent;

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

describe('ScrollerComponent', () => {

  beforeEach(async () => {
    await setupTest(ScrollerComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
