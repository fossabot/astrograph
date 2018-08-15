import { IDatabase } from "pg-promise";
import { Account } from "../model";

export default class AccountsRepo {
  private db: IDatabase<any>;

  constructor(db: any) {
    this.db = db;
  }

  // Tries to find a transaction by id;
  public findByID(id: string): Promise<Account> {
    return this.db.oneOrNone("SELECT * FROM accounts WHERE accountid = $1", id, res => new Account(res));
  }

  public async findAllByIDs(ids: string[]): Promise<Array<Account | null>> {
    const res = await this.db.manyOrNone("SELECT * FROM accounts WHERE accountid IN ($1) ORDER BY accountid", ids);

    const rearrange = (id: string) => {
      const a = res.find(r => r.accountid === id);
      if (a) {
        return new Account(a);
      }
      return null;
    };

    return ids.map(rearrange);
  }
}