import client from "../../../../config.ts";
import { Account } from "../../domain/account.model.ts";
import { IAccountPort } from "../../service/ports/account.port.ts";

export class MySqlAdapter implements IAccountPort {
  async create(name: string, email: string, mobile: string): Promise<Account> {
    try {
      const result = await (await client).execute(
        "INSERT INTO accounts (name, email, mobile) VALUES (?, ?, ?)",
        [name, email, mobile],
      );
      return { id: result.lastInsertId, name, email, mobile };
    } catch (error) {
      console.error(`Error creating account: ${error}`);
      throw error;
    }
  }

  async getById(id: number): Promise<Account | null> {
    const [row] = await (await client).query(
      "SELECT * FROM accounts WHERE id =?",
      [id],
    );
    return row(
      row.id,
      row.name,
      row.email,
      row.mobile,
      new Date(row.create_at),
    );
  }

  async update(account: Account): Promise<void> {
    try {
      await (await client).execute(
        "UPDATE accounts SET name =?, email =?, mobile =? WHERE id =?",
        [account.name, account.email, account.mobile, account.id],
      );
    } catch (error) {
      console.error(`Error updating account: ${error}`);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await (await client).execute(
        "DELETE FROM accounts WHERE id =?",
        [id],
      );
      return Boolean(result.affectedRows);
    } catch (error) {
      console.error(`Error deleting account: ${error}`);
      throw error;
    }
  }

  async getAll(): Promise<Account[]> {
    const row = await (await client).query("SELECT * FROM accounts");
    return row;
  }
}
