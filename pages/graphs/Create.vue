<template>
  <div>
    <o-page-header
      text="Create a new network"
      with-back-btn
    />
    <graphs-form :form="{}" @validated="saveGraph"/>
  </div>
</template>

<script>
import graphController from "~/controllers/GraphsController";
export default {
  name: "create.vue",
  data(){
    return {
      form: {
        name: '',
        description: ''
      },
      valid: false,
      draw: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length > 3 || 'Name must be mote than 3 characters',
      ],
      descriptionRules: [
        v => !!v || 'Name is required',
        v => v.length > 3 || 'Name must be mote than 3 characters',
      ],
    }
  },
  methods: {
    saveGraph({graph, draw}){
      console.log(graph, draw)
      const createdNetwork = graphController.createNetwork(graph)

      if(draw)
        return  this.$router.push(`/graphs/${createdNetwork}/edit`)

      return this.$router.push(`/graphs/${createdNetwork}`)
    }
  }
}
</script>

<style scoped>

</style>
