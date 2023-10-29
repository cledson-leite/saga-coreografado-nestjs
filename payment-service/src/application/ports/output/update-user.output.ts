import { User } from '../../core/domain/user';

export interface UpdateUserOutput {
  update(user: User): Promise<void>;
}
