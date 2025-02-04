import { Account } from "../../domain/account.model.ts";

export interface IAccountPort {
  create(name: string, email: string, password: string): Promise<Account>;
  getById(id: number): Promise<Account | null>;
  update(account: Account): Promise<void>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Account[]>;
}
