<template>
  <div
    id="row-group"
    class="datatable-body-row"
    :class="cssClasses"
    :style="styles"
    :tabIndex="-1"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeyDown"
  >
    <div
      class="datatable-row-group"
      v-for="colGroup of columnsByPin"
      :key="colGroup.type"
      :class="'datatable-row-' + colGroup.type"
      :style="groupStyles(colGroup)"
      @mouseenter="$emit('activate', row)"
    >
      <!-- <div v-for="(column, ii) of colGroup.columns" :key="column.$$id">
      <span>{{row[column.prop]}}</span>
      </div>-->
      <datatable-body-cell
        v-for="(column, ii) of colGroup.columns"
        :key="`${column.$$id}-${counter}`"
        tabIndex="-1"
        :rowContext="rowContext"
        :column="column"
        :cellSlot="slots()[column.prop]"
        :renderTracking="renderTracking"
        :displayCheck="displayCheck"
        @activate="onActivate($event, ii)"
        @tree-action="onTreeAction"
        @mouseenter="onMouseenter"
        @cell-created="onCellRendered"
        @cell-updated="onCellRendered"
      ></datatable-body-cell>
      <!-- <datatable-body-cell v-for="(column, ii) of colGroup.columns" :key="column.$$id"
      tabindex="-1"
      :row="row"
      :group="group"
      :expanded="expanded"
      :isSelected="isSelected"
      :rowIndex="rowIndex"
      :column="column"
      :rowHeight="rowHeight"
      :displayCheck="displayCheck"
      :treeStatus="treeStatus">
      </datatable-body-cell>-->
    </div>
  </div>
</template>
<script src="./body-row.component.ts"></script>
