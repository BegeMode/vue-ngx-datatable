/* eslint-disable @typescript-eslint/no-floating-promises */
import { mount, Wrapper } from '@vue/test-utils';
import * as flushPromises from 'flush-promises';
import Vue from 'vue';
import DataTablePagerComponent, { IPage } from './pager.component';

describe('DataTablePagerComponent', () => {
  let wrapper: Wrapper<DataTablePagerComponent>;
  let pager: DataTablePagerComponent;
  // let element;

  beforeEach(async () => {
    wrapper = mount(DataTablePagerComponent, { sync: false });
    // await Vue.nextTick();
    await flushPromises();
    pager = wrapper.vm;
    // element = pager.$el;
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
      wrapper.setProps({
        size: 10,
        count: 28,
      });
      await pager.$nextTick();
      expect(pager.totalPages).toEqual(3);
    });

    it('should have 1 page if size is 0', async () => {
      wrapper.setProps({
        size: 0,
        count: 28,
      });
      await pager.$nextTick();
      expect(pager.totalPages).toEqual(1);
    });

    it('should have 1 page if count is 0', async () => {
      wrapper.setProps({
        size: 10,
        count: 0,
      });
      await pager.$nextTick();
      expect(pager.totalPages).toEqual(1);
    });
  });

  describe('canPrevious', () => {
    beforeEach(async () => {
      wrapper.setProps({
        size: 10,
        count: 100,
      });
      await pager.$nextTick();
    });

    it('should return true if not on first page', async () => {
      wrapper.setProps({
        page: 2,
      });
      await pager.$nextTick();
      expect(pager.canPrevious).toEqual(true);
    });

    it('should return false if on first page', async () => {
      wrapper.setProps({
        page: 1,
      });
      await pager.$nextTick();
      expect(pager.canPrevious).toEqual(false);
    });
  });

  describe('canNext', () => {
    beforeEach(async () => {
      wrapper.setProps({
        size: 10,
        count: 100,
      });
      await pager.$nextTick();
    });

    it('should return true if not on last page', async () => {
      wrapper.setProps({
        page: 2,
      });
      await pager.$nextTick();
      expect(pager.canNext).toEqual(true);
    });

    it('should return false if on last page', async () => {
      wrapper.setProps({
        page: 10,
      });
      await pager.$nextTick();
      expect(pager.canNext).toEqual(false);
    });
  });

  describe('prevPage()', () => {
    beforeEach(async () => {
      wrapper.setProps({
        size: 10,
        count: 100,
      });
      await pager.$nextTick();
    });

    it('should set current page to previous page', async () => {
      wrapper.setProps({
        page: 2,
      });
      await pager.$nextTick();
      pager.prevPage();
      expect(pager.myPage).toEqual(1);
    });

    it('should emit change event', async () => {
      const spy = spyOn(pager, '$emit');
      wrapper.setProps({
        page: 2,
      });
      await pager.$nextTick();
      pager.prevPage();
      await pager.$nextTick();
      expect(spy).toHaveBeenCalledWith('change-page', { page: 1 });
    });

    it('should not change page if already on first page', async () => {
      wrapper.setProps({
        page: 2,
      });
      await pager.$nextTick();
      pager.prevPage();
      await pager.$nextTick();
      expect(pager.myPage).toEqual(1);
    });
  });

  describe('nextPage()', () => {
    beforeEach(async () => {
      wrapper.setProps({
        size: 10,
        count: 100,
      });
      await pager.$nextTick();
    });

    it('should set current page to next page', async () => {
      wrapper.setProps({
        page: 2,
      });
      await pager.$nextTick();
      pager.nextPage();
      await pager.$nextTick();
      expect(pager.myPage).toEqual(3);
    });

    it('should emit change event', async () => {
      wrapper.setProps({
        page: 2,
      });
      await pager.$nextTick();
      const spy = spyOn(pager, '$emit');
      pager.nextPage();
      await pager.$nextTick();
      expect(spy).toHaveBeenCalledWith('change-page', { page: 3 });
    });

    it('should not change page if already on last page', async () => {
      wrapper.setProps({
        page: 10,
      });
      await pager.$nextTick();
      pager.nextPage();
      await pager.$nextTick();
      expect(pager.page).toEqual(10);
    });
  });

  describe('selectPage()', () => {
    beforeEach(async () => {
      wrapper.setProps({
        size: 10,
        count: 100,
        page: 1,
      });
      await pager.$nextTick();
    });

    describe('with a new page', () => {
      it('should set current page', () => {
        pager.selectPage(3);
        expect(pager.myPage).toEqual(3);
      });

      it('should emit change event', () => {
        const spy = spyOn(pager, '$emit');
        pager.selectPage(3);
        expect(spy).toHaveBeenCalledWith('change-page', { page: 3 });
      });
    });

    describe('with the current page777777', () => {
      it('should not emit change event', () => {
        const spy = spyOn(pager, '$emit');
        pager.selectPage(pager.page);
        expect(spy.calls.count()).toEqual(0);
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
        const spy = spyOn(pager, '$emit');
        pager.selectPage(30);
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('calcPages()', () => {
    beforeEach(async () => {
      wrapper.setProps({
        size: 10,
        count: 73,
        page: 1,
      });
      await pager.$nextTick();
    });

    it('should return array with max 5 pages to display', () => {
      const pages: IPage[] = pager.calcPages(1);
      expect(pages.length).toEqual(5);
      expect(pages[0].number).toEqual(1);
      expect(pages[4].number).toEqual(5);
    });

    it('should return array with available pages to display', async () => {
      wrapper.setProps({
        count: 30,
      });
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
      wrapper.setProps({
        page: 7,
      });
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
