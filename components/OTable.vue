<template>
 <div>
  <v-data-table
    :headers="headers"
    :items="rows"
    item-value="name"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <div class="d-flex align-center justify-center">
        <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="primary"
        >
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          dark
          x-small
          color="red"
        >
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-table>
 </div>
</template>

<script>
export default {
  name: "OTable",
  props: {
    withActions: {
      default: false,
      required: false,
      type: Boolean
    },
    rows: {
      required: true,
      type: Array,
    },
    columns: {
      required: true,
      type: Array,
    }
  },
  computed: {
    headers(){
      if(this.withActions)
        return this.columns.concat({text: 'Actions', value: 'actions', align: 'center'})
      return this.columns
    },
  }
}
</script>

<style scoped>

</style>
