import { Component, Vue, Prop } from 'vue-property-decorator';
import { Keys, selectRows, selectRowsBetween } from '../../utils';
import { SelectionType, TableColumn } from '../../types';
import { CheckMode } from '../../types/check.type';
// import { MouseEvent, KeyboardEvent } from '../../events';

export interface Model {
  type: string; 
  event: MouseEvent | KeyboardEvent;
  row: any;
  rowElement: any;
  cellElement: any;
  cellIndex: number;
  column?: TableColumn;
}

@Component({
  template: `
    <div id="selector">
      <slot>
        selection
      </slot>
    </div>
  `,
})
export default class DataTableSelectionComponent extends Vue {

  @Prop() rows: any[];
  @Prop() selected: any[];
  @Prop() checked: any[];
  @Prop() selectEnabled: boolean;
  @Prop() selectionType: SelectionType;
  @Prop() checkMode: CheckMode;
  @Prop() rowIdentity: any;
  @Prop() selectCheck: any;

  // @Output() activate: EventEmitter<any> = new EventEmitter();
  // @Output() select: EventEmitter<any> = new EventEmitter();

  prevIndex: number;

  selectRow(event: KeyboardEvent | MouseEvent, index: number, row: any): void {
    if (!this.selectEnabled) return;

    const chkbox = this.selectionType === SelectionType.checkbox && this.checkMode === CheckMode.checkIsSelect;
    const multi = this.selectionType === SelectionType.multi;
    const multiClick = this.selectionType === SelectionType.multiClick;
    let selected: any[] = [];

    if (multi || chkbox || multiClick) {
      if (event.shiftKey) {
        selected = selectRowsBetween(
          [],
          this.rows,
          index,
          this.prevIndex,
          this.getRowSelectedIdx.bind(this));
      } else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
        selected = selectRows([...this.selected], row, this.getRowSelectedIdx.bind(this));
      } else {
        selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
      }
    } else {
      selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
    }

    if (typeof this.selectCheck === 'function') {
      selected = selected.filter(this.selectCheck.bind(this));
    }

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.prevIndex = index;

    this.$emit('select', {
      selected
    });
  }

  checkRow(event: KeyboardEvent | MouseEvent, index: number, row: any): void {
    if (!this.selectEnabled) return;

    let checked: any[] = [];
    checked = selectRows([...this.checked], row, this.getRowSelectedIdx.bind(this));

    if (typeof this.selectCheck === 'function') {
      checked = checked.filter(this.selectCheck.bind(this));
    }

    this.checked.splice(0, this.checked.length);
    this.checked.push(...checked);

    this.$emit('check', {
      checked
    });
  }

  onActivate(model: Model, index: number): void {
    const { type, event, row, column } = model;
    const chkbox = this.selectionType === SelectionType.checkbox && this.checkMode === CheckMode.checkIsSelect;
    let select = (!chkbox && (type === 'click' || type === 'dblclick')) || (chkbox && type === 'checkbox');
    if (this.checkMode === CheckMode.checkNoSelect && column?.checkboxable) {
      select = false;
    }
  
    if (select) {
      this.selectRow(event, index, row);
    } else if (type === 'checkbox' && this.checkMode === CheckMode.checkNoSelect) { 
      this.checkRow(event, index, row);
    } else if (type === 'keydown') {
      if ((<KeyboardEvent>event).keyCode === Keys.return) {
        this.selectRow(event, index, row);
      } else {
        this.onKeyboardFocus(model);
      }
    }
    this.$emit('activate', model);
  }

  onKeyboardFocus(model: Model): void {
    const { keyCode } = <KeyboardEvent>model.event;
    const shouldFocus =
      keyCode === Keys.up ||
      keyCode === Keys.down ||
      keyCode === Keys.right ||
      keyCode === Keys.left;

    if (shouldFocus) {
      const isCellSelection =
        this.selectionType === SelectionType.cell;

      if (!model.cellElement || !isCellSelection) {
        this.focusRow(model.rowElement, keyCode);
      } else if (isCellSelection) {
        this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
      }
    }
  }

  focusRow(rowElement: any, keyCode: number): void {
    const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
    if (nextRowElement) nextRowElement.focus();
  }

  getPrevNextRow(rowElement: any, keyCode: number): any {
    const parentElement = rowElement.parentElement;

    if (parentElement) {
      let focusElement: HTMLElement;
      if (keyCode === Keys.up) {
        focusElement = parentElement.previousElementSibling;
      } else if (keyCode === Keys.down) {
        focusElement = parentElement.nextElementSibling;
      }

      if (focusElement && focusElement.children.length) {
        return focusElement.children[0];
      }
    }
  }

  focusCell(cellElement: any, rowElement: any, keyCode: number, cellIndex: number): void {
    let nextCellElement: HTMLElement;

    if (keyCode === Keys.left) {
      nextCellElement = cellElement.previousElementSibling;
    } else if (keyCode === Keys.right) {
      nextCellElement = cellElement.nextElementSibling;
    } else if (keyCode === Keys.up || keyCode === Keys.down) {
      const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
      if (nextRowElement) {
        const children = nextRowElement.getElementsByClassName('datatable-body-cell');
        if (children.length) nextCellElement = children[cellIndex];
      }
    }

    if (nextCellElement) nextCellElement.focus();
  }

  getRowSelected(row: any): boolean {
    return this.getRowSelectedIdx(row, this.selected) > -1;
  }

  getRowChecked(row: any): boolean {
    const arr = this.checkMode === CheckMode.checkIsSelect ? this.selected : this.checked;
    return this.getRowSelectedIdx(row, arr) > -1;
  }

  getRowSelectedIdx(row: any, selected: any[]): number {
    if (!selected || !selected.length) return -1;

    const rowId = this.rowIdentity(row);
    return selected.findIndex((r) => {
      const id = this.rowIdentity(r);
      return id === rowId;
    });
  }
}
