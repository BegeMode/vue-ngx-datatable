<template>
  <div id="row-group" :class="groupClass" :style="rowStyles(row)">
    <div
      class="datatable-row-group"
      v-for="(colGroup, i) of columnsByPin"
      :key="colGroup.type"
      :class="'datatable-row-' + colGroup.type"
      :style="groupStyles(colGroup)"
      @keydown="$emit('keydown', row)"
      @mouseenter="$emit('activate', row)"
    >
      <!-- <div v-for="(column, ii) of colGroup.columns" :key="column.$$id">
      <span>{{row[column.prop]}}</span>
      </div>-->
      <datatable-body-cell
        v-for="(column, ii) of colGroup.columns"
        :key="column.$$id"
        tabIndex="-1"
        :context="cellContext(row, group, column)"
        :cellColumnCssClasses="cellColumnCssClasses"
        :cellStyleObject="cellStyleObject"
        :marginCellStyle="marginCellStyle"
        :slot="cellSlots[column.prop]"
        @activate="onActivate($event, ii)"
        @treeAction="onTreeAction"
        @keydown="onKeyDown"
        @mouseenter="onMouseenter"
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
<script src="./body-row.component1.ts"></script>
