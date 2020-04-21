import { Vue, Prop, Component } from 'vue-property-decorator';
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
  @Prop() row: any;
  @Prop() groupRowsBy: any[];
  @Prop() rowIndex: number;
  @Prop() expanded: boolean;
  @Prop() styleObject: any;
  @Prop() groupHeaderSlot: any;
  @Prop() rowDetailSlot: any;

  onContextmenu($event: MouseEvent): void {
    this.$emit('rowContextmenu', { event: $event, row: this.row });
  }

  get groupHeaderStyles(): Record<string, string> {
    const styles = {};
    styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
    styles['backface-visibility'] = 'hidden';
    styles['width'] = this.innerWidth;
    styles['height'] = this.groupRowHeight ? this.groupRowHeight + 'px' : 'auto';
    return styles; 
  }
}
