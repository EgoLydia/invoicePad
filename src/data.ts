export interface InvoiceData {
    docId: null,
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
    invoiceDateUnix: number,
    invoiceDate: string,
    paymentTerms: string,
    paymentDueDateUnix: number,
    paymentDueDate: string,
    productDescription: null,
    invoicePending: boolean,
    invoiceDraft: boolean,
    invoiceItemList: ItemList[],
    invoiceTotal: number,
    invoicePaid?:Boolean
}

interface ItemList {
    id: string,
    itemName: string
    qty: number
    price: number
    total: number

}

export interface User{
    firstName?: string
    lastName?: string
    email?: string
    password: string
    username:string
}

