<template>
  <div>
    <AdminPage v-if="isAdminPage" />
    <router-view v-else :key="$route.fullPath" />
  </div>
</template>


<script>
import AdminPage from '@/components/AdminPage.vue';
export default {
  name: 'App',
  components: {
    AdminPage,
  },
  computed: {
  isAdminPage() {
    return this.$route.name === 'admin'; 
},
 
},
}
</script>

<style>
#app {
  box-sizing: border-box;
  overflow-y: hidden;
}
</style>
