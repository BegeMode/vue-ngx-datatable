<template>
  <div class="datatable-row-wrapper" :style="styleObject">
    <datatable-group-header
      v-if="groupHeader" 
      class="datatable-group-header"
      :style="groupHeaderStyles"
      :group="row"
      :groupLevel="groupLevel"
      :groupRowsBy="groupRowsBy"
      :expanded="expanded"
      :groupHeaderSlot="groupHeaderSlot"
      @group-toggle="$emit('group-toggle', $event)"
      @contextmenu="$emit('row-contextmenu', $event, row)">
    </datatable-group-header>
    <div v-if="(groupHeader && expanded) || !groupHeader">
      <slot>
        <!-- datatable-body-row here -->
      </slot>
    </div>
    <template v-if="row.groups && expanded">
      <datatable-row-wrapper class="datatable-row-wrapper" v-for="group of row.groups" :key="group.key"
          :groupedRows="groupedRows"
          :groupRowsBy="groupRowsBy"
          :row="group"
          :innerWidth="innerWidth"
          :rowDetail="rowDetail"
          :groupHeader="true"
          :groupLevel="group.level"
          :offsetX="offsetX"
          :groupRowHeight="groupRowHeight"
          :rowDetailHeight="rowDetailHeight"
          :expanded="parent.getRowExpanded(group)"
          :rowIndex="parent.getRowIndex(group)"
          :groupHeaderSlot="groupHeaderSlot"
          :rowDetailSlot="rowDetailSlot"
          @group-toggle="$emit('group-toggle', $event)"
          @row-contextmenu="$emit('row-contextmenu', $event, row)">
          <datatable-body-row
            v-for="(row,i) of group.value" :key="i"
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
            @tree-action="parent.onTreeAction({row: row})"
            @activate="parent.onActivate($event, i)">
        </datatable-body-row>
      </datatable-row-wrapper>
    </template>
    <datatable-row-detail
      v-if="rowDetail && expanded" 
      class="datatable-row-detail"
      :style="{'height': rowDetailHeight + 'px'}"
      :row="row"
      :expanded="expanded"
      :rowDetailSlot="rowDetailSlot"
      @detail-toggle="$emit('detail-toggle', $event)"
      @contextmenu="$emit('row-contextmenu', $event, row)">
    </datatable-row-detail>
  </div>
</template>
<script src="./body-row-wrapper.component.ts"></script>
<style scoped lang="scss">
</style>


