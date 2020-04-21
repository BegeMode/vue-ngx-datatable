import { Wrapper, mount } from '@vue/test-utils';
import Vue from 'vue';
import * as flushPromises from 'flush-promises';
import { Component } from 'vue-property-decorator';
// import { LongPressDirective } from './long-press.directive';

let wrapper: Wrapper<any>;
let component: any;

async function setupTest(componentClass) {
  try {
    wrapper = mount(componentClass);
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
    <div v-long-press="{ pressModel: {}, pressEnabled: false }"></div>
  `
})
class TestFixtureComponent extends Vue {}

describe('LongPressDirective', () => {

  describe('fixture', () => {

    beforeEach(async () => {
      await setupTest(TestFixtureComponent);
    });
  
  
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have LongPressDirective directive', () => {
      const ctrl = component.$el.__longpress__;
      expect(ctrl).toBeTruthy();
    });

    it('should have isLongPress set to false', () => {
      const ctrl = component.$el.__longpress__;
      expect(ctrl.pressEnabled).toBeFalsy();
    });

    /*
    describe('When the mouse is clicked for 500 ms', () => {

      it('isLongPress should returns true', fakeAsync(() => {

        directive.onMouseDown(new MouseEvent('mousedown'));
        expect(directive.isLongPress).toBe(false);

        tick(500);
        expect(directive.isLongPress).toBe(true);

        directive.isLongPressing = false;
        tick(50); //clear last timer
      }));
    });
    */
  });
});
