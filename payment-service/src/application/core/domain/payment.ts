export class Payment {
  constructor(
    public userId: number,
    public saleId: number,
    public productId: number,
    public value: number,
    public id?: number,
  ) {}
}
