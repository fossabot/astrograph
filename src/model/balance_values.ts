import { BigNumber } from "bignumber.js";
import { Asset } from "stellar-sdk";
import { IBalanceBase } from "./balance";

export class BalanceValues implements IBalanceBase {
  public account: string;
  public asset: Asset;
  public limit: BigNumber;
  public balance: BigNumber;
  public authorized: boolean;

  constructor(data: IBalanceBase) {
    this.account = data.account;
    this.limit = data.limit;
    this.balance = data.balance;
    this.authorized = data.authorized;
    this.asset = data.asset;
  }
}
