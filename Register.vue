<template>
    <div class="registration-page">
        <h2>Register</h2>
        <form @submit.prevent="registerUser">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="user.username" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="user.password" required />
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input :type="showPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" required />
            </div>
            <div class="form-group">
                <input type="checkbox" id="showPassword" v-model="showPassword" />
                <label for="showPassword">View Password</label>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'RegisterPage',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: '',
            },
            confirmPassword: '',
            showPassword: false, // Added for toggling password visibility
        };
    },
    methods: {
        async registerUser() {
            // Check if passwords match
            if (this.user.password !== this.confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                // Make API call for user registration
                const response = await axios.post('http://192.168.1.3:5000/user', this.user);

                // Handle the response as needed
                console.log('Registration successful:', response.data);

                // Clear form fields after successful registration
                this.user = {
                    username: '',
                    email: '',
                    password: '',
                };
                this.confirmPassword = '';

                // Display a success message or navigate to another page
                alert('Registration successful!');
            } catch (error) {
                console.error('Error during registration:', error);

                // Handle registration error, show appropriate message to the user
                alert('Registration failed. Please try again.');
            }
        },
    },
};
</script>
  
<style scoped>
/* Your styling remains the same */
</style>
  
<style scoped>
.registration-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    margin-bottom: 10px;
}

button {
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
  