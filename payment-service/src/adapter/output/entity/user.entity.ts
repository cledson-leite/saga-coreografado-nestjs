import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id: number;
  @Column()
  public name: string;
  @Column({ name: 'balance', type: 'decimal', precision: 10, scale: 2 })
  public balance: number;
}
