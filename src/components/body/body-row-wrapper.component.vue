<template functional>
  <div class="datatable-row-wrapper" :style="props.styleObject">
    <datatable-group-header
      v-if="props.groupHeader" 
      class="datatable-group-header"
      :style="{ 'transform': 'translate3d(' + props.offsetX + 'px, 0px, 0px)', 'backface-visibility': 'hidden', 'width': props.innerWidth, 'height': props.groupRowHeight? props.groupRowHeight + 'px': 'auto' }"
      :group="props.row"
      :expanded="props.expanded"
      :groupHeaderSlot="props.groupHeaderSlot"
      @group-toggle="listeners['group-toggle']($event)"
      @contextmenu="listeners['row-contextmenu']($event, props.row)">
    </datatable-group-header>
    <div v-if="(props.groupHeader && props.expanded) || !props.groupHeader">
      <slot>
        <!-- here datatable-body-row -->
      </slot>
    </div>
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


