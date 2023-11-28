<template>
  <div class="container">
    <div class="card login-card">
      <div class="row">
        <div class="col-sm-7 login-left-col">
          <!-- Your left column content -->
        </div>
        <div class="col-sm-5 login-right-col">
          <div class="col-sm-7">
            <img :src="companyLogo" class="img-fluid img-responsive company-logo">
          </div>
          <div class="col-sm-7">
            <h5 style="text-align: left; margin-left: 10px;">Login-Here</h5>
          </div>
          <br>
          <div class="col-sm-8 login-form">
            <input v-model="username" type="text" placeholder="Username" required>
            <br>
            <div class="password-input-container">
              <input v-model="password" :type="passwordFieldType" placeholder="Password" required>
              <i class="password-icon" @click="togglePasswordVisibility">
                <i v-if="passwordFieldType === 'password'" class="fas fa-eye"></i>
                <i v-else class="fas fa-eye-slash"></i>
              </i>
            </div>
            <br>
            <button class="login-btn" @click="submitForm">Login</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAlertMsg" style="color: red; text-align: center;">
      Please Enter Correct Username and Password
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
// import { apiUrl } from 'Z:/Kavisoftek-admin/admin-panel/config.js';



export default {
  name: 'LoginPage',
  data() {
    return {
      companyLogo: './assets/kavisoftek.png',
      username: '',
      password: '',
      showAlertMsg: false,
      passwordFieldType: 'password',
    };
  },
  methods: {
    async submitForm() {
      try {
        // Reset alert message
        this.showAlertMsg = false;

        if (!this.username || !this.password) {
          this.showAlertMsg = true;
          console.error('Please enter both username and password');
          return;
        }

        const response = await axios.post(`http://192.168.1.3:5000/adminlogin`, {
          username: this.username,
          password: this.password,
        });

        if (response && response.data) {
          if (response.data.success) {
            console.log('Authentication Successful:', response.data);

            this.$router.push('/employee');

            this.username = '';
            this.password = '';

            this.showAlertMsg = false;
          } else {
            // Handle invalid credentials
            this.showAlertMsg = true;
            console.error('Invalid username or password');
          }
        } else {
          console.error('Invalid response from the server:', response);
        }
      } catch (error) {
        this.username = '';
        this.password = '';

        if (error.response && error.response.status === 401) {
          this.showAlertMsg = true;
          console.error('Invalid username or password');
        } else {
          console.error('Authentication Failed:', error.response ? error.response.data : error.message);
        }
      }
    },


    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },

  },
}
</script>
  
<style scoped>
.login-left-col {
  background-image: linear-gradient(to bottom, #0066b3, #02298a, #021b79);
  border-radius: 5px 0px 0px 5px;
}

.login-form {
  float: left;
  text-align: left;
}

.login-form input {
  padding: 8px;
  width: 100%;
  border-radius: 20px;
  border: 0.5px solid rgb(218, 211, 211);
  margin: 12px 0px;
}

.login-btn {
  width: 100%;
  border-radius: 20px;
  padding: 8px;
  background-color: #0066b3;
  border: 0.5px solid transparent;
  color: white;
  margin-top: 14px;
}

.login-right-col {
  padding: 140px 60px;
}

.login-card {
  margin-top: 9%;
}

.login-left-text {
  text-align: left;
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-family: 'Montserrat', sans-serif;
  font-family: 'Orbitron', sans-serif;
  font-family: 'Poppins', sans-serif;
  font-family: 'Raleway', sans-serif;
}

.password-input-container {
  position: relative;
}

.password-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
}
</style>
  