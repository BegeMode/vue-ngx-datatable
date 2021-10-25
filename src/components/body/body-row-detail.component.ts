import { IGroupedRows } from 'types/grouped-rows';
import { VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  template: `
    <div style="padding-left:5px;">
      <slot name="rowDetail" v-bind="{ row: row, expanded: expanded }">
        <h3>detail row info</h3>
      </slot>
    </div>
  `,
})
export default class DataTableBodyRowDetailComponent extends Vue {
  @Prop({ default: 0 }) rowHeight: number | ((group?: IGroupedRows, index?: number) => number);
  @Prop() row: Record<string, unknown>;
  @Prop() expanded: boolean;
  @Prop() rowDetailSlot: (obj: Record<string, unknown>) => VNode[];

  created(): void {
    if (this.rowDetailSlot) {
      this.$slots.rowDetail = this.rowDetailSlot({ row: this.row, expanded: this.expanded });
    }
  }

  beforeUpdate(): void {
    if (this.rowDetailSlot) {
      this.$slots.rowDetail = this.rowDetailSlot({ row: this.row, expanded: this.expanded });
    }
  }

  toggleExpandGroup(): void {
    //
  }
}
