<template functional>
  <div class="datatable-row-wrapper" :style="props.styleObject">
    <div v-if="slots().groupHeader" class="datatable-group-header"
      :style="{ 'transform': 'translate3d(' + props.offsetX + 'px, 0px, 0px)', 'backface-visibility': 'hidden', 'width': props.innerWidth }" 
      v-on:contextmenu="listeners.rowContextmenu($event, props.row)">
      <slot name="group-header" v-bind="{ row: props.row, expanded: props.expanded, rowIndex: props.rowIndex }"></slot>
    </div>
    <div v-else-if="(slots().groupHeader && props.expanded) || !slots().groupHeader">
      <slot></slot>
    </div>
    <div v-else-if="slots().rowDetail && props.expanded"
      :style="{'height': props.detailRowHeight + 'px'}" class="datatable-row-detail">
      <slot name="row-detail" v-bind="{ row: props.row, expanded: props.expanded, rowIndex: props.rowIndex }"></slot>
    </div>
  </div>
</template>
<script src="./body-row-wrapper.component.ts"></script>
<style scoped lang="scss">
</style>


