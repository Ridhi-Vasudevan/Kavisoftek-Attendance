<template>
  <div class="employee-page">
    <h4 class="page-head">Manage Employees</h4>
    <div class="emp-btn-row">
      <button @click="toggleFilter" class="filter-btn">
        <i class="fa-solid fa-sort"></i> Filter
      </button>
      <button @click="showAddUserForm" class="adduser-btn">
        <i class="fa-solid fa-plus"></i> Add User
      </button>
    </div>

    <div v-if="showAddUser || editingUser">
      <!-- Add/Edit User Form -->

      <form @submit.prevent="addOrUpdateUser" class="add-edit-user">
        <div class="row d-flex justify-content-center">

          <!-- Row -->
          <div class="col-sm-3">
            <input v-model="userForm.name" id="userName" placeholder="Name" required>
          </div>

          <div class="col-sm-3">
            <input v-model="userForm.designation" id="userDesignation" placeholder="Designation" required>
          </div>

          <div class="col-sm-3">
            <input v-model="userForm.status" id="userStatus" placeholder="Status" required>
          </div>

          <div class="col-sm-3">
            <input v-model="userForm.employeeid" id="userEid" placeholder="Employee ID" required>
          </div>

          <!-- Row -->
          <div class="col-sm-3">
            <input v-model="userForm.dob" id="userDob" placeholder="DOB Eg.yyyy-mm-dd" required>
          </div>

          <div class="col-sm-3">
            <input v-model="userForm.address" id="userAddress" placeholder="Address" required>
          </div>

          <div class="col-sm-3">
            <input v-model="userForm.email" id="userEmail" placeholder="Email" required>
          </div>

          <div class="col-sm-3">
            <input v-model="userForm.education" id="userEducation" placeholder="Education" required>
          </div>

          <!-- Row -->
          <div class="col-sm-3">
            <input v-model="userForm.location" id="userLocation" placeholder="Location" required>
          </div>

          <div class="col-sm-3">
            <input v-model="userForm.maritalstatus" id="userMaritalStatus" placeholder="Marital Status" required>
          </div>

          <div class="col-sm-3">
            <input v-model="userForm.gender" id="userGender" placeholder="Gender" required>
          </div>

          <div class="col-sm-3">
            <input v-model="userForm.phonenumber" id="userPhoneNumber" placeholder="Phone Number" required>
          </div>

          <!-- Row -->
          <div class="col-sm-3">
            <input v-model="userForm.altphoneno" id="userAltPhoneNo" placeholder="Alternate Phone Number" required>
          </div>

          <div class="col-sm-3">
            <input v-model="userForm.officialemail" id="userOfficialEmail" placeholder="Official Email" required>
          </div>

          <div class="col-sm-3">
            <input ref="imageUploader" type="file" accept=".jpg, .jpeg" @change="handleImageChange">
            <!-- <img v-if="userForm.image" :src="userForm.image" alt="Selected Image"
            style="max-width: 100%; max-height: 100px; margin-top: 10px;"> -->
          </div>

          <div class="col-sm-3">
            <button type="submit">{{ editingUser ? 'Update User' : 'Save User' }}</button>
          </div>
        </div>
      </form>
    </div>

    <!-- User List -->
    <div class="row userlist-table">
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Employee ID</th>
            <th style="text-align: center;">Status</th>
            <th style="text-align: center;">Action</th>
            <th style="text-align: center;">More</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="user-name">{{ user.name }}</td>
            <td>{{ user.designation }}</td>
            <td>{{ user.employeeid }}</td>
            <td style="text-align: center;">{{ user.status }}</td>
            <td class="action-btn d-flex justify-content-center">
              <button @click="editUser(user)" class="edit-btn">Edit</button>|
              <button @click="deleteUser(user.id)" class="trash-btn">Delete</button>
            </td>
            <td style="text-align: center;">
              <router-link v-if="user && user.id" :to="'/' + user.id" :key="user.id">
                <i class="fa fa-circle-chevron-right more-icon"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { apiUrl } from 'Z:/Kavisoftek-admin/admin-panel/config.js';


export default {
  name: 'EmployeePage',
  metaInfo: {
    requiresAuth: true,
  },
  data() {
    return {
      showFilter: false,
      showAddUser: false,
      users: [],
      editingUser: null,
      userForm: {
        name: '',
        dob: '',
        designation: '',
        address: '',
        email: '',
        image: null,
        employeeid: '',
        status: '',
        education: '',
        location: '',
        maritalstatus: '',
        gender: '',
        phonenumber: '',
        altphoneno: '',
        officialemail: '',
      },
    };
  },

  computed: {
    filteredUsers() {
      return this.users;
    },
  },
  methods:
  {
    async addOrUpdateUser() {
      if (this.userForm.image) {
        try {
          if (this.editingUser) {
            const response = await axios.put(
              `http://192.168.1.3:5000/employees/${this.editingUser.id}`,
              this.userForm
            );
            const updatedUser = response.data;
            const index = this.users.findIndex((user) => user.id === updatedUser.id);
            if (index !== -1) {
              this.$set(this.users, index, updatedUser);
            }
          } else {
            const response = await axios.post(
              'http://192.168.1.3:5000/employees',
              this.userForm
            );
            const newUser = response.data;
            this.users.push(newUser);
          }
          this.showAddUser = false;
          this.resetUserForm();
        } catch (error) {
          console.error('Error adding/updating user:', error);
        }
      }
    },
    showAddUserForm() {
      console.log(this.showAddUser);
      this.showAddUser = true;
      this.editingUser = null;
      this.resetUserForm();
    },

    editUser(user) {
      console.log(this.editingUser);
      this.showAddUser = true;
      this.editingUser = user;
      this.userForm = { ...user };
    },

    //delete user
    async deleteUser(userId) {
      try {
        await axios.delete(`http://192.168.1.3:5000/employees/${userId}`);
        this.users = this.users.filter((user) => user.id !== userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },


    handleImageChange(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      console.log(reader.result, event.target.files[0])
      setTimeout(() => {
        this.userForm.image = reader.result;
        console.log(reader.result, event.target.files[0])
      }, 2000)
    },

    dataURItoBlob(dataURI) {
      const arr = dataURI.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new Blob([u8arr], { type: mime });
    },

    resetUserForm() {
      this.editingUser = null;
      this.userForm = {
        name: '',
        dob: '',
        designation: '',
        address: '',
        email: '',
        image: null,
        employeeid: '',
        status: '',
        education: '',
        location: '',
        maritalstatus: '',
        gender: '',
        phonenumber: '',
        altphoneno: '',
        officialemail: '',
      };
    },
  },

  async mounted() {
    try {
      const response = await axios.get('http://192.168.1.3:5000/employees');
      console.log('API Response:', response.data);
      this.users = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },

};
</script>
  
<style scoped>
.employee-page {
  margin-top: 1% !important;
}

.page-head {
  font-size: 32px;
  color: #012970;

}

.emp-btn-row {
  margin: 30px 0px;
}

.emp-btn-row button {
  width: fit-content;
  padding: 8px 25px;
  border-radius: 5px;
  font-size: 18px;
}

.emp-btn-row button:hover {
  box-shadow: 0px 0px 6px #b4b2b2;
}

.filter-btn {
  margin-right: 15px;
  margin-left: 35px;
  background-color: white;
  border: 0.5px solid rgb(204, 199, 199);
}

.adduser-btn {
  margin-right: 20px;
  margin-left: 5px;
  background-color: rgb(0, 119, 255);
  border: 0.5px solid rgb(204, 199, 199);
  color: white;
}

.userlist-table {
  margin-left: 35px;
  background-color: white;
  border: 1px solid #cfcbcb;
  border-radius: 10px;
  max-width: 1290px;
}

.userlist-table thead tr {
  background-color: #f9fafb;
  color: #8a92a6;
  border-radius: 10px;

}

.userlist-table thead tr th,
td {
  padding: 15px 5px;
  padding-left: 20px;
  border-radius: 10px;
}

.userlist-table tr td {
  border-top: 0.5px solid rgb(238, 232, 232);
}

.userlist-table tr td::first-letter {
  text-transform: uppercase;
}

.action-btn button {
  border: none;
  background-color: transparent;
}

.edit-btn,
.trash-btn {
  color: grey;
}

.edit-btn:hover {
  color: green;
}

.trash-btn:hover {
  color: red;
}

.add-edit-user {
  border: 0.5px solid rgb(199, 195, 195);
  display: block;
  padding: 20px;
  width: 81.5%;
  margin-left: 35px;
  border-radius: 8px;
  margin-bottom: 3%;
  background-color: white;
}

.add-edit-user button {
  background-color: #0077ff;
  color: white;
  text-align: center;
  border: 0.5px solid grey;
  width: 100%;
  border-radius: 4px;
  padding: 6px;
  margin: 20px 0px;
  font-weight: 600;
}

.add-edit-user input {
  width: 100%;
  margin: 20px 0px;
  border: 0.5px solid rgb(173, 168, 168);
  border-radius: 4px;
  padding: 6px;
}

.more-icon {
  color: grey;
}

.more-icon:hover {
  color: black;
}

.img-input {
  padding: 3px !important;
}

tbody tr td.user-name {
  text-transform: uppercase;
}
</style>