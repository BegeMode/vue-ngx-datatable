import DraggableDirective from 'directives/draggable.directive';
import LongPressDirective from 'directives/long-press.directive';
import ResizeableDirective from 'directives/resizeable.directive';
import { SelectionType } from 'types/selection.type';
import { SortType } from 'types/sort.type';
import { SortDirection } from 'types/sort-direction.type';
import { ISortEvent, ISortPropDir } from 'types/sort-prop-dir.type';
import { TableColumn } from 'types/table-column.type';
import { IColumnsByPinRecord, IColumnsWidth } from 'utils/column';
import { translateXY } from 'utils/translate';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import DataTableHeaderCellComponent from './header-cell.component';

interface IDragPosition {
  left: number;
  right: number;
  index: number;
  element: HTMLElement;
}

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
      <div
        v-for="colGroup of columnsByPin"
        :key="colGroup.type"
        :class="['datatable-row-' + colGroup.type]"
        :style="styleByGroup[colGroup.type]"
      >
        <template v-for="column of colGroup.columns">
          <datatable-header-cell
            v-if="column.visible"
            :key="column.$$id"
            v-resizeable="{ resizeEnabled: column.resizeable }"
            v-long-press="{pressModel: column, pressEnabled: reorderable && column.draggable}"
            v-dragndrop="{dragEvent:dragEvent,dragModel:column,dragX:isEnableDragX(column),dragY:false}"
            @resize="onColumnResized($event, column)"
            @longPressStart="onLongPressStart($event, column)"
            @longPressEnd="onLongPressEnd($event, column)"
            :headerHeight="headerHeight"
            :isTarget="column.isTarget"
            :targetMarkerContext="column.targetMarkerContext"
            :column="column"
            :sortType="sortType"
            :sorts="sorts"
            :selectionType="selectionType"
            :sortAscendingIcon="sortAscendingIcon"
            :sortDescendingIcon="sortDescendingIcon"
            :allRowsSelected="allRowsSelected"
            @sort="onSort($event)"
            @select="onSelect"
            @columnContextmenu="$emit('columnContextmenu', $event)"
            @header-cell-mounted="onHeaderCellMounted(column, $event)"
            @dragStart="onDragStart"
            @dragEnd="onDragEnd"
            @dragging="onDragging"
            @column-visible-changed="onColumnVisibleChanged($event)"
          >
          </datatable-header-cell>
        </template>
      </div>
    </div>
  `,
})
export default class DataTableHeaderComponent extends Vue {
  @Prop() sortAscendingIcon: string;
  @Prop() sortDescendingIcon: string;
  @Prop() scrollbarWidth: number;
  @Prop() scrollbarH: boolean;
  @Prop() dealsWithGroup: boolean;
  @Prop() innerWidth: number;
  @Prop() sorts: ISortPropDir[];
  @Prop() sortType: SortType;
  @Prop() allRowsSelected: boolean;
  @Prop() selectionType: SelectionType;
  @Prop() reorderable: boolean;
  @Prop() headerHeight: string | number;
  @Prop() columns: TableColumn[];
  @Prop() offsetX: number;
  @Prop() columnGroupWidths: IColumnsWidth;
  @Prop() columnsByPin: IColumnsByPinRecord[];

  myHeaderHeight = 'auto';
  styleByGroup = {
    left: {},
    center: {},
    right: {},
  };
  targetMarkerContext: { class: string } = null;
  dragEvent: MouseEvent = null;
  dragging = false;
  positions: Record<string, IDragPosition> = {};

  // non-reactive props
  lastDraggingIndex: number;
  draggables: Array<{ dragModel: TableColumn; element: HTMLElement }>;

  @Watch('innerWidth', { immediate: true }) onChangedInnerWidth(): void {
    if (Array.isArray(this.columns)) {
      this.setStylesByGroup();
    }
  }

  @Watch('headerHeight', { immediate: true }) onHeaderHeightChanged(): void {
    if (this.headerHeight !== 'auto') {
      this.myHeaderHeight = `${this.headerHeight}px`;
    } else {
      this.myHeaderHeight = this.headerHeight;
    }
  }

  @Watch('columns', { immediate: true }) onColumnsChanged(): void {
    this.setStylesByGroup();
  }

  @Watch('offsetX') onOffsetXChanged(): void {
    this.setStylesByGroup();
  }

  @Watch('columnGroupWidths') onColumnGroupWidthsChanged() {
    this.setStylesByGroup();
  }

  onLongPressStart({ event, model }: { event: MouseEvent; model: { dragging: boolean } }): void {
    model.dragging = true;
    this.dragEvent = event;
  }

  onLongPressEnd({ event, model }: { event: MouseEvent; model: TableColumn }): void {
    this.dragEvent = event;

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
      return `${this.innerWidth}px`;
    }
    return '100%';
  }

  isEnableDragX(column: TableColumn): boolean {
    return this.reorderable && column.draggable && column.dragging;
  }

  // trackByGroups(colGroup: any): any {
  //   return colGroup.type;
  // }

  // columnTrackingFn(column: any): any {
  //   return column.$$id;
  // }

  onColumnResized(width: number, column: TableColumn): void {
    // column: DataTableColumnDirective
    if (width <= column.minWidth) {
      width = column.minWidth;
    } else if (width >= column.maxWidth) {
      width = column.maxWidth;
    }

    this.$emit('resize', {
      column,
      prevValue: column.width,
      newValue: width,
    });
  }

  onColumnVisibleChanged(column: TableColumn): void {
    this.$emit('column-visible-changed', column);
  }

  getColumn(index: number): TableColumn {
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

  onSort({
    column,
    prevValue,
    newValue,
  }: {
    column: TableColumn;
    prevValue: SortDirection;
    newValue: SortDirection;
  }): void {
    // if we are dragging don't sort!
    if (column.dragging) {
      return;
    }

    const sorts = this.calcNewSorts(column, prevValue, newValue);
    const event: ISortEvent = {
      sorts,
      column,
      prevValue,
      newValue,
    };
    this.$emit('sort', event);
  }

  onSelect(event: Event): void {
    this.$emit('select', event);
  }

  calcNewSorts(column: TableColumn, prevValue: SortDirection, newValue: SortDirection): ISortPropDir[] {
    let idx = 0;

    if (!this.sorts) {
      this.sorts = [];
    }

    const sorts = this.sorts.map((s, i) => {
      s = { ...s };
      if (s.prop === column.prop) {
        idx = i;
      }
      return s;
    });

    if (!newValue) {
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

  setStylesByGroup(): void {
    if (!this.columnsByPin || !this.columnsByPin.length) {
      return;
    }
    const leftColumnCount = this.columnsByPin[0].columns.length;
    // eslint-disable-next-line eqeqeq
    if (leftColumnCount != null) {
      this.styleByGroup['left'] = this.calcStylesByGroup('left');
    }
    const centerColumnCount = this.columnsByPin[1].columns.length;
    // eslint-disable-next-line eqeqeq
    if (centerColumnCount != null) {
      this.styleByGroup['center'] = this.calcStylesByGroup('center');
    }
    const rightColumnCount = this.columnsByPin[2].columns.length;
    // eslint-disable-next-line eqeqeq
    if (rightColumnCount != null) {
      this.styleByGroup['right'] = this.calcStylesByGroup('right');
    }
  }

  calcStylesByGroup(group: keyof IColumnsWidth): Record<string, string | number> {
    if (!this.columnGroupWidths) {
      return null;
    }
    const widths = this.columnGroupWidths;
    const offsetX = this.offsetX;

    const styles = {
      width: `${widths[group]}px`,
    };
    if (group === 'center') {
      translateXY(styles, offsetX * -1, 0);
    } else if (group === 'right') {
      const totalDiff = widths.total - this.innerWidth;
      let offset = totalDiff * -1;
      if (this.scrollbarWidth) {
        offset -= this.scrollbarWidth;
      }
      translateXY(styles, offset, 0);
    }
    return styles;
  }

  styleForGroup(group: IColumnsByPinRecord): Record<string, string | number> {
    return this.styleByGroup[group.type];
  }

  get styleObject(): Record<string, string | number> {
    return {
      width: this.headerWidth ? this.headerWidth : `${this.columnGroupWidths.total}px`,
      height: this.myHeaderHeight,
    };
  }

  onHeaderCellMounted(column: TableColumn, element: HTMLElement): void {
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
      const left = parseInt(a.element.offsetLeft.toString(), 10);
      const left1 = parseInt(b.element.offsetLeft.toString(), 10);
      return left - left1;
    });
    for (const dragger of this.draggables) {
      const elm = dragger.element;
      const left = parseInt(elm.offsetLeft.toString(), 10);
      const width = elm.offsetWidth;
      if (width) {
        this.positions[dragger.dragModel.prop] = {
          left,
          right: left + parseInt(width.toString(), 10),
          index: i++,
          element: elm,
        };
      }
    }
  }

  onDragging({ element, model, event }: { element: HTMLElement; model: TableColumn; event: MouseEvent }): void {
    const prevPos = this.positions[model.prop];
    const target = this.isTarget(model, event);

    if (target) {
      if (this.lastDraggingIndex !== target.i) {
        this.onTargetChanged({
          prevIndex: this.lastDraggingIndex,
          newIndex: target.i,
          initialIndex: prevPos.index,
        });
        this.lastDraggingIndex = target.i;
      }
    } else if (this.lastDraggingIndex !== prevPos.index) {
      this.onTargetChanged({
        prevIndex: this.lastDraggingIndex,
        initialIndex: prevPos.index,
      });
      this.lastDraggingIndex = prevPos.index;
    }
  }

  onDragEnd({ element, model, event }: { element: HTMLElement; model: TableColumn; event: MouseEvent }): void {
    this.dragging = false;
    const prevPos = this.columns.findIndex(col => col.prop === model.prop); // this.positions[model.prop];

    const target = this.isTarget(model, event);
    this.positions = {};
    if (target) {
      this.onColumnReordered({
        prevIndex: prevPos,
        newIndex: this.columns.findIndex(col => col.prop === target.prop), // target.i,
        model,
      });
    }
    // eslint-disable-next-line no-undefined
    this.lastDraggingIndex = undefined;
    element.style.left = 'auto';
  }

  onColumnReordered({ prevIndex, newIndex, model }: { prevIndex: number; newIndex: number; model: TableColumn }): void {
    const column = this.getColumn(newIndex);
    column.isTarget = false;
    column.targetMarkerContext = null;
    this.$emit('reorder', {
      column: model,
      prevValue: prevIndex,
      newValue: newIndex,
    });
  }

  onTargetChanged({
    prevIndex,
    newIndex,
    initialIndex,
  }: {
    prevIndex: number;
    newIndex?: number;
    initialIndex: number;
  }): void {
    if (prevIndex || prevIndex === 0) {
      const oldColumn = this.getColumn(prevIndex);
      oldColumn.isTarget = false;
      oldColumn.targetMarkerContext = null;
    }
    if (newIndex || newIndex === 0) {
      const newColumn = this.getColumn(newIndex);
      newColumn.isTarget = true;

      if (initialIndex !== newIndex) {
        newColumn.targetMarkerContext = {
          class: 'targetMarker '.concat(initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft'),
        };
      }
    }
  }

  isTarget(
    model: TableColumn,
    event: MouseEvent
  ): {
    prop: string;
    pos: IDragPosition;
    i: number;
  } {
    let i = 0;
    const x = event.x || event.clientX;
    const y = event.y || event.clientY;
    const targets = document.elementsFromPoint(x, y);

    for (const prop in this.positions) {
      // current column position which throws event.
      const pos = this.positions[prop];
      // since we drag the inner span, we need to find it in the elements at the cursor
      if (model.prop !== prop && targets.find((el: HTMLElement) => el === pos.element)) {
        return {
          prop,
          pos,
          i,
        };
      }

      i++;
    }
  }
}
