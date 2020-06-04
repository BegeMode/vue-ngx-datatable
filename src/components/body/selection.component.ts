import { Component, Vue, Prop } from 'vue-property-decorator';
import { Keys, selectRows, selectRowsBetween } from '../../utils';
import { SelectionType, TableColumn } from '../../types';
import { CheckMode } from '../../types/check.type';
// import { MouseEvent, KeyboardEvent } from '../../events';

export interface Model {
  type: string; 
  event: MouseEvent | KeyboardEvent;
  row: any;
  rowIndex: number;
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
  @Prop() scroller: any;
  @Prop() pageSize: number;

  // @Output() activate: EventEmitter<any> = new EventEmitter();
  // @Output() select: EventEmitter<any> = new EventEmitter();

  prevIndex: number;
  bodyRect: DOMRect;

  mounted() {
    this.bodyRect = this.$parent.$el.getBoundingClientRect();
  }

  updated() {
    this.bodyRect = this.$parent.$el.getBoundingClientRect();
  }

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
    this.prevIndex = index;
    if (typeof this.selectCheck === 'function') {
      selected = selected.filter(this.selectCheck.bind(this));
    }

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.$emit('select', {
      selected,
      index
    });
  }

  checkRow(event: KeyboardEvent | MouseEvent, index: number, row: any): void {
    if (!this.selectEnabled) return;

    let checked: any[] = [];
    if (event.shiftKey) {
      checked = selectRowsBetween(
        [],
        this.rows,
        index,
        this.prevIndex,
        this.getRowSelectedIdx.bind(this));
    } else {
      checked = selectRows([...this.checked], row, this.getRowSelectedIdx.bind(this));
    }
    this.prevIndex = index;

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
      keyCode === Keys.left ||
      keyCode === Keys.pageUp ||
      keyCode === Keys.pageDown;

    if (shouldFocus) {
      const isCellSelection =
        this.selectionType === SelectionType.cell;

      if (!model.cellElement || !isCellSelection) {
        this.focusRow(model, keyCode);
      } else if (isCellSelection) {
        this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
      }
    }
  }

  async focusRow(model: Model, keyCode: number): Promise<void> {
    const nextRowElement = this.getPrevNextRow(model.rowElement, keyCode);
    let index = 0;
    if (keyCode === Keys.up) {
      if (model.rowIndex - 1 < 0) {
        return;
      }
      index = model.rowIndex - 1;
    } else if (keyCode === Keys.down) {
      if (model.rowIndex + 1 >= this.rows.length) {
        return;
      }
      index = model.rowIndex + 1;
    } else if (keyCode === Keys.pageUp) {
      index = model.rowIndex - this.pageSize;
      index = index < 0 ? 0 : index;
    } else if (keyCode === Keys.pageDown) {
      index = model.rowIndex + this.pageSize;
      index = index >= this.rows.length ? this.rows.length - 1 : index;
    }
    const { offsetY, height } = (this.$parent as any).getRowOffsetY(index + 1);
    if (!height) {
      if (nextRowElement) {
        nextRowElement.focus();
      }
      return;
    }
    let scrolled = false;
    let h = 0;
    if ([Keys.down, Keys.pageDown].includes(keyCode)) {
      h = (offsetY + height) - (this.$parent.$el.scrollTop + this.bodyRect.height);
    } else if ([Keys.up, Keys.pageUp].includes(keyCode)) {
      h = (offsetY - height) - this.$parent.$el.scrollTop;
    }
    if (h > 0 && [Keys.down, Keys.pageDown].includes(keyCode)) {
      (this.scroller as any).incOffset(h);
      // scrolled = model.rowIndex === this.rows.length - 2 ? false : true;
    } else if (h < 0 && [Keys.up, Keys.pageUp].includes(keyCode)) {
      (this.scroller as any).incOffset(h);
      scrolled = model.rowIndex === 1 ? false : true;
    } else if (h === 0 && [Keys.up, Keys.pageUp].includes(keyCode) && [0,1,2].includes(model.rowIndex)) {
      (this.scroller as any).setOffset(h);
      // scrolled = true;
    }
    if (scrolled) {
      model.rowElement.focus();
    } else {
      if (nextRowElement) {
        nextRowElement.focus();
      }
    }
  }

  focusRow1(keyCode: number): void {
    let index = 0;
    if (keyCode === Keys.up) {
      if (this.prevIndex - 1 < 0) {
        return;
      }
      index = this.prevIndex - 1;
    } else if (keyCode === Keys.down) {
      if (this.prevIndex + 1 >= this.rows.length) {
        return;
      }
      index = this.prevIndex + 1
    } else if (keyCode === Keys.pageUp) {
      index = this.prevIndex - this.pageSize;
      index = index < 0 ? 0 : index;
    } else if (keyCode === Keys.pageDown) {
      index = this.prevIndex + this.pageSize;
      index = index >= this.rows.length ? this.rows.length - 1 : index;
    }
    const nextRow = this.rows[index];
    if (!nextRow) {
      return;
    }
    setTimeout(() => this.selectRow({ shiftKey: false, ctrlKey: false } as any, index, nextRow));
    const { offsetY, height } = (this.$parent as any).getRowOffsetY(index);
    let h = 0;
    if ([Keys.down, Keys.pageDown].includes(keyCode)) {
      h = offsetY - this.bodyRect.height;
    } else if ([Keys.up, Keys.pageUp].includes(keyCode)) {
      h = (offsetY - height) - (this.scroller as any).scrollYPos;
    }
    if (h > 0 && [Keys.down, Keys.pageDown].includes(keyCode)) {
      (this.scroller as any).setOffset(h);
    } else if (h < 0 && [Keys.up, Keys.pageUp].includes(keyCode)) {
      (this.scroller as any).incOffset(h);
    }

    // const { el: rowElement, height } = (this.$parent as any).getRowElementAndHeight(this.rows[this.prevIndex]);
    // if (!rowElement) {
    //   return;
    // }
    // const nextRowElement = this.getPrevNextRowElement(rowElement, keyCode);
    // // const nextRowElement = this.getPrevNextRow(rowElement, keyCode);
    // if (nextRowElement) {
    //   // nextRowElement.focus();
    //   let index = this.prevIndex;
    //   if (keyCode === Keys.up) {
    //     if (this.prevIndex - 1 < 0) {
    //       return;
    //     } 
    //     index = this.prevIndex - 1;
    //   } else if (keyCode === Keys.down) {
    //     if (this.prevIndex + 1 >= this.rows.length) {
    //       return;
    //     }
    //     index = this.prevIndex + 1
    //   }
    //   const row = this.rows[index];
    //   this.selectRow({ shiftKey: false, ctrlKey: false } as any, index, row);
    //   const bodyRect = this.$parent.$el.getBoundingClientRect();
    //   const rowRect = nextRowElement.getBoundingClientRect();
    //   const top = rowRect.top - bodyRect.top;
    //   let h = 0;
    //   if (keyCode === Keys.down) {
    //     h = (top + height) - bodyRect.height;
    //   } else if (keyCode === Keys.up) {
    //     h = top;
    //   }
    //   // console.log('before incOffset', h, bodyRect, rowRect, nextRowElement);
    //   if (h > 0 && keyCode === Keys.down) {
    //     // console.log('incOffset', h + 5);
    //     (this.scroller as any).incOffset(h + 5);
    //   } else if (h < 0 && keyCode === Keys.up) {
    //     (this.scroller as any).incOffset(h);
    //   }
    //   // (this.$el as any).focus();
    //   (nextRowElement as any).focus();
    // }
  }

  getPrevNextRowElement(rowElement: Element, keyCode: number): Element {
    if (rowElement) {
      let focusElement: Element;
      if (keyCode === Keys.up) {
        focusElement = rowElement.previousElementSibling;
      } else if (keyCode === Keys.down) {
        focusElement = rowElement.nextElementSibling;
      }
      return focusElement;
    }
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

  getPrevNextRow1(rowElement: any, keyCode: number): any {
    const parentElement = rowElement.parentElement;
    // const parentElement = rowElement.closest('.datatable-row-wrapper');

    if (parentElement) {
      let focusElement: HTMLElement;
      if (keyCode === Keys.up) {
        focusElement = parentElement.previousElementSibling;
      } else if (keyCode === Keys.down) {
        focusElement = parentElement.nextElementSibling;
      }
      // return focusElement;
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
