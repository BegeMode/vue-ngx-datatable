import { Vue } from 'vue-property-decorator';
import { Keys } from '../../../utils';

export type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';

function getEl(props): Element {
  if (!props.$el) {
    props.$el = document.getElementById(`${props.context.column.prop}-${props.context.column.$$id}`);
  }
  return props.$el;
}

export default Vue.extend({
  functional: true,
  props: {
    context: Object,
    cellColumnCssClasses: Function,
    cellStyleObject: Function,
    marginCellStyle: Function,
    tabIndex: String,
  },
  methods: {
    onFocus(props): void {
      props.context.isFocused = true;
    },
    onBlur(props): void {
      props.context.isFocused = false;
    },
    onClick(event, listeners, props): void {
      // props.context.isFocused = true;
      // props.context.abcd = true;
      listeners.activate({
        type: 'click',
        event,
        row: props.context.row,
        group: props.context.group,
        rowHeight: props.context.rowHeight,
        column: props.context.column,
        value: props.context.value,
        cellElement: getEl(props),
      });
    },
    onDblClick(event, listeners, props): void {
      listeners.activate({
        type: 'dblclick',
        event,
        row: props.context.row,
        group: props.context.group,
        rowHeight: props.context.rowHeight,
        column: props.context.column,
        value: props.context.value,
        cellElement: getEl(props),
      });
    },
    onKeyDown(event, listeners, props): void {
      const keyCode = event.keyCode;
      const isTargetCell = event.target === getEl(props);
      const isAction =
        keyCode === Keys.return ||
        keyCode === Keys.down ||
        keyCode === Keys.up ||
        keyCode === Keys.left ||
        keyCode === Keys.right;

      if (isAction && isTargetCell) {
        event.preventDefault();
        event.stopPropagation();

        listeners.activate({
          type: 'keydown',
          event,
          row: props.context.row,
          group: props.context.group,
          rowHeight: props.context.rowHeight,
          column: props.context.column,
          value: props.context.value,
          cellElement: getEl(props),
        });
      }
    },
    onCheckboxChange(event, listeners, props): void {
      listeners.activate({
        type: 'checkbox',
        event,
        row: props.context.row,
        group: props.context.group,
        rowHeight: props.context.rowHeight,
        column: props.context.column,
        value: props.context.value,
        cellElement: getEl(props),
        treeStatus: 'collapsed',
      });
    },
    onTreeAction(event, listeners, props) {
      listeners['tree-action']({ event, row: props.row });
    },
  },
});
