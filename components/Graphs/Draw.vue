<template>
  <div>
    <network ref="network" :nodes="mappedNodes" :edges="relationships" :options="options" />
  </div>
</template>

<script>

export default {
  name: "Draw",
  props: {
    nodes: {
      required: true,
      type: Array
    },
    relationships: {
      required: true,
      type: Array
    },
  },
  data() {
    return {
      options: {
        height: '380px',
        nodes: {
          size: 100,
        },
      }
    }
  },
  computed: {
    mappedNodes(){
      return this.nodes?.map(node => ({
        ...node,
        label: node.id.toString(),
        title: node.tooltip,
        shape: 'circle'
      })) ?? []
    }
  }
}
</script>

<style scoped>

</style>
