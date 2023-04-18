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
