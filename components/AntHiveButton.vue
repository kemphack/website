<template>
  <v-btn
    :outlined="outlined"
    :tile="tile"
    :large="large"
    :color="color"
    :to="to"
    :disabled="disabled"
    :dark="!light"
    fill
    class="anthive-btn"
    @click="$emit('click')">
    <span class="text"><slot/></span>
  </v-btn>
</template>

<script>
export default {
  name: 'AntHiveButton',
  props: {
    light: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    tile: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    color: { type: String, default: '' },
    to: { type: String, default: '' }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.anthive-btn {
  min-height: 40px;
  box-shadow: none;
  .text {
    line-height: 1;
    font-weight: $font-weight-bold;
    text-transform: none;
  }
}
</style>
