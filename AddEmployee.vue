<template>
     <form @submit.prevent="addOrUpdateUser" class="add-edit-user">
        <div class="row d-flex justify-content-center">

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
            <input v-model="userForm.contact" id="userContact" placeholder="Contact No" required>
          </div>

          <!-- Row -->
          <div class="col-sm-3">
            <input v-model="userForm.altnumber" id="userAltnumber" placeholder="Alterate Number" required>
          </div>

          <div class="col-sm-3">
            <input class="img-input" type="file" id="userImage" ref="userImageInput" @change="handleImageChange"
              accept="image/*">
            <img v-if="userForm.image" :src="userForm.image" alt="Selected Image"
              style="max-width: 100%; max-height: 100px; margin-top: 10px;">
          </div>


          <div class="col-sm-3">
            <input v-model="userForm.password" id="userPassword" placeholder="Password" required>
          </div>

          <div class="col-sm-3">
            <button type="submit">{{ editingUser ? 'Update User' : 'Save User' }}</button>
          </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'AddEmployee',
}
</script>

<style lang="scss" scoped></style>