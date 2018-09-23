import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { SortType, SelectionType } from '../../types';
import { columnsByPin, columnGroupWidths, columnsByPinArr, translateXY } from '../../utils';
import DataTableHeaderCellComponent from './header-cell.component';

@Component({
  components: {
    'datatable-header-cell': DataTableHeaderCellComponent,
  },
  template: `
    <div
      orderable
      @reorder="onColumnReordered"
      @targetChanged="onTargetChanged"
      :style="styleObject"
      class="datatable-header-inner">
      <div
        v-for="colGroup of columnsByPin" :key="colGroup.type"
        :class="['datatable-row-' + colGroup.type]"
        :style="styleByGroup[colGroup.type]">
        <datatable-header-cell class="datatable-header-cell"
          v-for="column of colGroup.columns" :key="column.$$id"
          resizeable
          :resizeEnabled="column.resizeable"
          @resize="onColumnResized($event, column)"
          long-press
          :pressModel="column"
          :pressEnabled="reorderable && column.draggable"
          @longPressStart="onLongPressStart"
          @longPressEnd="onLongPressEnd"
          draggable
          :dragX="reorderable && column.draggable && column.dragging"
          :dragY="false"
          :dragModel="column"
          :dragEventTarget="dragEventTarget"
          :headerHeight="headerHeight"
          :isTarget="column.isTarget"
          :targetMarkerTemplate="targetMarkerTemplate"
          :targetMarkerContext="column.targetMarkerContext"
          :column="column"
          :sortType="sortType"
          :sorts="sorts"
          :selectionType="selectionType"
          :sortAscendingIcon="sortAscendingIcon"
          :sortDescendingIcon="sortDescendingIcon"
          :allRowsSelected="allRowsSelected"
          @sort="onSort"
          @select="$emit('select')"
          @columnContextmenu="$emit('columnContextmenu')">
          <slot>
          </slot>
        </datatable-header-cell>
      </div>
    </div>
  `,
})
export default class DataTableHeaderComponent extends Vue {

  @Prop() sortAscendingIcon: any;
  @Prop() sortDescendingIcon: any;
  @Prop() scrollbarH: boolean;
  @Prop() dealsWithGroup: boolean;
  @Prop() targetMarkerTemplate: any;
  @Prop() innerWidth: number;
  @Prop() sorts: any[];
  @Prop() sortType: SortType;
  @Prop() allRowsSelected: boolean;
  @Prop() selectionType: SelectionType;
  @Prop() reorderable: boolean;
  @Prop() headerHeight: any;
  @Prop() columns: any[];
  @Prop() offsetX: number;
  
  columnsByPin: any = null;
  columnGroupWidths: any = null;
  myHeaderHeight: string = 'auto';
  styleByGroup = {
    left: {},
    center: {},
    right: {}
  };
  targetMarkerContext: any = null;
  dragEventTarget: any = null;

  @Watch('innerWidth', { immediate: true }) onChangedInnerWidth() {
    if (this.columns) {    
      const colByPin = columnsByPin(this.columns);
      this.columnGroupWidths = columnGroupWidths(colByPin, this.columns);
      this.setStylesByGroup();
    }
  }
 
  // @HostBinding('style.height')
  @Watch('headerHeight') onHeaderHeightChanged() {
    if (this.headerHeight !== 'auto') {
      this.myHeaderHeight = `${this.headerHeight}px`;
    } else {
      this.myHeaderHeight = this.headerHeight;
    }
  }

  @Watch('columns', { immediate: true }) onColumnsChanged() {
    const colsByPin = columnsByPin(this.columns);
    this.columnsByPin = columnsByPinArr(this.columns);
    this.columnGroupWidths = columnGroupWidths(colsByPin, this.columns);
    this.setStylesByGroup();
  }

  @Watch('offsetX') onOffsetXChanged() {
    this.setStylesByGroup();
  }

  // @Output() sort: EventEmitter<any> = new EventEmitter();
  // @Output() reorder: EventEmitter<any> = new EventEmitter();
  // @Output() resize: EventEmitter<any> = new EventEmitter();
  // @Output() select: EventEmitter<any> = new EventEmitter();
  // @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent, column: any }>(false);

  onLongPressStart({ event, model }: { event: any, model: any }) {
    model.dragging = true;
    this.dragEventTarget = event;
  }

  onLongPressEnd({ event, model }: { event: any, model: any }) {
    this.dragEventTarget = event;

    // delay resetting so sort can be
    // prevented if we were dragging
    setTimeout(() => {   
      // datatable component creates copies from columns on reorder
      // set dragging to false on new objects
      const column = this.columns.find(c => c.$$id === model.$$id);
      if (column) {
        column.dragging = false;
      }
    }, 5);
  }

  // @HostBinding('style.width')
  get headerWidth(): string {
    if (this.scrollbarH) {
      return this.innerWidth + 'px';
    }
    return '100%';
  }

  // trackByGroups(colGroup: any): any {    
  //   return colGroup.type;
  // }

  // columnTrackingFn(column: any): any {
  //   return column.$$id;
  // }

  onColumnResized(width: number, column: any): void { // column: DataTableColumnDirective
    if (width <= column.minWidth) {
      width = column.minWidth;
    } else if (width >= column.maxWidth) {
      width = column.maxWidth;
    }

    this.$emit('resize', {
      column,
      prevValue: column.width,
      newValue: width
    });
  }

  onColumnReordered({ prevIndex, newIndex, model }: any): void {
    const column = this.getColumn(newIndex);
    column.isTarget = false;
    column.targetMarkerContext = undefined;
    this.$emit('reorder', {
      column: model,
      prevValue: prevIndex,
      newValue: newIndex
    });
  }

  onTargetChanged({ prevIndex, newIndex, initialIndex }: any): void {
    if (prevIndex || prevIndex === 0) {
      const oldColumn = this.getColumn(prevIndex);
      oldColumn.isTarget = false;
      oldColumn.targetMarkerContext = undefined;
    }
    if (newIndex || newIndex === 0) {
      const newColumn = this.getColumn(newIndex);
      newColumn.isTarget = true;
      
      if (initialIndex !== newIndex) {
        newColumn.targetMarkerContext = {class: 'targetMarker '.concat( 
          initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft')};
      }
    }
  }

  getColumn(index: number): any {
    const leftColumnCount = this.columnsByPin[0].columns.length;
    if (index < leftColumnCount) {
      return this.columnsByPin[0].columns[index];
    }

    const centerColumnCount = this.columnsByPin[1].columns.length;
    if (index < leftColumnCount + centerColumnCount) {
      return this.columnsByPin[1].columns[index - leftColumnCount];
    }

    return this.columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
  }

  onSort({ column, prevValue, newValue }: any): void {
    // if we are dragging don't sort!
    if (column.dragging) return;

    const sorts = this.calcNewSorts(column, prevValue, newValue);
    this.$emit('sort', {
      sorts,
      column,
      prevValue,
      newValue
    });
  }

  calcNewSorts(column: any, prevValue: number, newValue: number): any[] {
    let idx = 0;

    if (!this.sorts) {
      this.sorts = [];
    }

    const sorts = this.sorts.map((s, i) => {
      s = { ...s };
      if (s.prop === column.prop) idx = i;
      return s;
    });

    if (newValue === undefined) {
      sorts.splice(idx, 1);
    } else if (prevValue) {
      sorts[idx].dir = newValue;
    } else {
      if (this.sortType === SortType.single) {
        sorts.splice(0, this.sorts.length);
      }

      sorts.push({ dir: newValue, prop: column.prop });
    }

    return sorts;
  }

  setStylesByGroup() {
    this.styleByGroup['left'] = this.calcStylesByGroup('left');
    this.styleByGroup['center'] = this.calcStylesByGroup('center');
    this.styleByGroup['right'] = this.calcStylesByGroup('right');
  }

  calcStylesByGroup(group: string): any {
    const widths = this.columnGroupWidths;
    const offsetX = this.offsetX;

    const styles = {
      width: `${widths[group]}px`
    };

    if (group === 'center') {
      translateXY(styles, offsetX * -1, 0);
    } else if (group === 'right') {
      const totalDiff = widths.total - this.innerWidth;
      const offset = totalDiff * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

  styleForGroup(group: any) {
    return this.styleByGroup[group.type];
  }

  get styleObject() {
    return {
      width: this.headerWidth ? this.headerWidth : this.columnGroupWidths.total + 'px',
      height: this.myHeaderHeight,
    };
  }
}
