<template>
    <div class="d-flex flex-column ">
      <div class="d-flex px-4 py-6">
        <div class="w-20 font-weight-bold">
          Name
        </div>
        <div class="flex">
          {{ network.name }}
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex px-4 py-6">
        <div class="w-20 font-weight-bold">
          Description
        </div>
        <div class="flex">
          {{ network.description }}
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex px-4 py-6">
        <div class="w-20 font-weight-bold">
          Created at
        </div>
        <div class="flex">
          {{ network.created_at }}
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex px-4 py-6">
        <div class="w-20 font-weight-bold">
          Updated at
        </div>
        <div class="flex">
          {{ network.updated_at }}
        </div>
      </div>
      <v-divider></v-divider>
      <div
        v-if="withStatistics"
        class="d-flex px-4 py-6"
      >
        <div class="w-20 font-weight-bold">
          Node's count
        </div>
        <div class="flex">
          {{ network.nodes?.length }}
        </div>
      </div>
      <v-divider></v-divider>
      <div
        v-if="withStatistics"
        class="d-flex px-4 py-6"
      >
        <div class="w-20 font-weight-bold">
          Relationship's count
        </div>
        <div class="flex">
          {{ network.relationships?.length }}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "GraphDetails",
  props: {
    network: {
      required: true,
      type: Object
    },
    withStatistics: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.w-20 {
  width: 20rem;
}
</style>
