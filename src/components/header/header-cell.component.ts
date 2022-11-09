import { SelectionType } from 'types/selection.type';
import { SortType } from 'types/sort.type';
import { SortDirection } from 'types/sort-direction.type';
import { ISortPropDir } from 'types/sort-prop-dir.type';
import { TableColumn } from 'types/table-column.type';
import { nextSortDir } from 'utils/sort';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  template: `
    <div
      class="datatable-header-cell-template-wrap"
      :class="[columnCssClasses]"
      :style="styles"
      :title="name"
      @contextmenu="onContextmenu($event)"
    >
      <slot name="target-marker">
        <!-- Default content -->
        <div class="targetMarker" v-if="isTarget">
          <div class="icon datatable-icon-down"></div>
          <div class="icon datatable-icon-up"></div>
        </div>
      </slot>
      <label v-if="isCheckboxable" class="datatable-checkbox">
        <input type="checkbox" v-model="myAllRowsSelected" @change="onCheckboxChange" />
      </label>
      <slot v-bind="{ column: column }">
        <!-- Default content -->
        <span class="datatable-header-cell-wrapper">
          <span class="datatable-header-cell-label draggable" :class="cssClass" @click="onSort" v-html="name"> </span>
        </span>
      </slot>
      <div :class="sortCssClass" @click="onSort">
        {{ sortOrder }}
      </div>
      <slot name="append" v-bind="{ column: column }"></slot>
    </div>
  `,
})
export default class DataTableHeaderCellComponent extends Vue {
  @Prop() sortType: SortType;
  @Prop() sortAscendingIcon: string;
  @Prop() sortDescendingIcon: string;
  @Prop() isTarget: boolean;
  @Prop() allRowsSelected: boolean;
  @Prop() selectionType: SelectionType;
  @Prop() column: TableColumn;
  @Prop() sorts: ISortPropDir[];
  @Prop() headerHeight: number;

  sortFn = this.onSort.bind(this) as () => void;
  sortDir: SortDirection = null;
  myAllRowsSelected = false;
  sortOrder = '';
  // selectFn = this.select.emit.bind(this.select);

  cellContext = {
    column: null as TableColumn,
    sortDir: this.sortDir,
    sortFn: this.sortFn,
    allRowsSelected: false,
    // selectFn: this.selectFn
  };

  resizeObserver?: ResizeObserver;

  @Watch('allRowsSelected', { immediate: true }) onAllRowsSelectedChanged(): void {
    if (!this.isCheckboxable) {
      return;
    }
    this.myAllRowsSelected = this.allRowsSelected;
    this.cellContext.allRowsSelected = this.allRowsSelected;
  }

  @Watch('column', { immediate: true }) onColumnChahged(): void {
    this.cellContext.column = this.column;
  }

  @Watch('column.visible') onColumnVisibleChahged(): void {
    this.$emit('column-visible-changed', this.column);
  }

  @Watch('column.frozenLeft') onColumnFrozenLeftChahged(): void {
    this.$emit('column-visible-changed', this.column);
  }

  @Watch('column.frozenRight') onColumnFrozenRightChahged(): void {
    this.$emit('column-visible-changed', this.column);
  }

  @Watch('sorts', { immediate: true }) onSortsChanged(): void {
    this.sortDir = this.calcSortDir(this.sorts);
    this.cellContext.sortDir = this.sortDir;
  }

  created(): void {
    this.cellContext.column = this.column;
    this.cellContext.allRowsSelected = this.allRowsSelected;
    this.$emit('header-cell-created', this.$el);
    if (this.column.headerTemplate) {
      this.$slots.default = this.column.headerTemplate({ column: this.column });
    }
    if (this.column.headerAppendTemplate) {
      this.$slots.append = this.column.headerAppendTemplate({ column: this.column });
    }
  }

  mounted(): void {
    this.column.element = this.$el;
    this.$emit('header-cell-mounted', this.$el);
    this.setResizeObserver();
  }

  beforeUpdate(): void {
    if (this.column.headerTemplate && !this.$slots.default) {
      this.$slots.default = this.column.headerTemplate({ column: this.column });
    }
    if (this.column.headerAppendTemplate && !this.$slots.append) {
      this.$slots.append = this.column.headerAppendTemplate({ column: this.column });
    }
  }

  updated(): void {
    if (this.resizeObserver && this.column.element !== this.$el) {
      this.resizeObserver.unobserve(this.column.element);
    }
    this.column.element = this.$el;
    this.setResizeObserver();
  }

  beforeDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.$el);
      this.resizeObserver = null;
    }
    if (this.column) {
      this.column.element = null;
    }
  }

  onCheckboxChange(): void {
    this.$emit('select', this.myAllRowsSelected);
  }

  get columnCssClasses(): string {
    let cls = 'datatable-header-cell';
    if (this.column) {
      if (this.column.sortable) {
        cls += ' sortable';
      }
      if (this.column.resizeable) {
        cls += ' resizeable';
      }
      if (this.column.draggable) {
        cls += ' draggable';
      }
      if (this.column.headerClass) {
        if (typeof this.column.headerClass === 'string') {
          cls += ' ' + this.column.headerClass;
        } else if (Array.isArray(this.column.headerClass)) {
          cls += ' ' + this.column.headerClass.join(' ');
        } else if (typeof this.column.headerClass === 'function') {
          const res = this.column.headerClass({
            column: this.column,
          });
          if (typeof res === 'string') {
            cls += res;
          } else if (typeof res === 'object') {
            const keys = Object.keys(res);
            for (const k of keys) {
              if (res[k] === true) {
                cls += ` ${k}`;
              }
            }
          }
        }
      }
    }

    const sortDir = this.sortDir;
    if (sortDir) {
      cls += ` sort-active sort-${sortDir}`;
    }

    return cls;
  }

  get name(): string {
    // guaranteed to have a value by setColumnDefaults() in column-helper.ts
    return !this.column.headerTemplate ? this.column.name : null;
  }

  get styles(): Record<string, string> {
    // const width = this.calcRealWidth();
    // if (width !== null && width < 10) {
    //   this.column.visible = false;
    // } else {
    //   this.column.visible = true;
    // }
    return {
      height: `${this.headerHeight}px`,
      width: `${this.column.width}px`,
      'min-width': `${this.column.minWidth}px`,
      'max-width': `${this.column.maxWidth}px`,
    };
  }

  get sortCssClass(): string {
    return this.calcSortCssClass(this.sortDir);
  }

  get cssClass(): string {
    return this.calcCssClass(this.sortDir);
  }

  // @HostBinding('style.minWidth.px')
  // get minWidth(): number {
  //   return this.column.minWidth;
  // }

  // @HostBinding('style.maxWidth.px')
  // get maxWidth(): number {
  //   return this.column.maxWidth;
  // }

  // @HostBinding('style.width.px')
  // get width(): number {
  //   return this.column.width;
  // }

  get isCheckboxable(): boolean {
    return this.column.checkboxable && this.column.headerCheckboxable;
  }

  // @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.$emit('columnContextmenu', { event: $event, column: this.column });
  }

  calcSortDir(sorts: ISortPropDir[]): SortDirection {
    this.sortOrder = '';
    if (sorts && this.column) {
      let sortOrder = '';
      const sort = sorts
        .filter(s => s.prop)
        .find((s: ISortPropDir, index) => {
          if (s.prop === this.column.prop) {
            sortOrder = (index + 1).toString();
            return true;
          }
        });
      if (sort) {
        if (this.sortType === SortType.multi) {
          this.sortOrder = sortOrder;
        }
        return sort.dir;
      }
    }
  }

  onSort(): void {
    if (!this.column.sortable) {
      return;
    }

    const newValue = nextSortDir(this.sortType, this.sortDir);
    this.$emit('sort', {
      column: this.column,
      prevValue: this.sortDir,
      newValue,
    });
  }

  calcSortCssClass(sortDir: SortDirection): string {
    if (sortDir === SortDirection.asc) {
      return `sort-btn sort-asc ${this.sortAscendingIcon}`;
    }
    if (sortDir === SortDirection.desc) {
      return `sort-btn sort-desc ${this.sortDescendingIcon}`;
    }
    return 'sort-btn';
  }

  calcCssClass(sortDir: SortDirection): string {
    if (sortDir === SortDirection.asc || sortDir === SortDirection.desc) {
      return 'datatable-header-cell-bold';
    }
    return '';
  }

  private setResizeObserver() {
    if ((window as Window).ResizeObserver) {
      this.resizeObserver = new (window as Window).ResizeObserver(entries => {
        if (!this.column) {
          return;
        }
        if (entries.length && entries[0].contentRect) {
          this.column.realWidth = Math.max(this.$el.clientWidth, entries[0].contentRect.width);
        } else {
          this.column.realWidth = this.$el.clientWidth;
        }
      });
      this.resizeObserver.observe(this.$el);
    } else {
      this.column.realWidth = null;
    }
  }
}
