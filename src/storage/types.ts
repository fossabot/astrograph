// This module holds definitions of data types for "raw" objects,
// which are returned from Dgraph storage
import { MemoType } from "../util/stellar";
import { AccountID, AssetCode } from "../util/types";
import { OperationKinds } from "./queries/operations/types";

export interface ITransactionData {
  id: string;
  seq: string;
  index: string;
  // body
  "memo.value": string | null;
  "memo.type": MemoType | null;
  fee_amount: string;
  // result
  // meta
  // feeMeta
  "account.source": IAccountData[];
  "time_bounds.min": number;
  "time_bounds.max": number;
}

interface IOperationData {
  kind: OperationKinds;
  ledger: ILedgerData[];
  index: string;
  transaction: ITransactionData[];
}

export interface IPaymentOperationData extends IOperationData {
  "account.source": IAccountData[];
  "account.destination": IAccountData[];
  amount: string;
  asset: IAssetData[];
}

export interface ISetOptionsOperationData extends IOperationData {
  master_weight: string;
  home_domain: string;
  clear_flags: string;
  set_flags: string;
  thresholds: {
    high: string;
    med: string;
    low: string;
  };
  "account.inflation_dest": IAccountData[];
  signer: {
    account: IAccountData[];
    weight: string;
  };
}

export interface IAccountMergeOperationData extends IOperationData {
  "account.destination": IAccountData[];
}

export interface IAllowTrustOperationData extends IOperationData {
  trustor: IAccountData[];
  asset_code: AssetCode;
  authorize: boolean;
}

export type DgraphOperationsData = IPaymentOperationData &
  ISetOptionsOperationData &
  IAccountMergeOperationData &
  IAllowTrustOperationData;

export interface IAssetData {
  code: AssetCode;
  issuer: IAccountData[];
  native: boolean;
}

export interface IAccountData {
  id: AccountID;
  // it's incomplete
}

export interface ILedgerData {
  close_time: string;
}
