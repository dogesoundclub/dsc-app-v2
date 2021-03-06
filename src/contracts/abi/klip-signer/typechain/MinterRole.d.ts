/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MinterRoleInterface extends ethers.utils.Interface {
  functions: {
    "addMinter(address)": FunctionFragment;
    "renounceMinter()": FunctionFragment;
    "isMinter(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "addMinter", values: [string]): string;
  encodeFunctionData(
    functionFragment: "renounceMinter",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "isMinter", values: [string]): string;

  decodeFunctionResult(functionFragment: "addMinter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceMinter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isMinter", data: BytesLike): Result;

  events: {
    "MinterAdded(address)": EventFragment;
    "MinterRemoved(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MinterAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MinterRemoved"): EventFragment;
}

export type MinterAddedEvent = TypedEvent<[string] & { account: string }>;

export type MinterRemovedEvent = TypedEvent<[string] & { account: string }>;

export class MinterRole extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MinterRoleInterface;

  functions: {
    addMinter(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceMinter(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isMinter(account: string, overrides?: CallOverrides): Promise<[boolean]>;
  };

  addMinter(
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceMinter(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isMinter(account: string, overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    addMinter(account: string, overrides?: CallOverrides): Promise<void>;

    renounceMinter(overrides?: CallOverrides): Promise<void>;

    isMinter(account: string, overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {
    "MinterAdded(address)"(
      account?: string | null
    ): TypedEventFilter<[string], { account: string }>;

    MinterAdded(
      account?: string | null
    ): TypedEventFilter<[string], { account: string }>;

    "MinterRemoved(address)"(
      account?: string | null
    ): TypedEventFilter<[string], { account: string }>;

    MinterRemoved(
      account?: string | null
    ): TypedEventFilter<[string], { account: string }>;
  };

  estimateGas: {
    addMinter(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceMinter(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isMinter(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addMinter(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceMinter(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isMinter(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
