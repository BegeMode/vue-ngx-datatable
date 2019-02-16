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
      <slot>
      <!-- Default content -->
        <span class="datatable-header-cell-wrapper">
          <span class="datatable-header-cell-label draggable"
            @click="onSort" v-html="name">
          </span>
        </span>
      </slot>
      <span
        @click="onSort"
        :class="sortClass">
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
      this.$slots.default = this.column.headerTemplate;
    }
  }

  mounted() {
    this.$emit('header-cell-mounted', this.$el);
  }
  // updated() {
  //   if (this.column.headerTemplate && !this.$slots.default) {
  //     this.$slots.default = this.column.headerTemplate;
  //     this.$forceUpdate();
  //   }
  // }

  // @Output() sort: EventEmitter<any> = new EventEmitter();
  // @Output() select: EventEmitter<any> = new EventEmitter();
  // @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent, column: any }>(false);

  // @HostBinding('class')
  get columnCssClasses(): any {
    let cls = 'datatable-header-cell';
    if (this.column) {
      if (this.column.sortable) cls += ' sortable';
      if (this.column.resizeable) cls += ' resizeable';
      if (this.column.draggable) cls += ' draggable';
      if (this.column.headerClass) {
        if (typeof this.column.headerClass === 'string') {
          cls += ' ' + this.column.headerClass;
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
    return {
      height: this.headerHeight + 'px',
      width: this.column.width + 'px',
      'min-width': this.column.minWidth + 'px',
      'max-width': this.column.maxWidth + 'px',
    };
  }

  get sortClass(): string {
    return this.calcSortClass(this.sortDir);
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

  calcSortClass(sortDir: SortDirection): string {
    if (sortDir === SortDirection.asc) {
      return `sort-btn sort-asc ${this.sortAscendingIcon}`;
    } else if (sortDir === SortDirection.desc) {
      return `sort-btn sort-desc ${this.sortDescendingIcon}`;
    } else {
      return `sort-btn`;
    }
  }

}
