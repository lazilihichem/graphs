<template>
  <div
    class="d-flex justify-space-between align-center "
    :class="small ? 'py-4' : 'py-10'"
  >
    <div class="d-flex items-center">
      <v-icon
        v-if="withBackBtn"
        size="40px"
        class="text-black mr-4 cursor-pointer"
        @click="$router.go(-1)"
      >
        mdi-arrow-left
      </v-icon>
      <h3
        class=" text--primary"
        :class="small ? 'text-md-h6' : 'text-md-h3'"
      >
        {{ text }}
      </h3>
    </div>

    <o-button
      v-if="withAction"
      :text="actionText"
      :small="small"
      :icon="actionIcon"
      @click="$emit('actionBtnClicked')"
    />
  </div>
</template>

<script>
export default {
  name: "OPageHeader",
  emit: ['actionBtnClicked'],
  props: {
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
    text: {
      type: String,
      required: true
    },
    withAction: {
      type: Boolean,
      required: false,
      default: false
    },
    withBackBtn: {
      type: Boolean,
      required: false,
      default: false
    },
    actionText: {
      type: String,
      required: false,
      default: 'Add'
    },
    actionIcon: {
      type: String,
      required: false,
      default: 'mdi-plus'
    },
    actionColor: {
      type: String,
      required: false,
      default: 'primary'
    }
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
