<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="users"
    sort-by="id"
    class="elevation-1"
    :single-select="singleSelect"
    show-select
  >
    <template v-slot:[`item.is_active`]="{ item }">
      <v-simple-checkbox v-model="item.is_active" disabled></v-simple-checkbox>
    </template>
    <template v-slot:[`item.is_superuser`]="{ item }">
      <v-simple-checkbox
        v-model="item.is_superuser"
        disabled
      ></v-simple-checkbox>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Token</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn large color="primary" @click="deleteItems(selected)">
          DELETE TOKENS
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
// import {api} from "@/api/api";
export default {
  data: () => ({
    singleSelect: false,
    selected: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "OWNER ID", value: "owner_id" },
      { text: "CREATED_DT", value: "created_dt" },
      { text: "TOKEN", value: "token" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    tokens: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      // api
      //   .getUsers()
      //   .then((res) => {
      //     console.log(res);
      //     this.users = res.data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },

    deleteItem() {
      // api
      //   .deleteToken(token.id)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // this.editedIndex = this.users.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // this.dialogDelete = true;
    },

    deleteItems(items) {
      console.log(items);
    },
    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
