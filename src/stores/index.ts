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
