import { fieldsList } from "graphql-fields-list";
import { getRepository } from "typeorm";
import { AccountID } from "../../../model";
import { Account } from "../../../orm/entities";
import { createBatchResolver, idOnlyRequested } from "../util";

export const account = createBatchResolver<any, Account[]>(async (source: any, args: any, context: any, info: any) => {
  const ids: AccountID[] = source.map((s: any) => s[info.fieldName]);

  if (idOnlyRequested(info)) {
    return ids.map(id => (id ? { id } : null));
  }

  const qb = getRepository(Account)
    .createQueryBuilder("accounts")
    .where("accounts.id IN (:...ids)", { ids });

  if (fieldsList(info).indexOf("data") !== -1) {
    qb.leftJoinAndSelect("accounts.data", "data");
  }

  const accounts = await qb.getMany();

  return ids.map(id => accounts.find(acc => acc.id === id) || null);
});
