/* eslint-disable max-classes-per-file */
import { mount, Wrapper } from '@vue/test-utils';
import * as flushPromises from 'flush-promises';
import Vue, { VueConstructor } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { addMatchers } from '../../../test';
import DataTableFooterComponent from './footer.component';
import DataTablePagerComponent from './pager.component';

let wrapper: Wrapper<TestFixtureComponent>;
let component: TestFixtureComponent;

describe('DataTableFooterComponent', () => {
  beforeAll(addMatchers);

  describe('div.datatable-footer-inner', () => {
    beforeEach(async () => {
      await setupTest(TestFixtureComponent);
    });

    it('should have a height', async () => {
      await wrapper.setProps({
        footerHeight: 123,
      });
      await component.$nextTick();
      const footer = wrapper.findComponent(DataTableFooterComponent);
      void expect((footer.vm.$el as HTMLElement).style.height).toEqual('123px');
    });

    it('should have `.selected-count` class when selectedMessage is set', async () => {
      await wrapper.setProps({
        selectedMessage: 'selected',
        selectedCount: 1,
      });
      await component.$nextTick();
      const footer = wrapper.findComponent(DataTableFooterComponent);
      expect(footer.vm.$el).toHaveCssClass('selected-count');
    });

    it('should not have `.selected-count` class if selectedMessage is not set', async () => {
      await wrapper.setProps({
        selectedMessage: null,
        selectedCount: 1,
      });
      await component.$nextTick();
      const footer = wrapper.findComponent(DataTableFooterComponent);
      expect(footer.vm.$el).not.toHaveCssClass('selected-count');
    });
  });

  describe('when there is no template', () => {
    beforeEach(async () => {
      await setupTest(TestFixtureComponent);
    });

    it('should not render a template', () => {
      const footer = wrapper.findComponent(DataTableFooterComponent);
      void expect(footer.vm.$el.querySelector('#template-list')).toBeNull();
    });

    it('should display the selected count and total if selectedMessage set', async () => {
      await wrapper.setProps({
        selectedMessage: 'selected',
        selectedCount: 7,
        rowCount: 10,
        totalMessage: 'total',
      });
      await component.$nextTick();
      const footer = wrapper.findComponent(DataTableFooterComponent);
      void expect((footer.vm.$el as HTMLElement).innerText).toContain('7 selected /');
      void expect((footer.vm.$el as HTMLElement).innerText).toContain('10 total');
    });

    it('should display only the total if selectedMessage is not set', async () => {
      await wrapper.setProps({
        selectedMessage: null,
        rowCount: 100,
        totalMessage: 'total',
      });
      await component.$nextTick();
      const footer = wrapper.findComponent(DataTableFooterComponent);
      void expect((footer.vm.$el as HTMLElement).innerText).not.toContain('selected /');
      void expect((footer.vm.$el as HTMLElement).innerText).toContain('100 total');
    });

    it('should render a DataTablePagerComponent', () => {
      const pager = wrapper.findComponent(DataTablePagerComponent);
      void expect(pager).not.toBeNull();
      void expect(pager.vm).not.toBeNull();
    });

    it('should propagate page change events upward from the DataTablePagerComponent', async () => {
      const spy = spyOn(component, 'onPageEvent');
      const pageChangeEvent = { page: 7 };
      const pager = wrapper.findComponent(DataTablePagerComponent);
      // mimic the act of changing the page through the datatable pager
      pager.vm.$emit('change-page', pageChangeEvent);
      await component.$nextTick();

      expect(spy).toHaveBeenCalledWith(pageChangeEvent);
    });

    it('should bind to DataTablePagerComponent pagerLeftArrowIcon input', async () => {
      await wrapper.setProps({
        pagerLeftArrowIcon: 'pager-left-arrow-icon',
      });

      await component.$nextTick();

      const pager = wrapper.findComponent(DataTablePagerComponent);
      void expect((pager.vm as DataTablePagerComponent).pagerLeftArrowIcon).toBe(component.pagerLeftArrowIcon);
    });

    it('should bind to DataTablePagerComponent pagerRightArrowIcon input', async () => {
      await wrapper.setProps({
        pagerRightArrowIcon: 'pager-right-arrow-icon',
      });
      await component.$nextTick();

      const pager = wrapper.findComponent(DataTablePagerComponent);
      void expect((pager.vm as DataTablePagerComponent).pagerRightArrowIcon).toBe(component.pagerRightArrowIcon);
    });

    it('should bind to DataTablePagerComponent pagerNextIcon input', async () => {
      await wrapper.setProps({
        pagerNextIcon: 'pager-next-icon',
      });
      await component.$nextTick();

      const pager = wrapper.findComponent(DataTablePagerComponent);
      void expect((pager.vm as DataTablePagerComponent).pagerNextIcon).toBe(component.pagerNextIcon);
    });

    it('should bind to DataTablePagerComponent pagerPreviousIcon input', async () => {
      await wrapper.setProps({
        pagerPreviousIcon: 'pager-previous-icon',
      });
      await component.$nextTick();

      const pager = wrapper.findComponent(DataTablePagerComponent);
      void expect((pager.vm as DataTablePagerComponent).pagerPreviousIcon).toBe(component.pagerPreviousIcon);
    });

    it('should bind to DataTablePagerComponent size input', async () => {
      await wrapper.setProps({
        pageSize: 4,
      });
      await component.$nextTick();

      const pager = wrapper.findComponent(DataTablePagerComponent);
      void expect((pager.vm as DataTablePagerComponent).size).toBe(component.pageSize);
    });

    it('should bind to DataTablePagerComponent count input', async () => {
      await wrapper.setProps({
        pageSize: 4,
      });
      await component.$nextTick();
      const pager = wrapper.findComponent(DataTablePagerComponent);
      void expect((pager.vm as DataTablePagerComponent).count).toBe(component.rowCount);
    });

    it('should bind to DataTablePagerComponent page input', async () => {
      await wrapper.setProps({
        offset: 200,
      });
      await component.$nextTick();
      const pager = wrapper.findComponent(DataTablePagerComponent);
      void expect((pager.vm as DataTablePagerComponent).page).toBe(201);
    });

    it('should show & hide the DataTablePagerComponent', async () => {
      await wrapper.setProps({
        rowCount: 200,
        pageSize: 5,
      });
      await component.$nextTick();
      const pager = wrapper.findComponent(DataTablePagerComponent);
      void expect((pager.vm.$el as HTMLElement).hidden).toBe(false, 'DataTablePagerComponent should be hidden');

      await wrapper.setProps({
        rowCount: 1,
        pageSize: 2,
      });
      await component.$nextTick();
      void expect((pager.vm.$el as HTMLElement).hidden).toBe(true, 'DataTablePagerComponent should not be hidden');
    });
  });

  describe('when there is a template', () => {
    beforeEach(async () => {
      await setupTest(TestFixtureTemplateComponent);
    });

    it('should not render div.page-count or DatatablePagerComponent', async () => {
      const footer = wrapper.findComponent(DataTableFooterComponent);
      footer.vm.$forceUpdate();
      await footer.vm.$nextTick();
      void expect((footer.vm.$el as HTMLElement).querySelector('.page-count')).toBeNull();
    });

    it('should render the template', async () => {
      const footer = wrapper.findComponent(DataTableFooterComponent);
      footer.vm.$forceUpdate();
      await footer.vm.$nextTick();

      void expect(footer.find('#template-list')).not.toBeNull();
    });

    it('should give the template proper context', async () => {
      await wrapper.setProps({
        rowCount: 12,
        pageSize: 1,
        selectedCount: 4,
        offset: 0,
      });
      await component.$nextTick();
      const footer = wrapper.findComponent(DataTableFooterComponent);
      footer.vm.$forceUpdate();
      await footer.vm.$nextTick();

      const listItems = footer.find('#template-list').element.querySelectorAll('li');

      expect(listItems[0]).toHaveText('rowCount 12');
      expect(listItems[1]).toHaveText('pageSize 1');
      expect(listItems[2]).toHaveText('selectedCount 4');
      expect(listItems[3]).toHaveText('curPage 1');
      expect(listItems[4]).toHaveText('offset 0');
    });
  });
});

/**
 * we test DatatableFooterComponent by embedding it in a
 * test host component
 */
@Component({
  components: {
    'datatable-footer': DataTableFooterComponent,
  },
  template: `
    <div>
      <datatable-footer
        :rowCount="rowCount"
        :pageSize="pageSize"
        :offset="offset"
        :footerHeight="footerHeight"
        :totalMessage="totalMessage"
        :pagerLeftArrowIcon="pagerLeftArrowIcon"
        :pagerRightArrowIcon="pagerRightArrowIcon"
        :pagerPreviousIcon="pagerPreviousIcon"
        :selectedCount="selectedCount"
        :selectedMessage="selectedMessage"
        :pagerNextIcon="pagerNextIcon"
        :footerSlot="footerSlot"
        @page="onPageEvent($event)"
      >
      </datatable-footer>
      <slot name="footer"></slot>
    </div>
  `,
})
class TestFixtureComponent extends Vue {
  @Prop({ type: Number, default: 0 }) footerHeight = 0;
  @Prop({ type: Number, default: 100 }) rowCount;
  @Prop({ type: Number, default: 1 }) pageSize;
  @Prop({ type: Number, default: 0 }) offset;
  @Prop({ type: String, default: '' }) pagerLeftArrowIcon: string;
  @Prop({ type: String, default: '' }) pagerRightArrowIcon: string;
  @Prop({ type: String, default: '' }) pagerPreviousIcon: string;
  @Prop({ type: String, default: '' }) pagerNextIcon: string;
  @Prop({ type: String, default: '' }) totalMessage: string;
  @Prop({ type: Number, default: 0 }) selectedCount: number;
  @Prop({ type: String, default: '' }) selectedMessage: string;

  footerSlot: any = null;

  mounted() {
    this.footerSlot = this.$scopedSlots.footer || this.$slots.footer;
    // if (this.footerSlot) {
    //   console.log(this.footerSlot);
    // }
  }

  onPageEvent() {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

@Component({
  components: {
    fixture: TestFixtureComponent,
  },
  template: `
    <div>
      <fixture
        :rowCount="rowCount"
        :pageSize="pageSize"
        :offset="offset"
        :footerHeight="footerHeight"
        :totalMessage="totalMessage"
        :pagerLeftArrowIcon="pagerLeftArrowIcon"
        :pagerRightArrowIcon="pagerRightArrowIcon"
        :pagerPreviousIcon="pagerPreviousIcon"
        :selectedCount="selectedCount"
        :selectedMessage="selectedMessage"
        :pagerNextIcon="pagerNextIcon"
      >
        <template v-slot:footer="scope">
          <ul v-if="scope" id="template-list">
            <li>rowCount {{ scope.rowCount }}</li>
            <li>pageSize {{ scope.pageSize }}</li>
            <li>selectedCount {{ scope.selectedCount }}</li>
            <li>curPage {{ scope.curPage }}</li>
            <li>offset {{ scope.offset }}</li>
          </ul>
        </template>
      </fixture>
    </div>
  `,
})
class TestFixtureTemplateComponent extends Vue {
  @Prop({ type: Number, default: 0 }) footerHeight = 0;
  @Prop({ type: Number, default: 100 }) rowCount;
  @Prop({ type: Number, default: 1 }) pageSize;
  @Prop({ type: Number, default: 0 }) offset;
  @Prop({ type: String, default: '' }) pagerLeftArrowIcon: string;
  @Prop({ type: String, default: '' }) pagerRightArrowIcon: string;
  @Prop({ type: String, default: '' }) pagerPreviousIcon: string;
  @Prop({ type: String, default: '' }) pagerNextIcon: string;
  @Prop({ type: String, default: '' }) totalMessage: string;
  @Prop({ type: Number, default: 0 }) selectedCount: number;
  @Prop({ type: String, default: '' }) selectedMessage: string;
}

async function setupTest(componentClass: VueConstructor) {
  try {
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
