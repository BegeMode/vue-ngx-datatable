/* eslint-disable @typescript-eslint/no-floating-promises */
import { mount, Wrapper } from '@vue/test-utils';
import * as flushPromises from 'flush-promises';
import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';
import ScrollerComponent from './scroller.component';

let wrapper: Wrapper<ScrollerComponent>;
let component: ScrollerComponent;

async function setupTest(componentClass: VueConstructor) {
  try {
    wrapper = mount(componentClass, {
      sync: false,
      propsData: {
        //
      },
    }) as Wrapper<ScrollerComponent>;
    // await Vue.nextTick();
    await flushPromises();
    component = wrapper.vm;
    await Vue.nextTick();
  } catch (e) {
    // eslint-disable-next-line no-console
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
