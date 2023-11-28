<template>
    <div>
        <UserDetail :user="currentUser" />
    </div>
</template>
  
<script>
import UserDetail from './UserDetail.vue';
import axios from 'axios';

export default {
    components: {
        UserDetail,
    },
    data() {
        return {
            users: [
                {
                    "id": 3,
                    "name": "Rifa Zairah",
                    "designation": "Developer",
                    "employeeid": 2203,
                    "status": "Active"
                },
                {
                    "id": 4,
                    "name": "Kokila",
                    "designation": "Developer",
                    "employeeid": 2203,
                    "status": "Active"
                },
                {
                    "id": 2,
                    "name": "Venkat",
                    "designation": "Developer",
                    "employeeid": 2203,
                    "status": "Active"
                },
                {
                    "id": 6,
                    "name": "Sakthi",
                    "designation": "Developer",
                    "employeeid": 2203,
                    "status": "Active"
                },
                {
                    "id": 8,
                    "name": "Mubeen Rahuman",
                    "designation": "Developer",
                    "employeeid": 2203,
                    "status": "Active"
                },
                {
                    "id": 9,
                    "name": "Harish",
                    "designation": "Developer",
                    "employeeid": 2203,
                    "status": "Active"
                },
                {
                    "id": 10,
                    "name": "Pradeep",
                    "designation": "Developer",
                    "employeeid": 2203,
                    "status": "Active"
                }
            ],
            currentUser: null,
            userId: this.user.id,

        };
    },
    // async mounted() {
    //     try {
    //         // Replace USER_ID with the actual ID you want to fetch
    //         const response = await axios.get(`http://192.168.1.12:5000/employees/${userId}`);
    //         this.currentUser = response.data;
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // },
};
</script>
  