import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

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
  @Prop({ default: 0 }) rowHeight: (number | ((group?: any, index?: number) => number));
  @Prop() row: any;
  @Prop() expanded: boolean;
  @Prop() rowDetailSlot: any;

  created() {
    if (this.rowDetailSlot) {
      this.$slots.rowDetail = this.rowDetailSlot({row: this.row, expanded: this.expanded});
    }
  }

  beforeUpdate() {
    if (this.rowDetailSlot) {
      this.$slots.rowDetail = this.rowDetailSlot({row: this.row, expanded: this.expanded});
    }
  }

  toggleExpandGroup() {
    //
  }
}
