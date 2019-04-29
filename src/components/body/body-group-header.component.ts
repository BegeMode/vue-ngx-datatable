import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  template: `
      <div style="padding-left:5px;">
        <a href="#" :class="{ 'datatable-icon-right': !expanded, 'datatable-icon-down': expanded }"
           title="Expand/Collapse Group"
           @click="toggleExpandGroup">
           <slot name="groupHeader" v-bind="{ group: group, expanded: expanded }">
             <b>{{group.key}}</b>
           </slot>  
        </a>                          
      </div>
  `,
})
export default class DataTableBodyGroupHeaderComponent extends Vue {
  @Prop({ default: 0 }) rowHeight: (number | ((group?: any, index?: number) => number));
  @Prop() group: any;
  @Prop() expanded: boolean;
  @Prop() groupHeaderSlot: any;

  created() {
    if (this.groupHeaderSlot) {
      this.$slots.groupHeader = this.groupHeaderSlot({group: this.group, expanded: this.expanded});
    }
  }

  beforeUpdate() {
    if (this.groupHeaderSlot) {
      this.$slots.groupHeader = this.groupHeaderSlot({group: this.group, expanded: this.expanded});
    }
  }

  /**
   * Toggle the expansion of a group
   */
  toggleExpandGroup(): void {
    this.$emit('group-toggle', {
      type: 'group',
      value: this.group
    });
  }

  /**
   * Expand all groups
   */
  expandAllGroups(): void {
    this.$emit('group-toggle', {
      type: 'all',
      value: true
    });
  }

  /**
   * Collapse all groups
   */
  collapseAllGroups(): void {
    this.$emit('group-toggle', {
      type: 'all',
      value: false
    });
  }
}
