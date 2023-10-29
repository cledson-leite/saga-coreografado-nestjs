import { User } from '../../core/domain/user';

export interface FindUserByIdOutput {
  find(id: number): Promise<User>;
}
