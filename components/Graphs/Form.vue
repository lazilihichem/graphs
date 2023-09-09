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
          outlined
          :rules="nameRules"
        ></v-text-field>
        <v-textarea
          v-model="form.description"
          label="Description"
          outlined
          :rules="descriptionRules"
        ></v-textarea>
        <div
          v-if="!onEdit"
          class="d-flex justify-end">
          <o-button
            class="mx-2"
            text="Create and draw"
            color="primary"
            outlined
            @click="createAndDraw"
          />

          <o-button
            text="Create "
            color="primary"
            @click="create"
          />

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
