<template functional>
  <div class="datatable-row-wrapper" :style="props.styleObject">
    <datatable-group-header 
      v-if="props.groupHeader" 
      class="datatable-group-header"
      :style="{ 'transform': 'translate3d(' + props.offsetX + 'px, 0px, 0px)', 'backface-visibility': 'hidden', 'width': props.innerWidth }"
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
    <div v-else-if="slots().rowDetail && props.expanded"
      :style="{'height': props.detailRowHeight + 'px'}" class="datatable-row-detail">
      <slot name="row-detail" v-bind="{ row: props.row, expanded: props.expanded, rowIndex: props.rowIndex }"></slot>
    </div>
  </div>
</template>
<script src="./body-row-wrapper.component.ts"></script>
<style scoped lang="scss">
</style>


