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
  @Prop() parent: any;
  @Prop() innerWidth: number;
  @Prop() rowDetail: boolean;
  @Prop() groupHeader: boolean;
  @Prop() groupLevel: number;
  @Prop() offsetX: number;
  @Prop() rowDetailHeight: number;
  @Prop() groupRowHeight: number;
  @Prop() row: any;
  // @Prop() groupedRows: any[];  
  @Prop() groupRowsBy: any[];
  @Prop() rowIndex: number;
  @Prop() expanded: boolean;
  @Prop() styleObject: any;
  @Prop() groupHeaderSlot: any;
  @Prop() rowDetailSlot: any;

  created() {
    // if (IS_DEV) {
    //   console.log('DataTableRowWrapperComponent1 is created');
    // }
  }

  // groupContext: any = {
  //   group: this.row,
  //   expanded: this.expanded,
  //   rowIndex: this.rowIndex
  // };

  // rowContext: any = {
  //   row: this.row,
  //   expanded: this.expanded,
  //   rowIndex: this.rowIndex
  // };

  // mounted() {
  //   this.rowContext.row = this.row;
  //   this.rowContext.rowIndex = this.rowIndex;
  //   this.rowContext.expanded = this.expanded;
  //   this.groupContext.row = this.row;
  //   this.groupContext.rowIndex = this.rowIndex;
  //   this.groupContext.expanded = this.expanded;
  // }

  // @Watch('row') onRowChanged() {
  //   this.rowContext.row = this.row;
  //   this.groupContext.row = this.row;
  // }

  // @Watch('rowIndex') onRowIndexChanged() {
  //   this.rowContext.rowIndex = this.rowIndex;
  //   this.groupContext.rowIndex = this.rowIndex;
  // }

  // @Watch('expanded') onExpandedChanged() {
  //   this.groupContext.expanded = this.expanded;
  //   this.rowContext.expanded = this.expanded;
  // }

  onContextmenu($event: MouseEvent): void {
    this.$emit('rowContextmenu', { event: $event, row: this.row });
  }

  get groupHeaderStyles(): any {
    const styles = {};
    styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
    styles['backface-visibility'] = 'hidden';
    styles['width'] = this.innerWidth;
    styles['height'] = this.groupRowHeight ? this.groupRowHeight + 'px' : 'auto';
    return styles; 
  }
}
