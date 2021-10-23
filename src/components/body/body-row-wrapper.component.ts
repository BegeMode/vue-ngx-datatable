import { TGroupByField } from 'components/datatable.component';
import { VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import DataTableBodyGroupHeaderComponent from './body-group-header.component';
import DataTableBodyRowDetailComponent from './body-row-detail.component';
import DataTableBodyRowComponent from './body-row.component.vue';

@Component({
  name: 'datatable-row-wrapper',
  components: {
    'datatable-group-header': DataTableBodyGroupHeaderComponent,
    'datatable-row-detail': DataTableBodyRowDetailComponent,
    'datatable-body-row': DataTableBodyRowComponent,
  },
})
export default class DataTableRowWrapperComponent extends Vue {
  @Prop() innerWidth: number;
  @Prop() rowDetail: boolean;
  @Prop() groupHeader: boolean;
  @Prop() groupLevel: number;
  @Prop() offsetX: number;
  @Prop() rowDetailHeight: number;
  @Prop() groupRowHeight: number;
  @Prop() groupHeaderStyles: Record<string, string | number>;
  @Prop() groupHeaderClasses: string | Array<string>;
  @Prop() row: Record<string, unknown>;
  @Prop() rowIdentity: (row: Record<string, unknown>) => string | number;
  @Prop() groupRowsBy: Array<TGroupByField | Array<TGroupByField>>;
  @Prop() rowIndex: number;
  @Prop() expanded: boolean;
  @Prop() styleObject: Record<string, string>;
  @Prop() groupHeaderSlot: (obj: Record<string, unknown>) => VNode[];
  @Prop() rowDetailSlot: (obj: Record<string, unknown>) => VNode[];

  mounted(): void {
    this.$emit('set-row-element', this.$el);
  }

  updated(): void {
    this.$emit('set-row-element', this.$el);
  }

  onContextmenu($event: MouseEvent): void {
    this.$emit('rowContextmenu', { event: $event, row: this.row });
  }

  get groupTitleStyles(): Record<string, string | number> {
    const styles = this.groupHeaderStyles ?? {};
    styles['transform'] = `translate3d(${this.offsetX}px, 0px, 0px)'`;
    styles['backface-visibility'] = 'hidden';
    styles['width'] = this.innerWidth || '100%';
    styles['height'] = this.groupRowHeight ? `${this.groupRowHeight}px` : 'auto';
    return styles;
  }

  get rowId(): string | number | null {
    if (!this.row) {
      return null;
    }
    if (this.rowIdentity) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = this.rowIdentity(this.row);
      if (typeof result === 'object') {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result;
    }
    return null;
  }
}
