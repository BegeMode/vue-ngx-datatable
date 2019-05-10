<template functional>
  <div class="datatable-row-wrapper" :style="props.styleObject">
    <datatable-group-header
      v-if="props.groupHeader" 
      class="datatable-group-header"
      :style="{ 'transform': 'translate3d(' + props.offsetX + 'px, 0px, 0px)', 'backface-visibility': 'hidden', 'width': props.innerWidth, 'height': props.groupRowHeight? props.groupRowHeight + 'px': 'auto' }"
      :group="props.row"
      :groupLevel="props.groupLevel"
      :groupRowsBy="props.groupRowsBy"
      :expanded="props.expanded"
      :groupHeaderSlot="props.groupHeaderSlot"
      @group-toggle="listeners['group-toggle']($event)"
      @contextmenu="listeners['row-contextmenu']($event, props.row)">
    </datatable-group-header>
    <div v-if="(props.groupHeader && props.expanded) || !props.groupHeader">
      <slot>
        <!-- datatable-body-row here -->
      </slot>
    </div>
    <template v-if="props.row.groups && props.expanded">
      <datatable-row-wrapper class="datatable-row-wrapper" v-for="group of props.row.groups" :key="group.key"
          :groupedRows="props.groupedRows"
          :groupRowsBy="props.groupRowsBy"
          :row="group"
          :innerWidth="props.innerWidth"
          :rowDetail="props.rowDetail"
          :groupHeader="true"
          :groupLevel="group.level"
          :offsetX="props.offsetX"
          :groupRowHeight="props.groupRowHeight"
          :rowDetailHeight="props.rowDetailHeight"
          :expanded="parent.getRowExpanded(group)"
          :rowIndex="parent.getRowIndex(group)"
          :groupHeaderSlot="props.groupHeaderSlot"
          :rowDetailSlot="props.rowDetailSlot"
          @group-toggle="listeners['group-toggle']"
          @row-contextmenu="listeners['row-contextmenu']">
          <datatable-body-row
            v-for="(row,i) of group.value" :key="parent.rowTrackingFn(row)"
            tabindex="-1"
            :group="group.value"
            :columnsByPin="parent.columnsByPin"
            :columnGroupWidths="parent.columnGroupWidths"
            :isSelected="parent.isSelect(row)"
            :groupStyles="parent.getGroupStyles"
            :groupClass="parent.getGroupClass(row)"
            :rowStyles="parent.getRowStyles"
            :row="row"
            :displayCheck="parent.displayCheck"
            :treeStatus="row.treeStatus"
            :cellContext="parent.getCellContext"
            :cellColumnCssClasses="parent.cellColumnCssClasses"
            :cellStyleObject="parent.cellStyleObject"
            :marginCellStyle="parent.marginCellStyle"
            :slots=parent.cellSlots
            @tree-action="parent.onTreeAction(row)"
            @activate="parent.onActivate($event, i)">
        </datatable-body-row>
      </datatable-row-wrapper>
    </template>
    <datatable-row-detail
      v-if="props.rowDetail && props.expanded" 
      class="datatable-row-detail"
      :style="{'height': props.rowDetailHeight + 'px'}"
      :row="props.row"
      :expanded="props.expanded"
      :rowDetailSlot="props.rowDetailSlot"
      @detail-toggle="listeners['detail-toggle']($event)"
      @contextmenu="listeners['row-contextmenu']($event, props.row)">
    </datatable-row-detail>
  </div>
</template>
<script src="./body-row-wrapper.component.ts"></script>
<style scoped lang="scss">
</style>


