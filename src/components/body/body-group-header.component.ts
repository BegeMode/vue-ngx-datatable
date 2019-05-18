import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { IGroupedRows } from '../../types/grouped-rows';

@Component({
  template: `
      <div :class="{ 'datatable-icon-right': !expanded, 'datatable-icon-down': expanded }" :style="styles" 
            title="Expand/Collapse Group" @click="toggleExpandGroup">
        <slot name="groupHeader" v-bind="{ group: group, expanded: expanded, level: groupLevel, groupBy: groupBy }">
          <span><b>{{groupTitle}}</b></span>
        </slot>  
      </div>                          
  `,
})
export default class DataTableBodyGroupHeaderComponent extends Vue {
  @Prop({ default: 0 }) rowHeight: (number | ((group?: any, index?: number) => number));
  @Prop() group: IGroupedRows;
  @Prop() expanded: boolean;
  @Prop() groupHeaderSlot: any;
  @Prop() groupLevel: number;
  @Prop() groupRowsBy: string | any[];
 
  created() {
    if (this.groupHeaderSlot) {
      this.$slots.groupHeader = this.groupHeaderSlot({
        group: this.group,
        expanded: this.expanded,
        level: this.groupLevel,
        groupBy: this.groupBy
      });
    }
  }

  beforeUpdate() {
    if (this.groupHeaderSlot) {
      this.$slots.groupHeader = this.groupHeaderSlot({
        group: this.group,
        expanded: this.expanded,
        level: this.groupLevel,
        groupBy: this.groupBy
      });
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

  get groupTitle() {
    let result = '';
    if (this.group && this.group.keys) {
      this.group.keys.forEach(gr => {
        if (!result) {
          result += `${gr.title} - ${gr.value}`;
        } else {
          result += `; ${gr.title} - ${gr.value}`;

        }
      });
    }
    return result;
  }

  get styles() {
    return {
      'padding-left': this.groupLevel ? (this.groupLevel * 10) + 'px' : '5px',
    };
  }

  get groupBy() {
    if (this.groupLevel !== undefined && this.groupLevel !== null
      && Array.isArray(this.groupRowsBy) && this.groupRowsBy.length - 1 >= this.groupLevel) {
      return this.groupRowsBy[this.groupLevel];
    }
    return null;
  }
}
