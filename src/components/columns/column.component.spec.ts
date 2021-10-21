/* eslint-disable @typescript-eslint/no-floating-promises */
import { mount, Wrapper } from '@vue/test-utils';
import * as flushPromises from 'flush-promises';
import { TableColumn } from 'types/table-column.type';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { VueConstructor } from 'vue/types/umd';
import DataTableColumnComponent from './column.component';

let counter = 0;

@Component({
  components: {
    'ngx-datatable-column': DataTableColumnComponent,
  },
  name: 'test-fixture-component',
  template: `
    <div>
      <ngx-datatable-column id="t1"></ngx-datatable-column>
      <ngx-datatable-column id="t2" :name="columnName">
        <!-- <ng-template></ng-template>
      <ng-template></ng-template> -->
      </ngx-datatable-column>
    </div>
  `,
})
class TestFixtureComponent extends Vue {
  columnName = '';

  onColumnInsert(column: TableColumn) {
    counter++;
  }
  onColumnChangeVisible(column: TableColumn) {
    //
  }
  onColumnRemoved(column: TableColumn) {
    //
  }
}

async function setupTest(componentClass: VueConstructor) {
  try {
    counter = 0;
    wrapper = mount(componentClass, { sync: false }) as Wrapper<TestFixtureComponent>;
    // await Vue.nextTick();
    await flushPromises();
    component = wrapper.vm;
    await Vue.nextTick();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

let wrapper: Wrapper<TestFixtureComponent>;
let component: TestFixtureComponent;

describe('DataTableColumnDirective', () => {
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [DataTableColumnDirective, TestFixtureComponent],
  //     providers: [
  //       {
  //         provide: ColumnChangesService,
  //         useValue: {
  //           onInputChange: jasmine.createSpy('onInputChange')
  //         }
  //       }
  //     ]
  //   });
  // });

  beforeEach(async () => {
    await setupTest(TestFixtureComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should be twice called onColumnInsert', () => {
      expect(counter).toEqual(2);
    });
  });

  describe('column #1', () => {
    let column: DataTableColumnComponent;

    beforeEach(() => {
      const wr = wrapper.find('#t1');
      column = wr.vm as DataTableColumnComponent;
    });

    it('should be found', () => {
      expect(column).toBeTruthy();
    });

    it('should have undefined inputs by default', () => {
      expect(column.name).toBeUndefined();
      expect(column.prop).toBeUndefined();
      expect(column.frozenRight).toBeUndefined();
      expect(column.frozenLeft).toBeUndefined();
      expect(column.flexGrow).toBeUndefined();
      expect(column.resizeable).toBeUndefined();
      expect(column.comparator).toBeUndefined();
      expect(column.sortable).toBeUndefined();
      expect(column.draggable).toBeUndefined();
      expect(column.canAutoResize).toBeTrue();
      expect(column.minWidth).toBeUndefined();
      expect(column.width).toBeUndefined();
      expect(column.maxWidth).toBeUndefined();
      expect(column.treeLevelIndent).toBeUndefined();
    });
  });

  describe('column #2', () => {
    let column: DataTableColumnComponent;
    let colWrapper: Wrapper<Vue>;

    beforeEach(() => {
      colWrapper = wrapper.find('#t2');
      column = colWrapper.vm as DataTableColumnComponent;
    });

    it('should be found', () => {
      expect(column).toBeTruthy();
    });

    it('should have the name', async () => {
      component.columnName = 'Column A';
      await component.$nextTick();

      expect(column.name).toEqual(component.columnName);
    });

    it('notifies of visible changes', async () => {
      const spy = spyOn(component, 'onColumnChangeVisible');

      colWrapper.setProps({ visible: false });
      await column.$nextTick();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(column.column);
    });

    xit('notifies after column destroy', async () => {
      const spy = spyOn(component, 'onColumnRemoved');

      column.$destroy();
      await column.$nextTick();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(column.column);
    });
  });
});
