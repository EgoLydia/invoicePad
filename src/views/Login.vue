<template>
          <div class="form-wrap">
            <form class="register">
              <p class="login-register">
                Don't have an account?
                <router-link class="router-link" :to="{ name: 'Register' }"
                  >Signup here</router-link
                >
              </p>
              <h2>Welcome Back!</h2>
              <div class="inputs">
                <div class="input">
                  <input type="email" placeholder="Email" v-model.trim="user.email" />
                  <img src="../assets/Icons/user-alt-light.svg" class="icon" alt="" />
                </div>
                <router-link class="forgot" :to="{ name: 'Forgot Password' }"
                >Forgot Password?</router-link
              >
                <div class="input">
                  <input
                    type="password"
                    placeholder="Password"
                    v-model.trim="user.password"
                  />
                  <img src="../assets/Icons/lock.alt.solid.svg" class="icon" alt="" />
                </div>
                <div v-show="error" class="error">{{ this.errorMsg }} Try again</div>
              </div>
      
              <button @click.prevent="login">Login</button>
            </form>
          </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useInvoiceStore } from "../stores";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/fbInit";

const invoiceStore = useInvoiceStore();

const router = useRouter();

const user = invoiceStore.user;

const errorMsg = ref("");
const error = ref(false);

const login = async () => {
    signInWithEmailAndPassword(auth, user.email, user.password)
        .then(() => {
            router.push({ name: "Home" });
            error.value = false;
            errorMsg.value = "";
        })
        .catch((err) => {
            error.value = true;
            errorMsg.value = err.message;
        });
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
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

  .forgot {
    color: #fff;
    font-size: 12px;
  }

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
      margin-bottom: 40px;
    }
    .error {
      color: red;
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
      max-width: 350px;

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
        }
      }
    }
  }
}
</style>
