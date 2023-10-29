import { FindUserByIdInput } from '../../ports/input/find-user-by-id.input';
import { FindUserByIdOutput } from '../../ports/output/find-user-by-id.output';
import { User } from '../domain/user';

export class FindUserByIdUseCase implements FindUserByIdInput {
  constructor(private readonly findUser: FindUserByIdOutput) {}
  async find(id: number): Promise<User> {
    return this.findUser.find(id);
  }
}
