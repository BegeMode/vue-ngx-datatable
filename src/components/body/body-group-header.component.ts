import { TGroupByField } from 'components/datatable.component';
import { VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IGroupedRows } from '../../types/grouped-rows';

@Component({
  template: `
    <div
      :class="{ 'datatable-icon-right': !expanded, 'datatable-icon-down': expanded, 'active': active }"
      :style="styles"
      title="Expand/Collapse Group"
      @click="toggleExpandGroup"
    >
      <slot name="groupHeader" v-bind="{ group: group, expanded: expanded, level: groupLevel, groupBy: groupBy }">
        <span
          ><b>{{ groupTitle }}</b></span
        >
      </slot>
    </div>
  `,
})
export default class DataTableBodyGroupHeaderComponent extends Vue {
  @Prop({ default: 0 }) rowHeight: number | ((group?: IGroupedRows, index?: number) => number);
  @Prop() group: IGroupedRows;
  @Prop() expanded: boolean;
  @Prop() active: boolean;
  @Prop() groupHeaderSlot: (obj: Record<string, unknown>) => VNode[];
  @Prop() groupLevel: number;
  @Prop() groupRowsBy: Array<TGroupByField | Array<TGroupByField>>;
  @Prop() offsetX: number;

  created(): void {
    if (this.groupHeaderSlot) {
      this.$slots.groupHeader = this.groupHeaderSlot({
        group: this.group,
        expanded: this.expanded,
        level: this.groupLevel,
        groupBy: this.groupBy,
      });
    }
  }

  beforeUpdate(): void {
    if (this.groupHeaderSlot) {
      this.$slots.groupHeader = this.groupHeaderSlot({
        group: this.group,
        expanded: this.expanded,
        level: this.groupLevel,
        groupBy: this.groupBy,
      });
    }
  }

  /**
   * Toggle the expansion of a group
   */
  toggleExpandGroup(): void {
    this.$emit('group-toggle', {
      type: 'group',
      value: this.group,
    });
  }

  get groupTitle(): string {
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

  get styles(): Record<string, string> {
    return {
      'padding-left': this.groupLevel ? `${this.groupLevel * 10}px` : '5px',
      // don't horizontal scroll for group rows headers
      // transform: `translateX(${this.offsetX}px)`,
    };
  }

  get groupBy(): TGroupByField | Array<TGroupByField> {
    if (this.groupLevel && Array.isArray(this.groupRowsBy) && this.groupRowsBy.length - 1 >= this.groupLevel) {
      return this.groupRowsBy[this.groupLevel];
    }
    return null;
  }
}
