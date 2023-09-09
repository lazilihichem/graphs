<template>
  <v-form>
    <o-page-header
      :text="`Edit ${network.name}`"
      with-action
      action-text="View Statistics"
      action-icon="mdi-check"
      with-back-btn
      @actionBtnClicked="seeStatistics"
    />
    <graphs-form :form="network" on-edit />
    <div class="pb-8">
      <o-page-header
        text="Nodes list"
        with-action
        small
        @actionBtnClicked="openNodeModal()"
      />
      <o-table
        :columns="nodesColumns"
        :rows="nodes"
        with-actions
        no-view
        @updateRow="openNodeModal(true, $event)"
        @deleteRow="removeNode"
      />
    </div>

    <v-divider />

    <div class="pt-2 pb-8">
      <o-page-header
        text="Relationships list"
        with-action
        small
        @actionBtnClicked="openRelationshipsModal()"
      />
      <o-table
        :columns="relationshipsColumns"
        :rows="relationships"
        with-actions
        no-view
        @updateRow="openRelationshipsModal(true, $event)"
        @deleteRow="removeRelationship"
      />
    </div>

    <nodes-node-form
      v-model="openNodeForm"
      :form="nodeForm"
      @validated="saveNode"
    />


    <relationships-form
      v-model="openRelationshipsForm"
      :nodes="nodes"
      :form="relationshipForm"
      @validated="saveRelationship"
    />

    <v-divider />

    <div v-if="nodes.length">
      <o-page-header
        text="Graph structure"
        small
        @actionBtnClicked="openRelationshipsModal()"
      />
      <graphs-draw
        :nodes="nodes"
        :relationships="relationships"
      />
    </div>

    <v-divider />
    <div class="d-flex justify-end pt-8">
      <o-button
        text="Save network"
        @click="saveNetwork"
        icon="mdi-content-save"
      />
    </div>
    <v-snackbar
      v-model="relationshipExistsSnackbar"
      :timeout="4000"
    >
      this relationship already exists
    </v-snackbar>
  </v-form>
</template>

<script>
import graphsController from "~/controllers/GraphsController";
import generateIdForCollection from "~/helpers/GenerateIdForCollection";

export default {
  name: "edit",
  data(){
    return {
      network: {
        nodes: [],
        relationships: []
      },
      nodes: [],
      nodesColumns: [
        {
          value: 'id',
          text: 'Id'
        },
        {
          value: 'tooltip',
          text: 'Tooltip'
        },
      ],
      relationshipsColumns: [
        {
          value: 'from_name',
          text: 'From'
        },
        {
          value: 'to_name',
          text: 'To'
        },
      ],
      relationships: [],
      nodeForm: {},
      relationshipForm: {},
      toEdit: false,
      openNodeForm: false,
      openRelationshipsForm: false,
      relationshipExistsSnackbar: false,
    }
  },
  mounted(){
    this.fetchNetwork(parseInt(this.$route.params.id))
  },
  methods: {
    fetchNetwork(id) {
      this.network = graphsController.networkDetails(id)
      this.nodes = this.network.nodes
      this.relationships = this.network.relationships
    },
    openNodeModal(edit = false, form = {}){
      this.toEdit = edit
      this.nodeForm = form
      this.openNodeForm = true
    },
    saveNode(node){
      this.openNodeForm = false
      const id = generateIdForCollection(this.nodes)
      if(!this.toEdit){
        this.nodes.push({ ...node, id })
      }
    },
    removeNode(nodeToDelete){
      this.nodes = this.nodes.filter(node => node.id !== nodeToDelete.id)
      this.relationships = this.relationships.filter((relation) => ![relation.from, relation.to].includes(nodeToDelete.id))
    },
    openRelationshipsModal(edit = false, form = {}){
      this.toEdit = edit
      this.relationshipForm = form
      this.openRelationshipsForm = true
    },
    saveRelationship(relationship){
      this.openRelationshipsForm = false
      if(this.relationships.findIndex((relation) => relation.from === relationship.from && relation.to === relationship.to) > -1){
        this.relationshipExistsSnackbar = true
        return;
      }
      if(!this.toEdit){
        const from_name = this.nodes.find((node) => node.id === relationship.from)?.tooltip
        const to_name = this.nodes.find((node) => node.id === relationship.to)?.tooltip

        this.relationships.push({...relationship, from_name, to_name })
      }
    },
    removeRelationship(relationshipToDelete){
      this.relationships = this.relationships.filter(relationship => relationship.from !== relationshipToDelete.from || relationship.to !== relationshipToDelete.to)
    },
    seeStatistics(){
      this.$router.push(`/graphs/${this.network.id}/statistics`)
    },
    saveNetwork(){
      this.network.nodes = this.nodes
      this.network.relationships = this.relationships.map(relation => ({
        from: relation.from,
        to: relation.to
      }))
      graphsController.updateNetwork(this.network.id, this.network)
      this.$router.push(`/graphs/${this.network.id}/statistics`)
    }
  }
}
</script>

<style scoped>

</style>
