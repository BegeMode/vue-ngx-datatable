import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import * as flushPromises from 'flush-promises';
import DataTablePagerComponent from './pager.component';

describe('DataTablePagerComponent', () => {
  let wrapper: Wrapper<DataTablePagerComponent>;
  let pager: DataTablePagerComponent;
  let element;

  beforeEach(async () => {
    wrapper = mount(DataTablePagerComponent, { sync: false });
    // await Vue.nextTick();
    await flushPromises();
    pager = wrapper.vm;
    element = pager.$el;
    await Vue.nextTick();
  });

  describe('size', () => {
    it('should be defined', () => {
      expect(pager.size).toBeDefined();
    });

    it('should default to 0', () => {
      expect(pager.size).toEqual(0);
    });
  });

  describe('count', () => {
    it('should be defined', () => {
      expect(pager.count).toBeDefined();
    });

    it('should default to 0', () => {
      expect(pager.count).toEqual(0);
    });
  });

  describe('page', () => {
    it('should be defined', () => {
      expect(pager.page).toBeDefined();
    });

    it('should default to 1', () => {
      expect(pager.page).toEqual(1);
    });
  });

  describe('totalPages', () => {
    it('should be defined', () => {
      expect(pager.totalPages).toBeDefined();
    });

    it('should default to 1', () => {
      expect(pager.totalPages).toEqual(1);
    });

    it('should calculate totalPages', async () => {
      pager.size = 10;
      pager.count = 28;
      await pager.$nextTick();
      expect(pager.totalPages).toEqual(3);
    });

    it('should have 1 page if size is 0', async () => {
      pager.size = 0;
      pager.count = 28;
      await pager.$nextTick();
      expect(pager.totalPages).toEqual(1);
    });

    it('should have 1 page if count is 0', async () => {
      pager.size = 10;
      pager.count = 0;
      await pager.$nextTick();
      expect(pager.totalPages).toEqual(1);
    });
  });

  describe('canPrevious', () => {
    beforeEach(async () => {
      pager.size = 10;
      pager.count = 100;
      await pager.$nextTick();
    });

    it('should return true if not on first page', async () => {
      pager.page = 2;
      await pager.$nextTick();
      expect((pager as any).canPrevious).toEqual(true);
    });

    it('should return false if on first page', async () => {
      pager.page = 1;
      await pager.$nextTick();
      expect((pager as any).canPrevious).toEqual(false);
    });
  });

  describe('canNext', () => {
    beforeEach(async () => {
      pager.size = 10;
      pager.count = 100;
      await pager.$nextTick();
    });

    it('should return true if not on last page', async () => {
      pager.page = 2;
      await pager.$nextTick();
      expect((pager as any).canNext).toEqual(true);
    });

    it('should return false if on last page', async () => {
      pager.page = 10;
      await pager.$nextTick();
      expect((pager as any).canNext).toEqual(false);
    });
  });

  describe('prevPage()', () => {
    beforeEach(async () => {
      pager.size = 10;
      pager.count = 100;
      await pager.$nextTick();
    });

    it('should set current page to previous page', async () => {
      pager.page = 2;
      pager.prevPage();
      await pager.$nextTick();
      expect(pager.myPage).toEqual(1);
    });

    it('should emit change event', async () => {
      spyOn((pager as any).change, 'emit');
      pager.page = 2;
      await pager.$nextTick();
      pager.prevPage();
      await pager.$nextTick();
      expect((pager as any).change.emit).toHaveBeenCalledWith({ page: 1 });
    });

    it('should not change page if already on first page', async () => {
      pager.page = 1;
      await pager.$nextTick();
      pager.prevPage();
      await pager.$nextTick();
      expect(pager.page).toEqual(1);
    });
  });

  describe('nextPage()', () => {
    beforeEach(async () => {
      pager.size = 10;
      pager.count = 100;
      await pager.$nextTick();
    });

    it('should set current page to next page', async () => {
      pager.page = 2;
      await pager.$nextTick();
      pager.nextPage();
      await pager.$nextTick();
      expect(pager.page).toEqual(3);
    });

    it('should emit change event', async () => {
      spyOn((pager as any).change, 'emit');
      pager.page = 2;
      await pager.$nextTick();
      pager.nextPage();
      await pager.$nextTick();
      expect((pager as any).change.emit).toHaveBeenCalledWith({ page: 3 });
    });

    it('should not change page if already on last page', async () => {
      pager.page = 10;
      await pager.$nextTick();
      pager.nextPage();
      await pager.$nextTick();
      expect(pager.page).toEqual(10);
    });
  });

  describe('selectPage()', () => {
    beforeEach(async () => {
      wrapper
      pager.size = 10;
      pager.count = 100;
      pager.page = 1;
      await pager.$nextTick();
    });

    describe('with a new page', () => {
      it('should set current page', () => {
        pager.selectPage(3);
        expect(pager.myPage).toEqual(3);
      });

      it('should emit change event', () => {
        spyOn((pager as any).change, 'emit');
        pager.selectPage(3);
        expect((pager as any).change.emit).toHaveBeenCalledWith({ page: 3 });
      });
    });

    describe('with the current page777777', () => {
      it('should not emit change event', () => {
        // spyOn((pager as any).change, 'emit');
        const spy = spyOn(pager, '$emit');
        pager.selectPage(pager.page);
        expect(spy.calls.count).toEqual(0);
      });
    });

    describe('with a non-existing page', () => {
      it('should not set current page', () => {
        pager.selectPage(30);
        expect(pager.myPage).toEqual(1);

        pager.selectPage(0);
        expect(pager.myPage).toEqual(1);
      });

      it('should not emit change event', () => {
        spyOn((pager as any).change, 'emit');
        pager.selectPage(30);
        expect((pager as any).change.emit).not.toHaveBeenCalled();
      });
    });
  });

  describe('calcPages()', () => {
    beforeEach(async () => {
      pager.size = 10;
      pager.count = 73;
      pager.page = 1;
      await pager.$nextTick();
    });

    it('should return array with max 5 pages to display', () => {
      const pages = pager.calcPages(1);
      expect(pages.length).toEqual(5);
      expect(pages[0].number).toEqual(1);
      expect(pages[4].number).toEqual(5);
    });

    it('should return array with available pages to display', async () => {
      pager.count = 30;
      await pager.$nextTick();
      const pages = pager.calcPages(1);
      expect(pages.length).toEqual(3);
      expect(pages[0].number).toEqual(1);
      expect(pages[2].number).toEqual(3);
    });

    xit('should return array containing specified page', () => {
      const pages = pager.calcPages(6);
      expect(pages.length).toEqual(3);
      expect(pages[0].number).toEqual(6);
      expect(pages[2].number).toEqual(8);
    });

    xit('should use current page if no page is specified', () => {
      pager.page = 7;
      const pages = pager.calcPages();
      expect(pages.length).toEqual(3);
      expect(pages[0].number).toEqual(6);
      expect(pages[2].number).toEqual(8);
    });

    xit('should return empty array if specified page does not exist', () => {
      const pages = pager.calcPages(16);
      expect(pages.length).toEqual(0);
    });
  });
});
