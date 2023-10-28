import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventories')
export class InventoryEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id: number;
  @Column()
  public productId: number;
  @Column()
  public quantity: number;
}
