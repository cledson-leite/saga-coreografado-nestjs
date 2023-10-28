import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sales')
export class SaleEntity {
	@PrimaryGeneratedColumn({ unsigned: true })
	id: number;
	@Column()
	productId: number;
	@Column()
	userId: number;
	@Column()
	quantity: number;
	@Column({ name: 'value', type: 'decimal', precision: 2, scale: 2 })
	value: number;
	@Column({ enum: [1, 2, 3] })
	status: number;
}
