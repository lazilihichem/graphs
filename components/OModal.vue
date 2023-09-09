<template>
  <v-dialog
    v-model="open"
    width="500"
  >
    <v-card>
      <v-card-title class="text-h5 grey lighten-2 d-flex justify-between align-center">
        <h5 class="flex">
          {{ title }}
        </h5>
        <v-btn text  x-small rounded fab>
          <v-icon
            class="cursor-pointer"
            color="black"
            @click="closeModal"
          >
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-6 text-black">
        <p v-if="!$slots.content">
          {{ content }}
        </p>
        <slot name="content" />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="closeModal"
          outlined
        >
          Cancel
        </v-btn>
        <v-btn
          class="text-white"
          :color="!danger ? 'primary' : 'red'"
          @click="$emit('validated')"
        >
          {{ actionText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OModal",
  emits: ['input', 'validated'],
  props: {
    title: {
      required: true,
      type: String
    },
    content: {
      required: false,
      type: String,
    },
    actionText: {
      required: false,
      default: 'Ok',
      type: String,
    },
    value: {
      required: false,
      type: Boolean
    },
    danger: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  computed: {
    open: {
      get() {
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  },
  methods: {
    closeModal(){
      this.open = false
    }
  }
}
</script>

<style scoped>
.text-white {
  color: white;
}
</style>
