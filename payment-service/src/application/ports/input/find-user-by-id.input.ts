import { User } from '../../core/domain/user';

export interface FindUserByIdInput {
  find(id: number): Promise<User>;
}
