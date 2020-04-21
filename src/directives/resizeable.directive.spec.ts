import { Wrapper, mount } from '@vue/test-utils';
import Vue from 'vue';
import * as flushPromises from 'flush-promises';
import { Component } from 'vue-property-decorator';
// import ResizeableDirective from './resizeable.directive';

let wrapper: Wrapper<any>;
let component: any;
let resizeable = jasmine.createSpy();

async function setupTest(componentClass) {
  try {
    wrapper = mount(componentClass, {
      directives: {
        'resizeable': resizeable
      }
    })
    // await Vue.nextTick();
    await flushPromises();
    component = wrapper.vm;
    await Vue.nextTick();
  } catch (e) {
    console.error(e);
  }
}

@Component({
  name: 'test-fixture-component',
  template: `
    <div v-resizeable></div>
  `
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
