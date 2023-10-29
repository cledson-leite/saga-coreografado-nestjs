import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../application/core/domain/user';
import { FindUserByIdOutput } from '../../application/ports/output/find-user-by-id.output';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class FindUserByIdAdapter implements FindUserByIdOutput {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async find(id: number): Promise<User> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) throw new NotFoundException('Usuário nãoencntrado!');
    return new User(entity.id, entity.name, entity.balance);
  }
}
