export enum OrderType {
    BUY = 'buy',
    SELL = 'sell',
  }
  
  export enum OrderStatus {
    OPEN = 'open',
    CLOSED = 'closed',
    PENDING = 'pending',
    ERROR = 'error',
  }
  
  export enum TransactionStatus {
    PENDING = 'pending',
    SUCCEED = 'succeed',
    FAILED = 'failed',
  }
  
  export enum InvoiceType {
    TRADE = 'trade',
    EXCHANGE = 'exchange',
  }
  
  export enum KycStatus {
    PENDING = 'pending',
    VERIFIED = 'verified',
    REJECTED = 'rejected',
    INCOMPLETE = 'incomplete',
  }