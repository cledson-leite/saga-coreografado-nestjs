export class Inventory {
  constructor(
    public id: number,
    public productId: number,
    public quantity: number,
  ) {}
  debitQuantity(quantity: number): void {
    this.quantity -= quantity;
  }
  creditQuantity(quantity: number): void {
    this.quantity += quantity;
  }
}
