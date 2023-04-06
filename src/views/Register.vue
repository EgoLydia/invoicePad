<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an account?
                <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
            </p>
            <h2>Send and Keep Track Of Your Invoices </h2>
            <span>Create an account</span>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="user.firstName" />
                    <img src="../assets/Icons/user-alt-light.svg" class="icon" alt="" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="user.lastName" />
                    <img src="../assets/Icons/user-alt-light.svg" class="icon" alt="" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Username" v-model="user.username" />
                    <img src="../assets/Icons/user-alt-light.svg" class="icon" alt="" />
                </div>
                <div class="input">
                    <input type="email" placeholder="Email" v-model="user.email" />
                    <img src="../assets/envelope-regular.svg" class="icon" alt="" />
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="user.password" />
                    <img src="../assets/Icons/lock.alt.solid.svg" class="icon" alt="" />
                </div>
                <div v-show="error" class="error">{{ errorMsg }}</div>

            </div>
            <button @click.prevent="signUp">Sign Up</button>
        </form>
    </div>
</template>
