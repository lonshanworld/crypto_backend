import { InvoiceType } from "src/common/enums";

export class CreateInvoiceDto {
    userId : number;
    invoiceType : InvoiceType;
    exchangeTransactionId? : number; // Optional, only if invoiceType is EXCHANGE
    tradeTransactionId? : number; // Optional, only if invoiceType is TRADE
    totalAmount : number;
    cryptoCurrencyId? : number; // Optional
    fiatCurrencyId? : number; // Optional, only if invoiceType is trade
}
