import EmployeePage from './components/Employee.vue';
import LoginPage from './components/Login.vue';
import RegisterPage from './components/Register.vue';
import AttendanceForm from './components/AttendanceForm';
import AdminPage from './components/AdminPage';
import HomePage from './components/Home.vue';
import ResponsePage from './components/Response.vue';
import UserProfile from './components/UserProfile.vue';




import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'RegisterPage',
        component: RegisterPage,
        path: '/register'
    },
    {
        name: 'LoginPage',
        component: LoginPage,
        path: '/login'
    },
    {
        name: 'AttendanceForm',
        component: AttendanceForm,
        path: '/attendance-form'
    },

    {
        name: 'HomePage',
        component: HomePage,
        path: '/'
    },
    {
        name: 'ResponsePage',
        component: ResponsePage,
        path: '/response'
    },
   
    {
        path: '/admin-panel',
        component: AdminPage,
        children: [
            {
                path: '/employee',
                component: EmployeePage,
                name: 'EmployeePage'
            },
            {
                name: 'UserProfile1',
                component: UserProfile,
                path: '/:id',
                props: true
            },
            
        ],
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;