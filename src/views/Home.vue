<template>
    <div v-if="invoiceStore.user" class="home container">
        <h3 v-if="invoiceStore.user">{{ auth.currentUser?.displayName }}</h3>
        <div class="header flex">
            <div class="left flex flex-column">
                <h1>Invoices </h1>
                <span>There are {{ invoiceStore.invoicesData.length }} total invoices</span>
            </div>
            <div class="right flex">
                <div class="filter flex" @click="toggleFilterMenu">
                    <span>Filter by status <span v-if="filterInvoice">: {{ filterInvoice }}</span></span>
                    <img src="src\assets\icon-arrow-down.svg" alt="">
                    <ul class="filter-menu" v-show="filterMenu">
                        <li @click="filterInvoices">Draft</li>
                        <li @click="filterInvoices">Pending</li>
                        <li @click="filterInvoices">Paid</li>
                        <li @click="filterInvoices">Clear Filter</li>
                    </ul>
                </div>
                <div class="button flex" @click="newInvoice">
                    <div class="inner-button-flex">
                        <img src="src\assets\icon-plus.svg" alt="">
                    </div>
                    <span>New Invoice</span>
                </div>
                <div class=" button red" @click="logOut">
                    Logout
                </div>
            </div>
        </div>
        <div v-if="invoiceStore.invoicesData.length > 0">
            <Invoice :invoice="invoice" v-for="invoice, index in filteredData" :key="index" />
        </div>
        <div v-else class="empty flex flex-column">
            <img src="src\assets\illustration-empty.svg" alt="">
            <h3>There is nothing here</h3>
            <p>Create a new invoice by clicking the New Invoice button and get started</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useInvoiceStore } from '../stores/index';
import Invoice from '../components/invoice.vue';
import { auth } from '../firebase/fbInit';
import { signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';

const invoiceStore = useInvoiceStore()
const filterMenu = ref(false)
const filterInvoice = ref(null)
const toggleFilterMenu = () => {
    filterMenu.value = !filterMenu.value
}
const router = useRouter()

const logOut = async () => {
    await signOut(auth)
    invoiceStore.isLogin = false
    router.push({ name: 'Login' })
}
const newInvoice = () => {
    invoiceStore.showInvoiceModal = !invoiceStore.showInvoiceModal
}

const filterInvoices = (e) => {
    if (e.target.innerText === 'Clear Filter') {
        filterInvoice.value = null
        return;
    }
    filterInvoice.value = e.target.innerText
}

const filteredData = computed(() => {
    return invoiceStore.invoicesData.filter((invoice) => {
        if (filterInvoice.value === 'Draft') {
            return invoice.invoiceDraft === true
        }
        if (filterInvoice.value === 'Pending') {
            return invoice.invoicePending === true
        }
        if (filterInvoice.value === 'Paid') {
            return invoice.invoicePaid === true
        }
        return invoice
    })
})
</script>

<style lang="scss" scoped>
.home {
    color: #fff;

    .header {
        margin-bottom: 65px;

        .left,
        .right {
            flex: 1;
        }

        .right {
            justify-content: flex-end;
            align-items: center;

            .button,
            .filter {
                align-items: center;

                span {
                    font-size: 12px;
                }
            }

            .filter {
                position: relative;
                margin-right: 40px;
                cursor: pointer;

                img {
                    margin-left: 12px;
                    width: 9px;
                    height: 5px;
                }

                .filter-menu {
                    width: 120px;
                    position: absolute;
                    top: 25px;
                    list-style: none;
                    background-color: #1e2139;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                    li {
                        cursor: pointer;
                        font-size: 12px;
                        padding: 10px 20px;

                        &:hover {
                            color: #1e2139;
                            background-color: #fff;
                        }
                    }
                }
            }

            .button {
                padding: 8px 10px;
                background-color: #7c5dfa;
                border-radius: 40px;

                .inner-button {
                    margin-right: 8px;
                    border-radius: 50%;
                    padding: 8px;
                    align-items: center;
                    justify-content: center;
                    background-color: #fff;

                    img {
                        width: 10px;
                        height: 10px;
                    }
                }
            }
        }
    }

    .red {
        background-color: #ec5757 !important;
    }

    .empty {
        margin-top: 160px;
        align-items: center;

        img {
            width: 214px;
            height: 200px;
        }

        h3 {
            font-size: 20px;
            margin-top: 40px;
        }

        p {
            text-align: center;
            max-width: 224px;
            font-size: 12px;
            font-weight: 300;
            margin-top: 16px;
        }
    }
}
</style>