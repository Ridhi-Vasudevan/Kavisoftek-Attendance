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
                        <input v-model="userForm.maritalstatus" id="userMaritalStatus" placeholder="Marital Status"
                            required>
                    </div>

                    <div class="col-sm-3">
                        <input v-model="userForm.gender" id="userGender" placeholder="Gender" required>
                    </div>

                    <div class="col-sm-3">
                        <input v-model="userForm.phonenumber" id="userPhoneNumber" placeholder="Phone Number" required>
                    </div>

                    <!-- Row -->
                    <div class="col-sm-3">
                        <input v-model="userForm.altphoneno" id="userAltPhoneNo" placeholder="Alternate Phone Number"
                            required>
                    </div>

                    <div class="col-sm-3">
                        <input v-model="userForm.officialemail" id="userOfficialEmail" placeholder="Official Email"
                            required>
                    </div>

                    <div class="col-sm-3">
                        <input class="img-input" type="file" id="userImage" ref="userImageInput" @change="handleImageChange"
                            accept="image/*">
                        <img v-if="userForm.image" :src="userForm.image" alt="Selected Image"
                            style="max-width: 100%; max-height: 100px; margin-top: 10px;">
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
        async toggleFilter() {
            this.showFilter = !this.showFilter;
        },
        showAddUserForm() {
            this.showAddUser = true;
            this.editingUser = null;
            this.resetUserForm();
        },
        async addOrUpdateUser() {
            if (this.userForm.image) {
                const formData = new FormData();
                Object.entries(this.userForm).forEach(([key, value]) => {
                    if (key === 'image') {
                        const blob = this.dataURItoBlob(value);
                        formData.append(key, blob, 'userImage.jpg');
                    } else {
                        formData.append(key, value);
                    }
                });
                try {
                    if (this.editingUser) {
                        // Update user
                        const response = await axios.put(
                            `http://192.168.3:5000/employees/${this.editingUser.id}`,
                            formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            }
                        );
                        const updatedUser = response.data;
                        const index = this.users.findIndex((user) => user.id === this.editingUser.id);
                        if (index !== -1) {
                            this.$set(this.users, index, updatedUser);
                        }
                    } else {
                        // Add new user
                        const response = await axios.post(
                            'http://192.168.1.3:5000/employees',
                            formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            }
                        );
                        const newUser = response.data;
                        this.users.push(newUser);
                    }
                } catch (error) {
                    console.error('Error adding/updating user:', error);
                }
            } else {
                // If no image is selected, proceed with the existing logic
                if (this.editingUser) {
                    // Update user
                    try {
                        const response = await axios.put(
                            `http://192.168.1.3:5000/employees/${this.editingUser.id}`,
                            this.userForm
                        );
                        const updatedUser = response.data;
                        const index = this.users.findIndex((user) => user.id === this.editingUser.id);
                        if (index !== -1) {
                            this.$set(this.users, index, updatedUser);
                        }
                    } catch (error) {
                        console.error('Error updating user:', error);
                    }
                } else {
                    // Add new user
                    try {
                        const response = await axios.post(
                            'http://192.168.1.3:5000/employees',
                            this.userForm
                        );
                        const newUser = response.data;
                        this.users.push(newUser);
                    } catch (error) {
                        console.error('Error adding user:', error);
                    }
                }
            }

            // Reset form and hide
            this.resetUserForm();
            this.showAddUser = false;

        },

        editUser(user) {
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

    //edit user
    async mounted() {
        try {
            const response = await axios.get('http://192.168.1.3:5000/employees');
            console.log('API Response:', response.data);
            this.users = response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },
    handleImageChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // Store the image data as a base64 string in userForm
            this.userForm.image = reader.result;
        };

        if (file) {
            reader.readAsDataURL(file);
        }
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
};
</script>