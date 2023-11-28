<template>
    <div class="body">
        <div class="row">
            <TopBar />
        </div>
        <div class="row">
            <div class="col-sm-2">
                <SideBar />
            </div>
            <div class="col-sm-10">
                <router-view />
            </div>
        </div>
    </div>
</template>
 
<script>
import SideBar from './SideBar.vue';
import TopBar from './TopBar.vue';




export default {
    name: 'AdminPage',
    components: { TopBar, SideBar },
    
    // beforeRouteEnter(to, from, next) {
    //     const isAuthenticated = /* Implement your authentication check logic here */;

    //     // If the user is not authenticated, redirect to the login page
    //     if (!isAuthenticated) {
    //         next('/login'); // Replace '/login' with your actual login route
    //     } else {
    //         next();
    //     }
    // },

}
</script>
 
<style scoped>
.body {
    background-color: #e7edfa;
}
</style>