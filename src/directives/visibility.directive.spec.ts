/* eslint-disable @typescript-eslint/no-floating-promises */
import { mount, Wrapper } from '@vue/test-utils';
import * as flushPromises from 'flush-promises';
import Vue from 'vue';
// import VisibilityDirective from './visibility.directive';
import { Component } from 'vue-property-decorator';
import { VueConstructor } from 'vue/types/umd';

let wrapper: Wrapper<Vue>;
let component: Vue;
const visibilityObserver = jasmine.createSpy();

async function setupTest(componentClass: VueConstructor) {
  try {
    wrapper = mount(componentClass, {
      directives: {
        'visibility-observer': visibilityObserver,
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
  template: ' <div v-visibility-observer @visible="onVisible" style="width:100px;height:100px;"></div> ',
})
class TestFixtureComponent extends Vue {
  onVisible() {
    // eslint-disable-next-line no-console
    console.log('onVisible');
  }
}

describe('VisibilityDirective', () => {
  beforeEach(async () => {
    await setupTest(TestFixtureComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have VisibilityDirective directive', () => {
      // const spy = spyOn(component, 'onVisible');
      // await Vue.nextTick();
      // await flushPromises();
      expect(visibilityObserver).toHaveBeenCalled();
      // expect(directive).toBeTruthy();
    });
  });
});
