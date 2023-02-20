<template>
  <v-data-table
    v-model="selections"
    :headers="headers"
    :items="module_configs"
    :item-key="owner_id"
    sort-by="owner_id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Dashboard Config</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      v-model="editedItem.board_id"
                      readonly
                      label="board_id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="이름"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      v-model="editedItem.owner_id"
                      readonly
                      label="owner_id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      v-model="editedItem.board_module"
                      label="board_module"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this user?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- <v-btn large color="primary" @click="deleteItems(selected)">
          DELETE Dashboard Profile
        </v-btn> -->
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { api } from "@/api/api";
export default {
  data: () => ({
    selections: [],
    singleSelect: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "User ID",
        align: "start",
        sortable: false,
        value: "owner_id",
      },
      { text: "board_id", value: "board_id" },
      { text: "name", value: "name" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    module_configs: [
      { owner_id: "admin", board_id: "", name: "" },
      { owner_id: "admin2", board_id: "", name: "" },
    ],
    editedIndex: -1,
    editedItem: {
      owner_id: "",
      modules: [],
    },
    defaultItem: {
      owner_id: "",
      modules: [],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      api
        .getDashboardConfigs()
        .then((res) => {
          console.log(res.data);
          this.module_configs = res.data;
          this.module_configs.map((obj) => {
            obj.board_module = JSON.stringify(obj.board_module);
            return { ...obj };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editItem(item) {
      this.editedIndex = this.module_configs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      api
        .deleteConfig(item.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.module_configs[this.editedIndex], this.editedItem);
        const fromData = {
          board_id: this.editedItem.board_id,
          name: this.editedItem.board_name,
          owner_id: this.editedItem.owner_id,
          board_module: this.editedItem.board_module,
        };
        console.log(this.editedItem.board_id);
        api
          .updateDashboardConfig(this.editedItem.board_id, fromData)
          .then((res) => {
            this.initialize();
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.close();
      }
    },
  },
};
</script>
