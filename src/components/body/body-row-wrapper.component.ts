import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  template: `
    <div v-if="groupHeader && groupHeader.template"
      class="datatable-group-header" @contextmenu="onContextmenu"
      :style="getGroupHeaderStyle">
      <!-- <template
        v-if="groupHeader && groupHeader.template"
        :templateOutlet="groupHeader.template"
        :templateOutletContext="groupContext">
      </template> -->
    </div>
    <div v-else-if="(groupHeader && groupHeader.template && expanded) || 
        (!groupHeader || !groupHeader.template)">
      <slot></slot>
    </div>
    <div v-else-if="rowDetail && rowDetail.template && expanded"
      :style="{'height': detailRowHeight + 'px'}" class="datatable-row-detail">
      <!-- <template
        v-if="rowDetail && rowDetail.template"
        :templateOutlet="rowDetail.template"
        :templateOutletContext="rowContext">
      </template> -->
    </div>
  `,
})
export default class DataTableRowWrapperComponent extends Vue {

  @Prop() innerWidth: number;
  @Prop() rowDetail: any;
  @Prop() groupHeader: any;
  @Prop() offsetX: number;
  @Prop() detailRowHeight: any;
  @Prop() row: any;
  @Prop() groupedRows: any;  
  @Prop() rowIndex: number;
  @Prop() expanded: boolean;
  // @Output() rowContextmenu = new EventEmitter<{event: MouseEvent, row: any}>(false);

  groupContext: any = {
    group: this.row,
    expanded: this.expanded,
    rowIndex: this.rowIndex
  };

  rowContext: any = {
    row: this.row,
    expanded: this.expanded,
    rowIndex: this.rowIndex
  };

  @Watch('row') onRowChanged() {
    this.rowContext.row = this.row;
    this.groupContext.row = this.row;
  }

  @Watch('rowIndex') onRowIndexChanged() {
    this.rowContext.rowIndex = this.rowIndex;
    this.groupContext.rowIndex = this.rowIndex;
  }

  @Watch('expanded') onExpandedChanged() {
    this.groupContext.expanded = this.expanded;
    this.rowContext.expanded = this.expanded;
  }

  onContextmenu($event: MouseEvent): void {
    this.$emit('rowContextmenu', { event: $event, row: this.row });
  }

  getGroupHeaderStyle(): any {
    const styles = {};

    styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
    styles['backface-visibility'] = 'hidden';
    styles['width'] = this.innerWidth;

    return styles; 
  }
}
