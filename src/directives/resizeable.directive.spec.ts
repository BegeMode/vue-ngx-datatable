/* eslint-disable @typescript-eslint/no-floating-promises */
import { mount, Wrapper } from '@vue/test-utils';
import * as flushPromises from 'flush-promises';
import Vue, { VueConstructor } from 'vue';
import { Component } from 'vue-property-decorator';
// import ResizeableDirective from './resizeable.directive';

let wrapper: Wrapper<Vue>;
let component: Vue;
const resizeable = jasmine.createSpy();

async function setupTest(componentClass: VueConstructor) {
  try {
    wrapper = mount(componentClass, {
      directives: {
        resizeable,
      },
    });
    // await Vue.nextTick();
    await flushPromises();
    component = wrapper.vm;
    await Vue.nextTick();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

@Component({
  name: 'test-fixture-component',
  template: ' <div v-resizeable></div> ',
})
class TestFixtureComponent extends Vue {}

describe('ResizeableDirective', () => {
  beforeEach(async () => {
    await setupTest(TestFixtureComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have ResizeableDirective directive', () => {
      expect(resizeable).toHaveBeenCalled();
    });
  });
});
