import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { SortType, SelectionType, SortDirection, ISortPropDir, ISortEvent } from '../../types';
import { columnsByPin, columnGroupWidths, columnsByPinArr, translateXY } from '../../utils';
import DataTableHeaderCellComponent from './header-cell.component';
import ResizeableDirective from '../../directives/resizeable.directive';
import LongPressDirective from '../../directives/long-press.directive';
import DraggableDirective from '../../directives/draggable.directive';

@Component({
  components: {
    'datatable-header-cell': DataTableHeaderCellComponent,
  },
  directives: {
    resizeable: ResizeableDirective,
    'long-press': LongPressDirective,
    dragndrop: DraggableDirective,

  },
  template: `
    <div :style="styleObject" class="datatable-header-inner">
      <div v-for="colGroup of columnsByPin" :key="colGroup.type"
        :class="['datatable-row-' + colGroup.type]"
        :style="styleByGroup[colGroup.type]">
        <datatable-header-cell class="datatable-header-cell"
          v-for="column of colGroup.columns" :key="column.$$id"
          v-resizeable="{ resizeEnabled: column.resizeable }"
          v-long-press="{pressModel: column, pressEnabled: reorderable && column.draggable}"
          v-dragndrop="{dragEventTarget:dragEventTarget,dragModel:column,dragX:isEnableDragX(column),dragY:false}"
          @resize="onColumnResized($event, column)"
          @longPressStart="onLongPressStart($event, column)"
          @longPressEnd="onLongPressEnd($event, column)"
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
          @sort="onSort($event)"
          @select="$emit('select')"
          @columnContextmenu="$emit('columnContextmenu', $event)"
          @header-cell-mounted="onHeaderCellMounted(column, $event)"
          @dragStart="onDragStart"
          @dragEnd="onDragEnd"
          @dragging="onDragging">
        </datatable-header-cell>
      </div>
    </div>
  `,
})
export default class DataTableHeaderComponent extends Vue {

  @Prop() sortAscendingIcon: any;
  @Prop() sortDescendingIcon: any;
  @Prop() scrollbarWidth: number;
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

  // non-reactive props
  positions: any;
  lastDraggingIndex: number;
  draggables: any[];
  dragging = false;

  @Watch('innerWidth', { immediate: true }) onChangedInnerWidth() {
    if (this.columns) {    
      const colByPin = columnsByPin(this.columns);
      this.columnGroupWidths = columnGroupWidths(colByPin, this.columns, this.innerWidth);
      this.setStylesByGroup();
    }
  }
 
  // @HostBinding('style.height')
  @Watch('headerHeight', { immediate: true }) onHeaderHeightChanged() {
    if (this.headerHeight !== 'auto') {
      this.myHeaderHeight = `${this.headerHeight}px`;
    } else {
      this.myHeaderHeight = this.headerHeight;
    }
  }

  @Watch('columns', { immediate: true }) onColumnsChanged() {
    const colsByPin = columnsByPin(this.columns);
    this.columnsByPin = columnsByPinArr(this.columns);
    this.columnGroupWidths = columnGroupWidths(colsByPin, this.columns, this.innerWidth);
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

  isEnableDragX(column) {
    return this.reorderable && column.draggable && column.dragging;
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
    const event: ISortEvent = {
      sorts,
      column,
      prevValue,
      newValue
    };
    this.$emit('sort', event);
  }

  calcNewSorts(column: any, prevValue: SortDirection, newValue: SortDirection): ISortPropDir[] {
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
      let offset = totalDiff * -1;
      if (this.scrollbarWidth !== undefined && this.scrollbarWidth !== null) {
        offset -= this.scrollbarWidth;
      }
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

  onHeaderCellMounted(column, element) {
    if (!this.draggables) {
      this.draggables = [];
    }
    this.draggables.push({ dragModel: column, element });
  }

  onDragStart(): void {
    if (this.dragging) {
      return;
    }
    this.dragging = true;

    this.positions = {};

    let i = 0;
    this.draggables.sort((a, b) => {
      const left = parseInt(a.element.offsetLeft.toString(), 0);
      const left1 = parseInt(b.element.offsetLeft.toString(), 0);
      return left - left1;
    });
    for (const dragger of this.draggables) {
      const elm = dragger.element;
      const left = parseInt(elm.offsetLeft.toString(), 0);
      const width = elm.offsetWidth;
      if (width) {
        this.positions[dragger.dragModel.prop] = {
          left,
          right: left + parseInt(width.toString(), 0),
          index: i++,
          element: elm
        };
      }
    }
  }

  onDragging({ element, model, event }: any): void {
    const prevPos = this.positions[ model.prop ];    
    const target = this.isTarget(model, event);

    if (target) {
      if (this.lastDraggingIndex !== target.i) {
        this.onTargetChanged({
          prevIndex: this.lastDraggingIndex,
          newIndex: target.i,
          initialIndex: prevPos.index
        });
        this.lastDraggingIndex = target.i;
      } 
    } else if (this.lastDraggingIndex !== prevPos.index) {
      this.onTargetChanged({
        prevIndex: this.lastDraggingIndex,
        initialIndex: prevPos.index
      });
      this.lastDraggingIndex = prevPos.index;
    }
  }

  onDragEnd({ element, model, event }: any): void {
    this.dragging = false;
    const prevPos = this.columns.findIndex(col => col.prop === model.prop); // this.positions[model.prop];

    const target = this.isTarget(model, event);
    if (target) {
      this.onColumnReordered({
        prevIndex: prevPos,
        newIndex: this.columns.findIndex(col => col.prop === target.prop), // target.i,
        model
      });
    }
    this.lastDraggingIndex = undefined;
    element.style.left = 'auto';
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

  isTarget(model: any, event: any): any {
    let i = 0;
    const x = event.x || event.clientX;
    const y = event.y || event.clientY;
    const targets = document.elementsFromPoint(x, y);

    for (const prop in this.positions) {
      // current column position which throws event.
      const pos = this.positions[ prop ];

      // since we drag the inner span, we need to find it in the elements at the cursor
      if (model.prop !== prop && targets.find((el: any) => el === pos.element)) {
        return {
          prop,
          pos,
          i
        };
      }

      i++;
    }
  }

}
