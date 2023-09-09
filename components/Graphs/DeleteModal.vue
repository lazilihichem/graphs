<template>
  <o-modal
    v-model="networkDeletionModalVisible"
    title="Delete network"
    :content="`if you click on 'Delete' the graph ${network.name} will be permanently deleted`"
    action-text="Delete"
    danger
    @close="close"
    @validated="removeGraph"
  />
</template>

<script>
import graphsController from "~/controllers/GraphsController";

export default {
  name: "DeleteModal",
  emits: ['input'],
  props: {
    network: {
      required: true,
      type: Object,
    },
    value: {
      required: true,
      type: Boolean,
    }
  },
  computed: {
    networkDeletionModalVisible: {
      get() {
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  },
  methods: {
    close(){
      this.networkDeletionModalVisible = false
    },
    removeGraph(){
      console.log('deleting network', this.network.id)
      graphsController.deleteNetwork(this.network.id)
      this.networkDeletionModalVisible = false
      this.$emit('deleted')
    },
  }
}
</script>

<style scoped>

</style>
