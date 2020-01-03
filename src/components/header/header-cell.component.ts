import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { SortDirection, SortType, SelectionType, TableColumn } from '../../types';
import { nextSortDir } from '../../utils';

@Component({
  template: `
    <div class="datatable-header-cell-template-wrap" :class="[columnCssClasses]" :style="styles" :title="name"
          v-show="column.visible"
          @contextmenu="onContextmenu($event)">
      <slot name="target-marker">
        <!-- Default content -->
        <div class="targetMarker" v-if="isTarget">
          <div class="icon datatable-icon-down"></div>
          <div class="icon datatable-icon-up"></div>
        </div>
      </slot>
      <label
        v-if="isCheckboxable"
        class="datatable-checkbox">
        <input
          type="checkbox"
          :checked="allRowsSelected"
          @change="$emit('select', !allRowsSelected)"
        />
      </label>
      <slot v-bind="{ column: column }">
        <!-- Default content -->
        <span class="datatable-header-cell-wrapper">
          <span class="datatable-header-cell-label draggable"
            :class="cssClass"
            @click="onSort" v-html="name">
          </span>
        </span>
      </slot>
      <span
        @click="onSort"
        :class="sortCssClass">
      </span>
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
  @Prop() sorts: any[];
  @Prop() headerHeight: number;

  sortFn = this.onSort.bind(this);
  sortDir: SortDirection = null;
  // selectFn = this.select.emit.bind(this.select);

  cellContext: any = {
    column: this.column,
    sortDir: this.sortDir,
    sortFn: this.sortFn,
    allRowsSelected: this.allRowsSelected,
    // selectFn: this.selectFn
  };

  @Watch('allRowsSelected', { immediate: true }) onAllRowsSelectedChanged() {
    this.cellContext.allRowsSelected = this.allRowsSelected;
  }
  
  @Watch('column', { immediate: true }) onColumnChahged() {
    this.cellContext.column = this.column;
  }

  @Watch('sorts', { immediate: true }) onSortsChanged() {
    this.sortDir = this.calcSortDir(this.sorts);
    this.cellContext.sortDir = this.sortDir;
  }

  created() {
    this.$emit('header-cell-created', this.$el);
    if (this.column.headerTemplate) {
      this.$slots.default = this.column.headerTemplate({ column: this.column });
    }
  }

  mounted() {
    this.column.element = this.$el;
    this.$emit('header-cell-mounted', this.$el);
  }

  beforeUpdate() {
    if (this.column.headerTemplate) {
      this.$slots.default = this.column.headerTemplate({ column: this.column });
    }
  }

  get columnCssClasses(): any {
    let cls = 'datatable-header-cell';
    if (this.column) {
      if (this.column.sortable) cls += ' sortable';
      if (this.column.resizeable) cls += ' resizeable';
      if (this.column.draggable) cls += ' draggable';
      if (this.column.headerClass) {
        if (typeof this.column.headerClass === 'string') {
          cls += ' ' + this.column.headerClass;
        } else if (Array.isArray(this.column.headerClass)) {
          cls += ' ' + this.column.headerClass.join(' ');
        } else if (typeof this.column.headerClass === 'function') {
          const res = this.column.headerClass({
            column: this.column
          });
          if (typeof res === 'string') {
            cls += res;
          } else if (typeof res === 'object') {
            const keys = Object.keys(res);
            for (const k of keys) {
              if (res[k] === true) cls += ` ${k}`;
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

  // @HostBinding('attr.title')
  get name(): string {
    // guaranteed to have a value by setColumnDefaults() in column-helper.ts
    return this.column.headerTemplate === undefined ? this.column.name : undefined;
  }

  // @HostBinding('style.height.px')
  get styles() {
    // const width = this.calcRealWidth();
    // if (width !== null && width < 10) {
    //   this.column.visible = false;
    // } else {
    //   this.column.visible = true;
    // }
    return {
      height: this.headerHeight + 'px',
      width: this.column.width + 'px',
      'min-width': this.column.minWidth + 'px',
      'max-width': this.column.maxWidth + 'px',
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
    return this.column.checkboxable &&
      this.column.headerCheckboxable &&
      this.selectionType === SelectionType.checkbox;
  }

  // @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.$emit('columnContextmenu', { event: $event, column: this.column });
  }

  calcSortDir(sorts: any[]): any {
    if (sorts && this.column) {
      const sort = sorts.find((s: any) => {
        return s.prop === this.column.prop;
      });

      if (sort) return sort.dir;
    }
  }

  onSort(): void {
    if (!this.column.sortable) return;

    const newValue = nextSortDir(this.sortType, this.sortDir);
    this.$emit('sort', {
      column: this.column,
      prevValue: this.sortDir,
      newValue
    });
  }

  calcSortCssClass(sortDir: SortDirection): string {
    if (sortDir === SortDirection.asc) {
      return `sort-btn sort-asc ${this.sortAscendingIcon}`;
    } else if (sortDir === SortDirection.desc) {
      return `sort-btn sort-desc ${this.sortDescendingIcon}`;
    } else {
      return `sort-btn`;
    }
  }

  calcCssClass(sortDir: SortDirection): string {
    if (sortDir === SortDirection.asc || sortDir === SortDirection.desc) {
      return 'datatable-header-cell-bold';
    } else {
      return '';
    }
  }
}
