<template>
 <div>
  <v-data-table
    :headers="headers"
    :items="rows"
    item-value="name"
    class="elevation-1"
    :search="search"
    :custom-filter="filter"
  >
    <template
      v-if="withFilter"
      v-slot:top>
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
      ></v-text-field>
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="d-flex align-center justify-center">
        <v-btn
          v-if="!noView"
          class="mx-2"
          fab
          dark
          x-small
          depressed
          color="green"
          @click="viewRow(item)"
        >
          <v-icon small>
            mdi-eye
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          dark
          depressed
          x-small
          color="primary"
          @click="updateRow(item)"
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
          depressed
          color="red"
          @click="deleteRow(item)"
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
  emits: ['deleteRow', 'updateRow', 'viewRow'],
  props: {
    withActions: {
      default: false,
      required: false,
      type: Boolean
    },
    noView: {
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
    },
    withFilter: {
      required: false,
      type: Boolean,
      default: Boolean,
    }
  },
  data(){
    return {
      search: '',
      searchKey: 'name',
    }
  },
  computed: {
    headers(){
      if(this.withActions)
        return this.columns.concat({text: 'Actions', value: 'actions', align: 'center'})
      return this.columns
    },
  },
  methods: {
    deleteRow(item){
      this.$emit('deleteRow', item)
    },
    updateRow(item){
      this.$emit('editRow', item)
    },
    viewRow(item){
      this.$emit('viewRow', item)
    },
    filter (value, search) {
      return value != null &&
        search != null &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
    },
  }
}
</script>

<style scoped>

</style>
