<template>
  <div>
    <o-page-header
      :text="`${network.name}'s statistics`"
      with-action
      action-text="Edit graph"
      action-color="green"
      action-icon="mdi-pencil"
      with-back-btn
      @actionBtnClicked="drawNetwork"
    />
    <graphs-graph-details :network="network" with-statistics />
    <v-divider />
    <o-page-header class="pt-10" text="Nodes statistics" small />
    <o-table :columns="nodesStatisticsColumns" :rows="nodesStatistics" />
  </div>
</template>

<script>
import graphsController from "~/controllers/GraphsController";

export default {
  name: "statistics",
  data(){
    return {
      network: {
        nodes: [],
        relationships: []
      },
      nodesStatisticsColumns: [
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: 'Tooltip',
          value: 'tooltip',
        },
        {
          text: 'Npde neighbors',
          value: 'neighbors',
        },
      ]
    }
  },
  computed: {
    nodesStatistics(){
      return this.network.nodes.map((node) => {
        return {
          ...node,
          neighbors: this.network
            .nodes
            .filter(currentNode => this.network.relationships.find(relationship =>
              (relationship.from === currentNode.id && relationship.to === node.id) ||  (relationship.from === node.id && relationship.to === currentNode.id)))
            .map(currentNode => currentNode.id)
            .join(', ') || '/'
        }
      })
    }
  },
  mounted(){
    this.fetchNetwork(parseInt(this.$route.params.id))
  },
  methods: {
    fetchNetwork(id){
      this.network = graphsController.networkDetails(id)
    },
    drawNetwork(){
      this.$router.push(`/graphs/${this.$route.params.id}/edit`)
    }
  }
}
</script>

<style scoped>

</style>
