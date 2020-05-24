<template>
  <div class="datatable-row-wrapper" :style="styleObject" tabindex="-1">
    <datatable-group-header
      v-if="row && row.__isGroup" 
      class="datatable-group-header"
      :style="groupHeaderStyles"
      :group="row"
      :groupLevel="row.level"
      :groupRowsBy="groupRowsBy"
      :expanded="row.__expanded"
      :groupHeaderSlot="groupHeaderSlot"
      @group-toggle="$emit('group-toggle', $event)"
      @contextmenu="$emit('row-contextmenu', $event, row)">
    </datatable-group-header>
    <slot v-else>
      <!-- datatable-body-row here -->
    </slot>
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


