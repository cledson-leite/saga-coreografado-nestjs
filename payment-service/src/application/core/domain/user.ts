export class User {
  constructor(
    public id: number,
    public name: string,
    public balance: number,
  ) {}

  public debitBalance(value: number): void {
    this.balance -= value;
  }
}
