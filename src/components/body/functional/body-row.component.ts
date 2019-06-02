import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Keys } from '../../../utils/keys';
import { id } from '../../../utils/id';
// import {
//   columnsByPin, columnGroupWidths, columnsByPinArr, translateXY, Keys
// } from '../../utils';
// // import { MouseEvent, KeyboardEvent, Event } from '../../events';
// import { TreeStatus } from './body-cell.component';
// import { ScrollbarHelper } from '../../services/scrollbar-helper.service';

function getEl(props): Element {
  if (!props.$el) {
    props.$el = document.getElementById(props.$$id);
  }
  return props.$el;

}

function onMouseenter(listeners, props): (e) => void {
  return (event) => listeners.activate({
    type: 'mouseenter',
    event,
    row: props.row,
    rowElement: getEl(props),
  });
}

function onKeyDown(listeners, props): (e) => void {
  return (event: KeyboardEvent) => {
    const keyCode = event.keyCode;
    const isTargetRow = event.target === getEl(props);

    const isAction =
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right;

    if (isAction && isTargetRow) {
      event.preventDefault();
      event.stopPropagation();

      return () => listeners.activate({
        type: 'keydown',
        event,
        row: props.row,
        rowElement: getEl(props),
      });
    }
  };
}

function onTreeAction(listeners, props): (e) => void {
  return (event) => listeners['tree-action']({
    type: 'mouseenter',
    event,
    row: props.row,
  });
}

export default Vue.extend({
  functional: true,
  props: {
    row: Object,
    group: Array,
    columnsByPin: Array,
    columnGroupWidths: Object,
    isSelected: Boolean,
    rowStyles: Function,
    groupStyles: Function,
    groupClass: String,
    displayCheck: Function, // (row: any, column?: TableColumn, value?: any) => boolean,
    treeStatus: ({ type: String, default: 'collapsed' }),
    cellContext: Function,
    cellColumnCssClasses: Function,
    cellStyleObject: Function,
    marginCellStyle: Function,
    slots: Function,
  },
  render(createElement, { props, listeners, slots }) {
    const rowGroups = [];
    props.$$id = id();
    props.columnsByPin.forEach((colGroup) => {
      const div = createElement(
        'div',
        {
          key: colGroup.type,
          attrs: {
            id: `${colGroup.type}-${props.$$id}`,
          },
          props: {
            key: colGroup.type,
          },
          class: 'datatable-row-group datatable-row-' + colGroup.type,
          style: props.groupStyles(colGroup),
          on: {
           keydown: onKeyDown(listeners, props),
           mouseenter: onMouseenter(listeners, props),
            // 'tree-action': listeners['tree-action']($event, props.row),
          },
        }, colGroup.columns.map((column, index) => {
          const context = props.cellContext(props.row, props.group, column);
          return createElement(
            'datatable-body-cell',
            {
              key: column.$$id,
              props: {
                key: column.$$id,
                context,
                cellColumnCssClasses: props.cellColumnCssClasses,
                cellStyleObject: props.cellStyleObject,
                marginCellStyle: props.marginCellStyle,
                tabIndex: '-1' // context.rowIndex ? `${context.rowIndex}${index}` : `${index}`,
              },
              scopedSlots: {
                [column.prop]: props.slots()[column.prop]
              },
              on: {
                'tree-action': onTreeAction(listeners, props),
                activate: listeners.activate,
                keydown: onKeyDown(listeners, props),
                mouseenter: onMouseenter(listeners, props),
              },
            }
          );
        })
      );
      rowGroups.push(div);
    });
    const rootDiv = createElement(
      'div',
      {
        attrs: {
          id: 'row-group'
        },
        class: props.groupClass,
        style: props.rowStyles(props.row),
      }, rowGroups);
    return rootDiv;
  },
});

/*@Component({
  components: {
    'datatable-body-cell': DataTableBodyCellComponent,
  }
})
export default class DataTableBodyRowComponent extends Vue {
  @Prop() columns: any[];
  @Prop() innerWidth: number;
  @Prop() expanded: boolean;
  @Prop() rowClass: any;
  @Prop() row: any;
  @Prop() group: any;
  @Prop() isSelected: boolean;
  @Prop() rowIndex: number;
  @Prop() displayCheck: any;
  @Prop({ type: String, default: 'collapsed' }) treeStatus: TreeStatus;
  @Prop() offsetX: number;
  @Prop() rowHeight: number;

  columnGroupWidths: any = null;
  columnsByPin: any = null;
  groupStyles = {
    left: {},
    center: {},
    right: {}
  };
  private scrollbarHelper = new ScrollbarHelper();
  private myColumns: any[];

  @Watch('offsetX') onOffsetXChanged() {
    this.buildStylesByGroup();
  }

  @Watch('columns', { immediate: true }) onColumnsCahnged() {
    this.myColumns = this.columns;
    this.recalculateColumns(this.myColumns);
    this.buildStylesByGroup();
  }

  @Watch('innerWidth') onInnerWidthChanged() {
    if (this.myColumns) {
      const colByPin = columnsByPin(this.myColumns);
      this.columnGroupWidths = columnGroupWidths(colByPin, colByPin);
    }
    this.recalculateColumns();
    this.buildStylesByGroup();
  }

  // created() {
  //   this.scrollbarHelper = new ScrollbarHelper();
  // }

  getStyles(colGroup: any) {
    return {
      ...this.groupStyles[colGroup.type],
      // height: this.rowHeight + 'px',
      width: this.columnGroupWidths.total + 'px',
    };
  }

  get styleObject() {
    return {
      height: this.rowHeight + 'px',
      width: this.columnGroupWidths.total + 'px',
    };
  }

  get classObject() {
    let cls = 'datatable-body-row';
    if (this.isSelected) cls += ' active';
    if (this.rowIndex % 2 !== 0) cls += ' datatable-row-odd';
    if (this.rowIndex % 2 === 0) cls += ' datatable-row-even';
    if (this.rowClass) {
      const res = this.rowClass(this.row);
      if (typeof res === 'string') {
        cls += ` ${res}`;
      } else if (typeof res === 'object') {
        const keys = Object.keys(res);
        for (const k of keys) {
          if (res[k] === true) cls += ` ${k}`;
        }
      }
    }
    return cls;
  }

  cssClass(colGroup: any) {
    return `datatable-row-${colGroup.type}`;
    // const cls1 = `${cls} datatable-row-${colGroup.type}`;
    // return {
    //   [cls]: true,
    //   [cls1]: true,
    // };
  }

  // @Output() activate: EventEmitter<any> = new EventEmitter();
  // @Output() treeAction: EventEmitter<any> = new EventEmitter();

  // private rowDiffer: KeyValueDiffer<{}, {}>;

  trackByGroups(index: number, colGroup: any): any {
    return colGroup.type;
  }

  columnTrackingFn(index: number, column: any): any {
    return column.$$id;
  }

  buildStylesByGroup() {
    this.groupStyles['left'] = this.calcStylesByGroup('left');
    this.groupStyles['center'] = this.calcStylesByGroup('center');
    this.groupStyles['right'] = this.calcStylesByGroup('right');
  }

  calcStylesByGroup(group: string) {
    const widths = this.columnGroupWidths;
    const offsetX = this.offsetX;
    const styles = {
      width: `${widths[group]}px`
    };
    if (group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if (group === 'right') {
      const bodyWidth = parseInt(this.innerWidth + '', 0);
      const totalDiff = widths.total - bodyWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset = (offsetDiff + this.scrollbarHelper.width) * -1;
      translateXY(styles, offset, 0);
    }
    return styles;
  }

  onActivate(event: any, index: number): void {
    event.cellIndex = index;
    event.rowElement = this.$el;
    this.$emit('activate', event);
  }

  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isTargetRow = event.target === this.$el;

    const isAction =
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right;

    if (isAction && isTargetRow) {
      event.preventDefault();
      event.stopPropagation();

      this.$emit('activate', {
        type: 'keydown',
        event,
        row: this.row,
        rowElement: this.$el
      });
    }
  }

  onMouseenter(event: any): void {
    this.$emit('activate', {
        type: 'mouseenter',
        event,
        row: this.row,
        rowElement: this.$el
      });
  }

  recalculateColumns(val: any[] = this.columns): void {
    this.myColumns = val;
    const colsByPin = columnsByPin(this.myColumns);
    this.columnsByPin = columnsByPinArr(this.myColumns);
    this.columnGroupWidths = columnGroupWidths(colsByPin, this.myColumns);
  }

  onTreeAction() {
    this.$emit('treeAction');
  }

}*/
