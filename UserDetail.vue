<template>
    <div class="user-detail-page">
        <div class="container">
            <div class="row" v-for="user in users" :to="'/employee/' + user.id" :key="user.id">
                <div class="col-sm-4">
                    <div>
                        <img :src="user && user.image ? user.image : '/assets/profile.jpeg'"
                            class="img-fluid img-responsive user-profile">
                    </div>
                </div>
                <div class="col-sm-8">
                    <!-- Display other user details here -->
                    <h2>{{ user ? user.name : 'User Name' }}</h2>
                    <p>Designation: {{ user ? user.designation : '' }}</p>
                    <p>Employee ID: {{ user ? user.employeeid : '' }}</p>
                    <p>Status: {{ user ? user.status : '' }}</p>
                    <!-- Add other details as needed -->
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'UserDetail',
    data() {
        return {
            users: [
                {
                    id: 3,
                    name: 'Rifa Zairah',
                    designation: 'Developer',
                    employeeid: 2203,
                    status: 'Active',
                },
            ]
        };
    },
};
</script>
  
<style scoped>
.user-detail-page {
    margin-top: 5%;
}

.user-profile {
    border-radius: 50%;
    border: 1px solid grey;
    width: 280px;
}
</style>
  