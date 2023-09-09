<template>
  <v-btn
    :color="color"
    :small="small"
    :outlined="outlined"
    class="text-white"
    @click="$emit('click')"
  >
    {{ text }}
    <v-icon
      v-if="icon && icon !== ''"
      dark
      right
      :small="small"
    >
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "OButton",
  props: {
    color: {
      required: false,
      default: 'primary',
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    icon: {
      required: false,
      default: '',
      type: String,
    },
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
    outlined: {
      type: Boolean,
      required: false,
      default: false,
    },
  }
}
</script>

<style scoped>
.text-white {
  color: white
}
</style>
