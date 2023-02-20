<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="id"
    class="elevation-1"
    single-expand
    :expanded.sync="expanded2"
    item-key="user_id"
    show-expand
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>USERS</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New User
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.user_id"
                      label="사번"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.password"
                      label="비밀번호"
                    ></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.user_name"
                      label="이름"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="이메일"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="핸드폰"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.auth"
                      label="권한"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.group_1"
                      label="소속1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.group_2"
                      label="소속2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.group_3"
                      label="소속3"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.group_4"
                      label="소속4"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.board_modules"
                      label="화면설정"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox
                      v-model="editedItem.is_active"
                      label="활성화"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox
                      v-model="editedItem.is_superuser"
                      label="관리자"
                    ></v-checkbox>
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
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        {{ item.board_modules }}
      </td>
    </template>
    <template v-slot:[`item.is_active`]="{ item }">
      <v-simple-checkbox v-model="item.is_active" disabled></v-simple-checkbox>
    </template>
    <template v-slot:[`item.is_superuser`]="{ item }">
      <v-simple-checkbox
        v-model="item.is_superuser"
        disabled
      ></v-simple-checkbox>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
    dialog: false,
    dialogDelete: false,
    singleExpand: true,
    expanded2: [],
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "User ID", value: "user_id" },
      { text: "User active", value: "is_active" },
      { text: "User admin", value: "is_superuser" },
      { text: "User Name", value: "user_name" },
      { text: "Email", value: "email" },
      { text: "auth", value: "auth" },
      { text: "group_1", value: "group_1" },
      { text: "group_2", value: "group_2" },
      { text: "group_3", value: "group_3" },
      { text: "group_4", value: "group_4" },
      // { text: "board_modules", value: "board_modules" },
      { text: "Actions", value: "actions", sortable: false },
      { text: "board_module", value: "data-table-expand" },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      user_id: 0,
      user_name: "",
      email: "",
      phone: "",
      auth: "",
      group_1: "",
      group_2: "",
      group_3: "",
      group_4: "",
      board_modules: "",
    },
    defaultItem: {
      id: "",
      user_id: "",
      user_name: "",
      email: "",
      phone: "",
      auth: "",
      group_1: "",
      group_2: "",
      group_3: "",
      group_4: "",
      board_modules: "",
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
        .getUsers()
        .then((res) => {
          console.log(res);
          this.users = res.data;
          // this.users.map((obj) => {
          //   obj.board_modules = JSON.stringify(obj.board_modules);
          //   return { ...obj };
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      api
        .deleteUser(item.id)
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
        Object.assign(this.users[this.editedIndex], this.editedItem);
        const formData = {
          user_id: this.editedItem.user_id,
          // password: this.editedItem.password,
          user_name: this.editedItem.user_name,
          email: this.editedItem.email,
          phone: this.editedItem.phone,
          auth: this.editedItem.auth,
          group_1: this.editedItem.group_1,
          group_2: this.editedItem.group_2,
          group_3: this.editedItem.group_3,
          group_4: this.editedItem.group_4,
          is_active: this.editedItem.is_active,
          is_superuser: this.editedItem.is_superuser,
          board_modules: this.editedItem.board_modules,
          // board_modules: JSON.parse(this.editedItem.board_modules),
        };

        api
          .updateUser(this.users[this.editedIndex].user_id, formData)
          .then((res) => {
            console.log(res);
            this.initialize();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const formData = {
          user_id: this.editedItem.user_id,
          // password: this.editedItem.password,
          // user_name: this.editedItem.user_name,
          // email: this.editedItem.email,
          // phone: this.editedItem.phone,
          //   is_active: true,
          //   is_superuser: true,
        };
        api
          .setUser(formData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // this.users.push(this.editedItem);
      // this.initialize();
      this.close();
    },
  },
};
</script>
