<template>
    <div v-if="currentInvoice" class="invoice-view container">
        <router-link :to="{ name: 'Home' }" class="nav-link flex">
            <img src="../assets/icon-arrow-left.svg" alt="">
            Go Back
        </router-link>
        <!-- header -->
        <div class="header flex">
            <div class="left flex">
                <span>Status</span>
                <div class="status-button flex"
                    :class="{ paid: currentInvoice?.invoicePaid, draft: currentInvoice?.invoiceDraft, pending: currentInvoice?.invoicePending }">
                    <span v-if="currentInvoice?.invoicePaid">Paid</span>
                    <span v-if="currentInvoice?.invoiceDraft">Draft</span>
                    <span v-if="currentInvoice?.invoicePending">Pending</span>

                </div>
            </div>
            <div class="right flex">
                <button class="dark-purple" @click="toggleEditInvoice">Edit</button>
                <button class="red" @click="deleteInvoice(currentInvoice?.docId)">Delete</button>
                <button v-show="currentInvoice?.invoicePending" class="green"
                    @click="updateStatusToPaid(currentInvoice?.docId)">Mark as Paid
                </button>
                <button v-show="currentInvoice?.invoiceDraft || currentInvoice?.invoicePaid" class="orange"
                    @click="updateStatusToPending(currentInvoice?.docId)">Mark as Pending
                </button>
            </div>
        </div>

        <!-- Invoice Details -->
        <div class="invoice-details flex flex-column">
            <div class="top flex">
                <div class="left flex flex-column">
                    <p><span>#</span>{{ shortenId(currentInvoice?.docId, 6) }}</p>
                    <p>{{ currentInvoice?.productDescription }}</p>
                </div>
                <div class="right flex flex-column">
                    <p>{{ currentInvoice?.billerStreetAddress }}</p>
                    <p>{{ currentInvoice?.billerCity }}</p>
                    <p>{{ currentInvoice?.billerZipCode }}</p>
                    <p>{{ currentInvoice?.billerCountry }}</p>
                </div>
            </div>

            <div class="middle flex">
                <div class="payment flex flex-column">
                    <h4>Invoice Date</h4>
                    <p>{{ currentInvoice?.invoiceDate }}</p>
                    <h4>Payment Date</h4>
                    <p>{{ currentInvoice?.paymentDueDate }}</p>
                </div>
                <div class="bill flex flex-column">
                    <h4>Bill To</h4>
                    <p>{{ currentInvoice?.clientName }}</p>
                    <p>{{ currentInvoice?.clientStreetAddress }}</p>
                    <p>{{ currentInvoice?.clientCity }}</p>
                    <p>{{ currentInvoice?.clientZipCode }}</p>
                    <p>{{ currentInvoice?.clientCountry }}</p>

                </div>
                <div class="send-to flex flex-column">
                    <h4>Sent To</h4>
                    <p>{{ currentInvoice?.clientEmail }}</p>
                </div>
            </div>

            <div class="bottom flex flex-column">
                <div class="billing-items">
                    <div class="heading flex">
                        <p>Item Name</p>
                        <p>QTY</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <div class="item flex" v-for="item, index in currentInvoice?.invoiceItemList" :key="index">
                        <p>{{ item.itemName }}</p>
                        <p>{{ item.qty }}</p>
                        <p>${{ item.price }}</p>
                        <p>${{ item.total }}</p>
                    </div>
                </div>
                <div class="total flex">
                    <p>Amount Due</p>
                    <p>${{ currentInvoice?.invoiceTotal }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useInvoiceStore } from '../stores/index';
import { useRoute, useRouter } from 'vue-router';
import { InvoiceData } from '../data';
import { shortenId } from '../composables/helper'
const route = useRoute()
const router = useRouter()

const invoiceStore = useInvoiceStore()
const showSpinner = ref(false)
const currentInvoice = ref<InvoiceData>()
