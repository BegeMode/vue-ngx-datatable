import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import * as flushPromises from 'flush-promises';
import ProgressBarComponent from './progress-bar.component';

let wrapper: Wrapper<ProgressBarComponent>;
let component: ProgressBarComponent;

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

describe('ProgressBarComponent', () => {

  beforeEach(async () => {
    await setupTest(ProgressBarComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
