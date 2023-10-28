import { IsNumber } from 'class-validator';

export class RequestDto {
	@IsNumber()
	public productId: number;
	@IsNumber()
	public userId: number;
	@IsNumber()
	public quantity: number;
	@IsNumber()
	public value: number;
}
