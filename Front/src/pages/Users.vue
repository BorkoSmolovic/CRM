<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Users
        <q-btn label="Add user" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person_add"/>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table :rows="data" :columns="columns" hide-bottom>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense/>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense/>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'
import axios from 'axios'

const data = [
  {
    id: '1',
    name: 'Pratik Patel',
    email: 'pratik@gmail.com',
  },
  {
      id: '2',
    name: 'Mayank Patel',
    email: 'mayank@gmail.com',
  },
  {
    id: '3',
    name: 'Mayur Patel',
    email: 'mayur@gmail.com',
  },
  {
    id: '4',
    name: 'Jeff Galbraith',
    email: 'jeff@gmail.com',
  }
];

const columns = [
    {name: 'Id', label: 'Id', field: 'id', sortable: true, align: 'left'},
    {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
    {name: 'Email', label: 'Email', field: 'email', sortable: true, align: 'left'},
    {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
];


export default defineComponent({
  name: "TableActions",
  setup() {
    return {
      data,
      columns,
    }
  },
  methods: {
      getUsers(){
          axios
        .get("/api/users")
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          //if user isnt logged he is pushed to login page
          if (error.response.status == 401) {
            this.$router.push("/Login");
          }
        });
      }
  },
  mounted(){
      this.getUsers();
  }
})
</script>

<style scoped>

</style>
