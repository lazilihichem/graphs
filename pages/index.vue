<template>
  <div class="d-flex flex-column gap-4">

    <o-page-header
      text="Networks list"
      with-action
      @actionBtnClicked="addNewGraph"
    />

    <o-table
      :rows="networks"
      :columns="headers"
      with-actions
      with-filter
      @deleteRow="deleteNetworkHandler"
      @editeRow="editGraph"
      @viewRow="viewGraph"
    />

    <graphs-delete-modal
      v-model="networkDeletionModalVisible"
      :network="networkToBeDeleted"
      @deleted="fetchNetworks"
    />
  </div>
</template>

<script>
import graphController from "~/controllers/GraphsController";
export default {
  name: 'IndexPage',
  data: () => ({
    networks: [],
    headers: [
      {
        text: 'Id',
        align: 'start',
        value: 'id',
        sortable: false,
      },
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
    ],
    networkToBeDeleted: {},
    networkDeletionModalVisible: false
  }),
  mounted(){
    this.fetchNetworks()
  },
  methods: {
    fetchNetworks(){
      this.networks = graphController.list()
    },
    deleteNetworkHandler(network){
      this.networkToBeDeleted = network
      this.networkDeletionModalVisible = true
    },
    addNewGraph(){
      this.$router.push('Graphs/create')
    },
    viewGraph(network){
      this.$router.push(`graphs/${network.id}`)
    },
    editGraph(network){
      this.$router.push(`graphs/${network.id}/edit`)
    },
  }
}
</script>
