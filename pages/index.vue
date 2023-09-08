<template>
  <div class="d-flex flex-column gap-4">
    <div class="d-flex justify-space-between align-center py-10">
      <h3 class="text-md-h3 text--primary">
        Liste des graphs
      </h3>

      <v-btn
        prepend-icon="mdi-plus"
        color="primary"
      >
        Ajouter
      </v-btn>
    </div>

    <o-table :rows="graphs" :columns="headers" with-actions />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    graphs: [
      {
        id: 1,
        name: 'first graph',
        description: 'my awesome graph description',
      }
    ],
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
  }),
}
</script>
