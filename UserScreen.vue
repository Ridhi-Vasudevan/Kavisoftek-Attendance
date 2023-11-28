<template>
    <div class="emp-body">
        <div class="emp-head">Employee Profile Page</div>
        <div class="container emp-container">
            <div class="row" v-if="loading">
                <p>Loading...</p>
            </div>
            <div class="row" v-else-if="user">
                <div class="col-sm-4">
                    <img :src="user.image" class="img-fluid img-responsive profile-pic" />
                </div>
                <div class="col-sm-1 col-offset-1"></div>
                <div class="col-sm-6 emp-text-details">
                    <div>
                        <h2 class="emp-name">{{ user.name }}</h2>
                        <h6 class="emp-role">{{ user.designation }}</h6>
                    </div>

                    <div class="p-details">
                        <div class="pd-label">Personal Details:</div>
                        <div>DOB: <span class="user-numbers">{{ user.dob }}</span></div>
                        <div>Email: {{ user.email }}</div>
                        <div>Phone: <span class="user-numbers">{{ user.contact }}</span></div>
                        <div>Alternate Phone: <span class="user-numbers"> {{ user.alternumber }}</span></div>
                        <div>Address: {{ user.address }}</div>
                        <div>Official Email-ID: {{ user.offEmail }}</div>
                    </div>
                </div>
            </div>
            <div class="row" v-else>
                <p>No data found for the specified user.</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
    name: 'UserScreen',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            router: useRoute(),
            user: [], // Initialize as an empty array
            loading: true,
        };
    },

    computed: {
        users() {
            const userId = this.id; // Use the correct prop name here
            return this.users.find((user) => user.id === userId) || null;
        },
    },


    async mounted() {
    try {
        const response = await axios.get(
            `http://192.168.1.3:5000/employees?id=${this.id}`
        );

        console.log('API Response:', response.data);
        this.user = response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
    } finally {
        this.loading = false;
    }
},

};
</script>

    
<style scoped>
.emp-body {
    margin: 20px;
    font-family: 'Josefin Sans', sans-serif;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Orbitron', sans-serif;
    font-family: 'Poppins', sans-serif;
    font-family: 'Raleway', sans-serif;
}

.emp-head {
    font-size: 32px;
    text-align: left;
    font-weight: 570;
    color: #012970;
}

.profile-pic {
    border-radius: 50%;
    object-fit: cover;
    width: 90%;
    border: 1.5px solid #012970;
    margin-top: 25%;

}

.emp-container {
    margin-top: 5%;
}

.emp-text-details {
    padding: 2% 0px;
}

.emp-name {
    font-size: 50px;
    color: #434344;
}

.emp-role {
    font-size: 26px;
    color: #68696b;
    font-style: italic;
}

.p-details {
    padding: 10% 0px;
}

.p-details div {
    font-size: 23px;
    padding: 4px 0px;
    color: #5e5f61;

}

.pd-label {
    font-weight: bold;
    font-size: 22px;
}

.user-numbers {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 100;
}
</style>