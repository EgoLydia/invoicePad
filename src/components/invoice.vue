<template>
      <router-link
        class="invoice flex"
        :to="{
            name: 'Invoice',
            params: { invoiceId: invoice.id },
        }"
      >
                                        <div class="left">
                                          <span class="tracking-number">#{{ shortenId(invoice.id, 6) }}</span>
                                          <span class="due-date">{{ invoice.paymentDueDate }}</span>
                                          <span class="person">{{ invoice.clientName }}</span>
                                        </div>
                                        <div class="right">
          <span class="price">${{ invoice.invoiceTotal }}</span>
          <div
            class="status-button flex"
            :class="{
                paid: invoice.invoicePaid,
                draft: invoice.invoiceDraft,
                pending: invoice.invoicePending,
            }"
          >
            <span v-if="invoice.invoicePaid">Paid</span>
            <span v-if="invoice.invoiceDraft">Draft</span>
            <span v-if="invoice.invoicePending">Pending</span>
          </div>
          <div class="icon">
            <img src="src\assets\icon-arrow-right.svg" alt="" />
          </div>
        </div>
      </router-link>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { InvoiceData } from "../data";
import { shortenId } from "../composables/helper";

const props = defineProps({
    invoice: {
        type: Object as PropType<InvoiceData>,
        default: [],
    },
});
</script>

<style lang="scss" scoped>
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
  align-items: center;

  span {
    font-size: 13px;
  }

  .left {
    align-items: center;
    display: flex;
    flex-basis: 50%;
    // gap: 2px;

    span {
      flex: 1;
    }

    .tracking-number {
      text-transform: uppercase;
    }
  }

  .right {
    // gap: 2px;
    flex-basis: 50%;
    display: flex;
    align-items: center;

    .price {
      flex: 1;
      font-size: 16px;
      font-weight: 600px;
    }
  }
}
</style>
