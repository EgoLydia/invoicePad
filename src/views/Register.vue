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
  
<script setup lang="ts" >
import { User } from '../data'
import { reactive, ref } from 'vue';
import { useInvoiceStore } from '../stores';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase/fbInit'

const invoiceStore = useInvoiceStore();

const router = useRouter()

const user = reactive<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: '',
    password: "",

})

const errorMsg = ref('')
const error = ref(false)

const signUp = async () => {
    if (user.firstName !== '' && user.email !== '' && user.lastName !== '' && user.password !== '' && user.username !== '') {
        error.value = false
        errorMsg.value = ''
        const createUser = await createUserWithEmailAndPassword(auth, user.email, user.password)
        const response = await createUser;
        console.log(response);
        if (auth.currentUser)
            updateProfile(auth.currentUser, {
                displayName: user.firstName,
            })

        router.push({ name: 'Home' })
        return;
    }
    error.value = true
    if (user.password.length < 6) {
        errorMsg.value = "Password should be at least 6 characters"
    } errorMsg.value = 'Please fill all fields'
    return;
}

</script>
  
<style lang="scss" scoped>
.register {
    h2 {
        max-width: 600px;
        margin-bottom: 10px;
    }
}

.form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;

    @media (min-width: 900px) {
        width: 100%;
    }

    .login-register {
        margin-bottom: 32px;
        color: #fff;

        .router-link {
            color: #7c5dfa;
        }
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;

        @media (min-width: 900px) {
            padding: 0 50px;
        }

        h2 {
            text-align: center;
            font-size: 32px;
            color: #fff;


            @media (min-width: 900px) {
                font-size: 40px;
            }
        }

        span {
            margin-bottom: 20px;
            color: #fff;
        }

        button {
            padding: 8px 30px;
            background-color: #7c5dfa;
            border-radius: 40px;
            border: none;
            color: #fff;
            margin-top: 20px;

            .inner-button {
                margin-right: 8px;
                border-radius: 50%;
                padding: 8px;
                align-items: center;
                justify-content: center;
                background-color: #fff;


            }
        }

        .inputs {
            width: 100%;
            max-width: 600px;

            .input {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;

                input {
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 4px 4px 4px 30px;
                    height: 50px;

                    &:focus {
                        outline: none;
                    }
                }

                .icon {
                    width: 12px;
                    position: absolute;
                    left: 6px;
                    color: black;
                }
            }
        }

        .error {
            color: rgba(255, 94, 94, 0.856);
        }

        .angle {
            display: none;
            position: absolute;
            background-color: #fff;
            transform: rotateZ(3deg);
            width: 60px;
            right: -30px;
            height: 101%;

            @media (min-width: 900px) {
                display: initial;
            }
        }
    }

    .background {
        display: none;
        flex: 2;
        background-size: cover;
        background-image: url("../assets/background.jpg");
        width: 100%;
        height: 100%;

        @media (min-width: 900px) {
            display: initial;
        }
    }
}
</style>