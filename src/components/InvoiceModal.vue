<template>
    <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
        <form @submit.prevent="submitForm" class="invoice-content">
            <Loading v-show="loading" />
            <h1 v-if="!invoiceStore.editInvoice">New Invoice</h1>
            <h1 v-else>Edit Invoice</h1>

            <!-- bill from -->
            <div class="bill-form flex flex-column">
                <h4>Bill Form</h4>
                <div class="input flex flex-column">
                    <label for="billerStreetAddress">Street Address</label>
                    <input type="text" required id="billerStreetAddress" v-model="inputData.billerStreetAddress">
                </div>
                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="billerCity">City</label>
                        <input type="text" required id="billerCity" v-model="inputData.billerCity">
                    </div>
                    <div class="input flex flex-column">
                        <label for="billerZipCode">Zip Code</label>
                        <input type="text" required id="billerZipCode" v-model="inputData.billerZipCode">
                    </div>
                    <div class="input flex flex-column">
                        <label for="billerCountry">Country</label>
                        <input type="text" required id="billerCountry" v-model="inputData.billerCountry">
                    </div>
                </div>
            </div>

            <!-- bill to -->
            <div class="bill-to flex flex-column">
                <h4>Bill To</h4>
                <div class="input flex flex-column">
                    <label for="clientName">Client's Name</label>
                    <input type="text" required id="clientName" v-model="inputData.clientName">
                </div>
                <div class="input flex flex-column">
                    <label for="clientEmail">Client Email</label>
                    <input type="text" required id="clientEmail" v-model="inputData.clientEmail">
                </div>
                <div class="input flex flex-column">
                    <label for="clientStreetAddress">Street Address</label>
                    <input type="text" required id="clientStreetAddress" v-model="inputData.clientStreetAddress">
                </div>

                <div class="location-details flex">
                    <div class="input flex flex-column">
                        <label for="clientCity">City</label>
                        <input type="text" required id="clientCity" v-model="inputData.clientCity">
                    </div>
                    <div class="input flex flex-column">
                        <label for="clientZipCode">Zip Code</label>
                        <input type="text" required id="clientZipCode" v-model="inputData.clientZipCode">
                    </div>
                    <div class="input flex flex-column">
                        <label for="clientCountry">Country</label>
                        <input type="text" required id="clientCountry" v-model="inputData.clientCountry">
                    </div>
                </div>
            </div>

            <!-- invoice work details -->
            <div class="invoice-work flex flex-column">
                <div class="payment flex">
                    <div class="input flex flex-column">
                        <label for="invoiceDate">Invoice Date</label>
                        <input disabled type="text" required id="invoiceDate" v-model="inputData.invoiceDate">
                    </div>
                    <div class="input flex flex-column">
                        <label for="paymentDueDate">Payment Due</label>
                        <input type="text" required id="paymentDueDate" v-model="inputData.paymentDueDate">
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
                    <input type="text" required id="productDescription" v-model="inputData.productDescription">
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
                        <tr class="table-items flex" v-for="item, index in inputData.invoiceItemList" :key="index">
                            <td class="item-name">
                                <input type="text" v-model="item.itemName">
                            </td>
                            <td class="qty">
                                <input type="text" v-model="item.qty">
                            </td>
                            <td class="price">
                                <input type="text" v-model="item.price">
                            </td>
                            <td class="total flex">
                                ${{ item.total = item.qty * item.price }}
                            </td>
                            <img class="delete" @click="() => deleteInvoiceItem(item.id)" src="src\assets\icon-delete.svg"
                                alt="">
                        </tr>
                    </table>
                    <div @click="addNewInvoiceItem" class="flex button">
                        <img src="src\assets\icon-plus.svg" alt="">
                        Add New Item
                    </div>
                </div>
            </div>

            <!-- actions -->
            <div class="save flex">
                <div class="left">
                    <button type="button" @click="closeInvoice" class="red">Discard</button>
                </div>
                <div class="right flex">
                    <button v-if="!invoiceStore.editInvoice" type="submit" @click="saveDraft" class="dark-purple">Save
                        draft</button>
                    <button v-if="!invoiceStore.editInvoice" type="submit" @click="publishInvoice" class="purple">Create
                        Invoice</button>
                    <button v-if="invoiceStore.editInvoice" class="purple" type="submit">Update Invoice</button>
                </div>
            </div>
        </form>
    </div>
</template>
