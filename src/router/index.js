import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import InvoiceView from '../views/InvoiceView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/invoice/:invoiceId",
        name: "Invoice",
        component: InvoiceView,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/forgot-password",
        name: "Forgot Password",
        component: ForgotPassword,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;