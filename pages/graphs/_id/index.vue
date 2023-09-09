<template>
  <div>
    <o-page-header
      text="Network details"
      with-back-btn
     />
    <v-divider></v-divider>
    <graphs-graph-details :network="network" />
    <delete-modal
      v-model="deletionModalVisible"
      :network="network"
      @deleted="networkDeleted"
    />
    <div class="d-flex justify-end pt-8">
      <o-button
        text="Cancel"
        outlined
        @click="$router.go(-1)"
      />
      <o-button
        class="mx-2"
        text="Delete"
        color="red"
        icon="mdi-delete"
        @click="openDeleteModal"
      />
      <o-button
        text="Edit"
        icon="mdi-pencil"
        @click="goToEdit"
      />
    </div>
  </div>
</template>

<script>
import DeleteModal from "~/components/Graphs/DeleteModal";
import graphController from "~/controllers/GraphsController";
export default {
  name: "index",
  components: {DeleteModal},
  data(){
    return {
      network: {
        id: 10,
        name: 'Graph one',
        description: 'description of the graph',
        created_at: '',
        updated_at: ''
      },
      deletionModalVisible: false
    }
  },
  mounted(){
    this.fetchNetwork(parseInt(this.$route.params.id))
  },
  methods: {
    fetchNetwork(id){
      console.log(id)
      console.log(graphController.seeNetwork(id))
      this.network  = graphController.seeNetwork(id)
    },
    openDeleteModal(){
      this.deletionModalVisible = true
    },
    networkDeleted(){
      this.$router.push('/')
    },
    goToEdit(){
      return this.$router.push(`/graphs/${this.network.id}/edit`)
    }
  }
}
</script>

<style scoped>
.text-white {
  color: white
}
</style>
