<template>
  <div>
    <div class="">
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="submit"
        lazy-validation
      >
        <v-text-field
          v-model="form.name"
          label="Name"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="form.description"
          label="Description"
          :rules="descriptionRules"
        ></v-text-field>
        <div
          v-if="!onEdit"
          class="d-flex justify-end">
          <v-btn
            class="mx-2"
            @click="createAndDraw"
            color="primary"
          >
            Create and Draw
          </v-btn>
          <v-btn
            @click="create"
            color="primary"
          >
            Create
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: {
    onEdit: {
      required: false,
      default: false,
      type: Boolean,
    },
    form: {
      required: true,
      type: Object,
    }
  },
  data(){
    return {
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v?.length > 3 || 'Name must be mote than 3 characters',
      ],
      descriptionRules: [
        v => !!v || 'Name is required',
        v => v?.length > 3 || 'Name must be mote than 3 characters',
      ],
    }
  },
  methods: {
    async submit(draw = false){
      await this.$refs.form.validate()
      if(!this.valid)
        return

      this.$emit('validated', {graph: this.form, draw})
    },
    create(){
      this.submit()
    },
    createAndDraw(){
      this.draw = true
      this.submit(true)
    },
  }
}
</script>

<style scoped>

</style>
