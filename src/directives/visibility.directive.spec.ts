import { Wrapper, mount } from '@vue/test-utils';
import Vue from 'vue';
import * as flushPromises from 'flush-promises';
// import VisibilityDirective from './visibility.directive';
import { Component } from 'vue-property-decorator';

let wrapper: Wrapper<any>;
let component: any;
let visibilityObserver = jasmine.createSpy();


async function setupTest(componentClass) {
  try {
    wrapper = mount(componentClass, {
      directives: {
        'visibility-observer': visibilityObserver
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
    <div v-visibility-observer @visible="onVisible" style="width:100px;height:100px;"></div>
  `
})
class TestFixtureComponent extends Vue {
  onVisible() {
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

    it('should have VisibilityDirective directive', async () => {
      // const spy = spyOn(component, 'onVisible');
      // await Vue.nextTick();
      // await flushPromises();
      expect(visibilityObserver).toHaveBeenCalled();
      // expect(directive).toBeTruthy();
    });
  });
});
