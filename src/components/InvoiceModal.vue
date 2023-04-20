<template>
      <div
        @click="checkClick"
        ref="invoiceWrap"
        class="invoice-wrap flex flex-column"
      >
        <form @submit.prevent="submitForm" class="invoice-content">
          <Loading v-show="loading" />
          <h1 v-if="!invoiceStore.editInvoice">New Invoice</h1>
          <h1 v-else>Edit Invoice</h1>

          <!-- bill from -->
          <div class="bill-form flex flex-column">
            <h4>Bill Form</h4>
            <div class="input flex flex-column">
              <label for="billerStreetAddress">Street Address</label>
              <input
                type="text"
                required
                id="billerStreetAddress"
                v-model="inputData.billerStreetAddress"
              />
            </div>
            <div class="location-details flex">
              <div class="input flex flex-column">
                <label for="billerCity">City</label>
                <input
                  type="text"
                  required
                  id="billerCity"
                  v-model="inputData.billerCity"
                />
              </div>
              <div class="input flex flex-column">
                <label for="billerZipCode">Zip Code</label>
                <input
                  type="text"
                  required
                  id="billerZipCode"
                  v-model="inputData.billerZipCode"
                />
              </div>
              <div class="input flex flex-column">
                <label for="billerCountry">Country</label>
                <input
                  type="text"
                  required
                  id="billerCountry"
                  v-model="inputData.billerCountry"
                />
              </div>
            </div>
          </div>

          <!-- bill to -->
          <div class="bill-to flex flex-column">
            <h4>Bill To</h4>
            <div class="input flex flex-column">
              <label for="clientName">Client's Name</label>
              <input
                type="text"
                required
                id="clientName"
                v-model="inputData.clientName"
              />
            </div>
            <div class="input flex flex-column">
              <label for="clientEmail">Client Email</label>
              <input
                type="text"
                required
                id="clientEmail"
                v-model="inputData.clientEmail"
              />
            </div>
            <div class="input flex flex-column">
              <label for="clientStreetAddress">Street Address</label>
              <input
                type="text"
                required
                id="clientStreetAddress"
                v-model="inputData.clientStreetAddress"
              />
            </div>

            <div class="location-details flex">
              <div class="input flex flex-column">
                <label for="clientCity">City</label>
                <input
                  type="text"
                  required
                  id="clientCity"
                  v-model="inputData.clientCity"
                />
              </div>
              <div class="input flex flex-column">
                <label for="clientZipCode">Zip Code</label>
                <input
                  type="text"
                  required
                  id="clientZipCode"
                  v-model="inputData.clientZipCode"
                />
              </div>
              <div class="input flex flex-column">
                <label for="clientCountry">Country</label>
                <input
                  type="text"
                  required
                  id="clientCountry"
                  v-model="inputData.clientCountry"
                />
              </div>
            </div>
          </div>

          <!-- invoice work details -->
          <div class="invoice-work flex flex-column">
            <div class="payment flex">
              <div class="input flex flex-column">
                <label for="invoiceDate">Invoice Date</label>
                <input
                  disabled
                  type="text"
                  required
                  id="invoiceDate"
                  v-model="inputData.invoiceDate"
                />
              </div>
              <div class="input flex flex-column">
                <label for="paymentDueDate">Payment Due</label>
                <input
                  type="text"
                  required
                  id="paymentDueDate"
                  v-model="inputData.paymentDueDate"
                />
              </div>
            </div>
            <div class="input flex flex-column">
              <label for="paymentTerms">Payment Terms</label>
              <select required id="paymentTerms" v-model="inputData.paymentTerms">
                <option value="30">Next 30 Days</option>
                <option value="60">Next 60 Days</option>
              </select>
            </div>
            <div class="input flex flex-column">
              <label for="productDescription">Product Description</label>
              <input
                type="text"
                required
                id="productDescription"
                v-model="inputData.productDescription"
              />
            </div>
            <div class="work-items">
              <h3>Item List</h3>
              <table class="item-list">
                <tr class="table-heading flex">
                  <th class="item-name">Item Name</th>
                  <th class="qty">Qty</th>
                  <th class="price">Price</th>
                  <th class="total">Total</th>
                </tr>
                <tr
                  class="table-items flex"
                  v-for="(item, index) in inputData.invoiceItemList"
                  :key="index"
                >
                  <td class="item-name">
                    <input type="text" v-model="item.itemName" />
                  </td>
                  <td class="qty">
                    <input type="text" v-model="item.qty" />
                  </td>
                  <td class="price">
                    <input type="text" v-model="item.price" />
                  </td>
                  <td class="total flex">
                    ${{ (item.total = item.qty * item.price) }}
                  </td>
                  <img
                    class="delete"
                    @click="() => deleteInvoiceItem(item.id)"
                    src="src\assets\icon-delete.svg"
                    alt=""
                  />
                </tr>
              </table>
              <div @click="addNewInvoiceItem" class="flex button">
                <img src="src\assets\icon-plus.svg" alt="" />
                Add New Item
              </div>
            </div>
          </div>

          <!-- actions -->
          <div class="save flex">
            <div class="left">
              <button type="button" @click="closeInvoice" class="red">
                Discard
              </button>
            </div>
            <div class="right flex">
              <button
                v-if="!invoiceStore.editInvoice"
                type="submit"
                @click="saveDraft"
                class="dark-purple"
              >
                Save draft
              </button>
              <button
                v-if="!invoiceStore.editInvoice"
                type="submit"
                @click="publishInvoice"
                class="purple"
              >
                Create Invoice
              </button>
              <button v-if="invoiceStore.editInvoice" class="purple" type="submit">
                Update Invoice
              </button>
            </div>
          </div>
        </form>
      </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { InvoiceData } from "../data";
import { useInvoiceStore } from "../stores/index";
import { uid } from "uid";
import { auth, db } from "../firebase/fbInit";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import Loading from "./Loading.vue";
import { useRoute } from "vue-router";

const invoiceStore = useInvoiceStore();

const route = useRoute();
const loading = ref(false);

const inputData = ref<InvoiceData>({
    id: null,
    userId: null,
    billerStreetAddress: null,
    billerCity: null,
    billerZipCode: null,
    billerCountry: null,
    clientName: null,
    clientEmail: null,
    clientStreetAddress: null,
    clientCity: null,
    clientZipCode: null,
    clientCountry: null,
    invoiceDateUnix: 0,
    invoiceDate: "",
    paymentTerms: "",
    paymentDueDateUnix: 0,
    paymentDueDate: "",
    productDescription: null,
    invoicePending: false,
    invoiceDraft: false,
    invoiceItemList: [],
    invoiceTotal: 0,
});

const dateOptions = ref({ year: "numeric", month: "short", day: "numeric" });

const invoiceWrap = ref(null);

const checkClick = (event: Event) => {
    if (event.target === invoiceWrap.value) {
        invoiceStore.isModalActive = !invoiceStore.isModalActive;
    }
};

const calcInvoiceTotal = () => {
    inputData.value.invoiceTotal = 0;
    inputData.value.invoiceItemList.forEach((item) => {
        inputData.value.invoiceTotal += item.total;
    });
};

const uploadInvoice = async () => {
    if (inputData.value.invoiceItemList.length <= 0) {
        alert("Please ensure you filled out work items");
        return;
    }

    loading.value = true;

    calcInvoiceTotal();

    const noteBy = auth.currentUser?.uid;

    const dataBase = await addDoc(collection(db, "invoices"), {
        id: uid(6),
        userId: noteBy,
        billerStreetAddress: inputData.value.billerStreetAddress,
        billerCity: inputData.value.billerCity,
        billerZipCode: inputData.value.billerZipCode,
        billerCountry: inputData.value.billerCountry,
        clientName: inputData.value.clientName,
        clientEmail: inputData.value.clientEmail,
        clientStreetAddress: inputData.value.clientStreetAddress,
        clientCity: inputData.value.clientCity,
        clientZipCode: inputData.value.clientZipCode,
        clientCountry: inputData.value.clientCountry,
        invoiceDateUnix: inputData.value.invoiceDateUnix,
        invoiceDate: inputData.value.invoiceDate,
        paymentTerms: inputData.value.paymentTerms,
        paymentDueDateUnix: inputData.value.paymentDueDateUnix,
        paymentDueDate: inputData.value.paymentDueDate,
        productDescription: inputData.value.productDescription,
        invoicePending: inputData.value.invoicePending,
        invoiceDraft: inputData.value.invoiceDraft,
        invoiceItemList: inputData.value.invoiceItemList,
        invoiceTotal: inputData.value.invoiceTotal,
        invoicePaid: null,
    });

    loading.value = false;

    invoiceStore.showInvoiceModal = !invoiceStore.showInvoiceModal;
    invoiceStore.getInvoices(); //consider rewrite
};

const updateInvoice = async () => {
    if (inputData.value.invoiceItemList.length <= 0) {
        alert("Please ensure you filled out work items");
        return;
    }

    loading.value = true;

    calcInvoiceTotal();

    const docRefs = doc(db, "invoices", inputData.value.id);

    const dataBase = await updateDoc(docRefs, {
        billerStreetAddress: inputData.value.billerStreetAddress,
        billerCity: inputData.value.billerCity,
        billerZipCode: inputData.value.billerZipCode,
        billerCountry: inputData.value.billerCountry,
        clientName: inputData.value.clientName,
        clientEmail: inputData.value.clientEmail,
        clientStreetAddress: inputData.value.clientStreetAddress,
        clientCity: inputData.value.clientCity,
        clientZipCode: inputData.value.clientZipCode,
        clientCountry: inputData.value.clientCountry,
        paymentTerms: inputData.value.paymentTerms,
        paymentDueDateUnix: inputData.value.paymentDueDateUnix,
        paymentDueDate: inputData.value.paymentDueDate,
        productDescription: inputData.value.productDescription,
        invoiceItemList: inputData.value.invoiceItemList,
        invoiceTotal: inputData.value.invoiceTotal,
    });

    loading.value = false;

    const data = {
        id: inputData.value.id,
        routeId: route.params.invoiceId,
    };

    invoiceStore.updateInvoice(data);
};

const submitForm = () => {
    if (invoiceStore.editInvoice) {
        updateInvoice();
        return;
    }
    uploadInvoice();
};

const saveDraft = () => {
    inputData.value.invoiceDraft = true;
};
const publishInvoice = () => {
    inputData.value.invoicePending = true;
};
const closeInvoice = () => {
    invoiceStore.showInvoiceModal = !invoiceStore.showInvoiceModal;
    if (invoiceStore.editInvoice) {
        invoiceStore.editInvoice = !invoiceStore.editInvoice;
    }
};
const addNewInvoiceItem = () => {
    inputData.value.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: 0,
        price: 0,
        total: 0,
    });
};
const deleteInvoiceItem = (id: string) => {
    inputData.value.invoiceItemList = inputData.value.invoiceItemList.filter(
        (item) => item.id !== id
    );
};

onMounted(() => {
    //get current invoice date
    if (!invoiceStore.editInvoice) {
        inputData.value.invoiceDateUnix = Date.now();
        inputData.value.invoiceDate = new Date(
            inputData.value.invoiceDateUnix
        ).toLocaleDateString("en-US", dateOptions.value);
    }

    //populate edit invoice modal
    if (invoiceStore.editInvoice) {
        const currentInvoice = invoiceStore.currentInvoiceArray[0];

        (inputData.value.id = currentInvoice.id),
            (inputData.value.billerStreetAddress =
                currentInvoice.billerStreetAddress),
            (inputData.value.billerCity = currentInvoice.billerCity),
            (inputData.value.billerZipCode = currentInvoice.billerZipCode),
            (inputData.value.billerCountry = currentInvoice.billerCountry),
            (inputData.value.clientName = currentInvoice.clientName),
            (inputData.value.clientEmail = currentInvoice.clientEmail),
            (inputData.value.clientStreetAddress =
                currentInvoice.clientStreetAddress),
            (inputData.value.clientCity = currentInvoice.clientCity),
            (inputData.value.clientZipCode = currentInvoice.clientZipCode),
            (inputData.value.clientCountry = currentInvoice.clientCountry),
            (inputData.value.invoiceDateUnix = currentInvoice.invoiceDateUnix),
            (inputData.value.invoiceDate = currentInvoice.invoiceDate),
            (inputData.value.paymentTerms = currentInvoice.paymentTerms),
            (inputData.value.paymentDueDateUnix = currentInvoice.paymentDueDateUnix),
            (inputData.value.paymentDueDate = currentInvoice.paymentDueDate),
            (inputData.value.productDescription = currentInvoice.productDescription),
            (inputData.value.invoicePending = currentInvoice.invoicePending),
            (inputData.value.invoiceDraft = currentInvoice.invoiceDraft),
            (inputData.value.invoiceItemList = currentInvoice.invoiceItemList),
            (inputData.value.invoiceTotal = currentInvoice.invoiceTotal);
    }
});

watch(
    () => inputData.value.paymentTerms,
    () => {
        const futureDate = new Date();
        inputData.value.paymentDueDateUnix = futureDate.setDate(
            futureDate.getDate() + parseInt(inputData.value.paymentTerms)
        );
        inputData.value.paymentDueDate = new Date(
            inputData.value.paymentDueDateUnix
        ).toLocaleDateString("en-US", dateOptions.value);
    }
);

watch(
    () => uploadInvoice,
    () => {
        invoiceStore.getInvoices();
    },
    { deep: true }
);
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  z-index: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;

        div {
          flex: 1;
        }
      }
    }

    // Invoice Work
    .invoice-work {
      .payment {
        gap: 24px;

        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          // Item Table Styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
              cursor: pointer;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
