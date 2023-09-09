<template>
  <o-modal
    v-model="open"
    :title="title"
    @validated="triggerSubmit"
  >
    <template #content>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="submit"
        lazy-validation
      >
        <v-text-field
          v-model="form.tooltip"
          outlined
          label="Node tooltip"
          :rules="requiredRules"
        ></v-text-field>
        <button ref="submitBtn" class="hidden" />
      </v-form>
    </template>
  </o-modal>
</template>

<script>
export default {
  name: "NodeForm",
  props: {
    onEdit: {
      required: false,
      default: false,
      type: Boolean
    },
    form: {
      required: true,
      type: Object,
    },
    value: false
  },
  data(){
    return {
      requiredRules: [
        v => !!v || 'this field is required',
      ],
      valid: false,
    }
  },
  computed: {
    title () {
      return this.onEdit ? 'Edit a node' : 'Create a new Node'
    },
    actionLabel(){
      return this.onEdit ? 'Edit' : 'Create'
    },
    open: {
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  },
  methods: {
    async submit(){
      await this.$refs.form.validate()
      if(!this.valid)
        return

      this.$refs.form.resetValidation()
      this.$emit('validated', this.form)
    },
    triggerSubmit(){
      this.$refs.submitBtn.click()
    }
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
