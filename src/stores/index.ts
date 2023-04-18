import { defineStore } from "pinia";
import { db, auth } from "../firebase/fbInit";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { InvoiceData, User } from "../data";

interface State {
  showInvoiceModal: Boolean;
  isModalActive: Boolean;
  invoicesData: InvoiceData[];
  invoicesLoaded: Boolean;
  currentInvoiceArray: null;
  editInvoice: Boolean;
  user: User;
  error: Boolean;
  errorMessage: string;
  isLogin: Boolean;
}

export const useInvoiceStore = defineStore("invoiceStore", {
  state: (): State => ({
    showInvoiceModal: false,
    isModalActive: false,
    invoicesData: [],
    invoicesLoaded: false,
    currentInvoiceArray: null,
    editInvoice: false,
    isLogin: false,
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
    },
    errorMessage: "",
    error: false,
  }),

  getters: {},

  actions: {
    setCurrentInvoice(payload) {
      this.currentInvoiceArray = this.invoicesData.filter(
        (invoice: InvoiceData) => {
          return invoice.docId === payload;
        }
      );
    },
    setInvoiceData(payload: InvoiceData) {
      this.invoicesData.push(payload);
    },

    async deleteInvoice(payload) {
      this.invoicesData = this.invoicesData.filter((invoice: InvoiceData) => {
        return invoice.docId !== payload;
      });
    },
    updateStatusForPaid(payload: InvoiceData) {
      this.invoicesData.forEach((invoice: InvoiceData) => {
        if (invoice.docId === payload) {
          (invoice.invoicePending = false), (invoice.invoicePaid = true);
        }
      });
    },

    updateStatusForPending(payload: InvoiceData) {
      this.invoicesData.forEach((invoice: InvoiceData) => {
        if (invoice.docId === payload) {
          (invoice.invoicePending = true), (invoice.invoicePaid = false);
          invoice.invoiceDraft = false;
        }
      });
    },

    async getInvoices() {
      const noteBy = auth.currentUser?.uid;
      const getData = await getDocs(collection(db, `invoice ${noteBy}`));
      getData.forEach((doc) => {
        if (
          !this.invoicesData.some(
            (invoice: InvoiceData) => invoice.docId === doc.id
          )
        ) {
          const data = {
            docId: doc.id,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePaid: doc.data().invoicePaid,
          };
          this.setInvoiceData(data);
        }
      });
      // this.invoicesLoaded = true;
    },

    async updateInvoice({ docId, routeId }) {
      this.deleteInvoice(docId);
      await this.getInvoices();
      this.showInvoiceModal = !this.showInvoiceModal;
      this.editInvoice = !this.editInvoice;
      this.setCurrentInvoice(routeId);
    },
    async delete(docId) {
      const noteBy = auth.currentUser?.uid;

      await deleteDoc(doc(db, `invoice ${noteBy}`, docId));
      this.deleteInvoice(docId);
    },

    async updateStatusToPaid(docId) {
      await updateDoc(doc(db, "invoices", docId), {
        invoicePaid: true,
        invoicePending: false,
      });
      this.updateStatusForPaid(docId);
    },
    async updateStatusToPending(docId) {
      await updateDoc(doc(db, "invoices", docId), {
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false,
      });
      this.updateStatusForPending(docId);
    },
  },
});
