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
        <v-select label="from" :items="fromNodes" v-model="form.from" outlined :rules="requiredRules" />
        <v-select label="to" :items="toNodes" v-model="form.to" :rules="requiredRules" outlined />
        <button ref="submitBtn" class="hidden" />
      </v-form>
    </template>
  </o-modal>
</template>

<script>
export default {
  name: "RelationshipsForm",
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
    nodes: {
      required: true,
      type: Array,
    },
    value: false
  },
  data(){
    return {
      requiredRules: [
        v =>  !!v || "this field is requied",
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
    fromNodes(){
      return this.nodes
        .filter(node => node.id !== this.form.to)
        .map(node => ({text: node.tooltip, value: node.id}))
    },
    toNodes(){
      return this.nodes
        .filter(node => node.id !== this.form.from)
        .map(node => ({text: node.tooltip, value: node.id}))
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
