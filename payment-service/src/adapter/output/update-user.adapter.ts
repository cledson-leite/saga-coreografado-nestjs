import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../application/core/domain/user';
import { UpdateUserOutput } from '../../application/ports/output/update-user.output';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UpdateUserAdapter implements UpdateUserOutput {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async update(user: User): Promise<void> {
    this.repository.update(user.id, user);
  }
}
