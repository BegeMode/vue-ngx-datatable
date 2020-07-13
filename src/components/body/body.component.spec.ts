/* eslint-disable @typescript-eslint/no-floating-promises */
import { mount, Wrapper } from '@vue/test-utils';
import * as flushPromises from 'flush-promises';
import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';
import DataTableBody from './body.component';
import DataTableBodyComponent from './body.component.vue';
// import DataTableBodyRowComponent from './body-row.component';
// import DataTableRowWrapperComponent from './body-row-wrapper.component';
// import DataTableBodyCellComponent from './body-cell.component';
// import DataTableSelectionComponent from './selection.component';
// import DataTableSummaryRowComponent from './summary/summary-row.component';
// import ProgressBarComponent from './progress-bar.component';
// import ScrollerComponent from './scroller.component';

let wrapper: Wrapper<DataTableBodyComponent>;
let component: DataTableBody;

async function setupTest(componentClass: VueConstructor) {
  try {
    wrapper = mount(componentClass, { sync: false });
    // await Vue.nextTick();
    await flushPromises();
    component = wrapper.vm as DataTableBody;
    await Vue.nextTick();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

describe('DataTableBodyComponent', () => {
  beforeEach(async () => {
    await setupTest(DataTableBodyComponent);
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Paging', () => {
    it('should have correct indexes for normal paging with rows > pageSize', async () => {
      wrapper.setProps({
        externalPaging: false,
        rows: [
          { num: 1 },
          { num: 2 },
          { num: 3 },
          { num: 4 },
          { num: 5 },
          { num: 6 },
          { num: 7 },
          { num: 8 },
          { num: 9 },
          { num: 10 },
        ],
        pageSize: 10,
        offset: 1,
        rowCount: 20,
      });
      await component.$nextTick();
      const expectedIndexes = { first: 10, last: 20 };
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });

    it('should have correct indexes for normal paging with rows < pageSize', async () => {
      wrapper.setProps({
        externalPaging: false,
        rows: [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }],
        pageSize: 5,
        offset: 1,
        rowCount: 9,
      });
      await component.$nextTick();
      const expectedIndexes = { first: 5, last: 9 };
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });

    it('should have correct indexes for external paging with rows > pageSize', async () => {
      wrapper.setProps({
        externalPaging: true,
        rows: [
          { num: 1 },
          { num: 2 },
          { num: 3 },
          { num: 4 },
          { num: 5 },
          { num: 6 },
          { num: 7 },
          { num: 8 },
          { num: 9 },
          { num: 10 },
        ],
        pageSize: 10,
        offset: 1,
        rowCount: 20,
      });
      await component.$nextTick();
      const expectedIndexes = { first: 0, last: 10 };
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });

    it('should have correct indexes for external paging with rows < pageSize', async () => {
      wrapper.setProps({
        externalPaging: true,
        rows: [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }],
        pageSize: 5,
        offset: 1,
        rowCount: 9,
      });
      await component.$nextTick();
      const expectedIndexes = { first: 0, last: 5 };
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });
  });

  describe('Summary row', () => {
    it('should not return custom styles for a bottom summary row if a scrollbar mode is off', () => {
      const styles = component.getBottomSummaryRowStyles();
      expect(styles).toBeFalsy();
    });

    it('should return custom styles for a bottom summary row if a scrollbar mode is on', async () => {
      wrapper.setProps({
        rowHeight: 50,
        scrollbarV: true,
        virtualization: true,
        rows: [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }],
      });
      await component.$nextTick();
      const styles = component.getBottomSummaryRowStyles();
      expect(styles).toBeDefined();
    });
  });
});
