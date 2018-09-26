import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  template: `
    <div
      class="datatable-footer-inner"
      :class="{'selected-count': selectedMessage}"
      :style = "{ 'height': footerHeight + 'px' }">
      <slot v-bind:row="{ rowCount: rowCount, pageSize: pageSize, 
                          selectedCount: selectedCount, curPage: curPage, offset: offset }">
        <div class="page-count">
          <span v-if="selectedMessage">
            {{selectedCount.toLocaleString()}} {{selectedMessage}} / 
          </span>
          {{rowCount.toLocaleString()}} {{totalMessage}}
        </div>
      </slot>
      <!-- <datatable-pager *ngIf="!footerTemplate"
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        (change)="page.emit($event)">
      </datatable-pager> -->
    </div>
  `,
})
export default class DataTableFooterComponent extends Vue {

  @Prop() footerHeight: number;
  @Prop() rowCount: number;
  @Prop() pageSize: number;
  @Prop() offset: number;
  @Prop() pagerLeftArrowIcon: string;
  @Prop() pagerRightArrowIcon: string;
  @Prop() pagerPreviousIcon: string;
  @Prop() pagerNextIcon: string;
  @Prop() totalMessage: string;
  // @Prop() footerTemplate: DatatableFooterDirective;

  @Prop() selectedCount: number = 0;
  @Prop() selectedMessage: string | boolean;

  // @Output() page: EventEmitter<any> = new EventEmitter();

  get isVisible(): boolean {
    return (this.rowCount / this.pageSize) > 1;
  }

  get curPage(): number {
    return this.offset + 1;
  }

}
