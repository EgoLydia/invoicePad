<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Don't have an account?
                <router-link class="router-link" :to="{ name: 'Register' }">Signup here</router-link>
            </p>
            <h2>Welcome Back! </h2>
            <div class="inputs">

                <div class="input">
                    <input type="text" placeholder="Username" v-model.trim="email" />
                    <img src="../assets/Icons/user-alt-light.svg" class="icon" alt="" />
                </div>

                <div class="input">
                    <input type="password" placeholder="Password" v-model.trim="password" />
                    <img src="../assets/Icons/lock.alt.solid.svg" class="icon" alt="" />
                </div>
                <div v-show="error" class="error">{{ this.errorMsg }}</div>
            </div>
            <button @click.prevent="login">Login</button>
        </form>
    </div>
</template>
