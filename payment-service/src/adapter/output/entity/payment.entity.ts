import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id: number;
  @Column()
  public userId: number;
  @Column()
  public saleId: number;
  @Column()
  public productId: number;
  @Column({ name: 'value', type: 'decimal', precision: 10, scale: 2 })
  public value: number;
}
