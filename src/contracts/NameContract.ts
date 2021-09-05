import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../klaytn/Wallet";
import Contract from "./Contract";

export interface NameRecord {
    owner: string,
    name: string,
    blockNumber: BigNumber,
}

class NameContract extends Contract {

    constructor() {
        super(Config.contracts.Name, require("./NameContractABI.json"));
    }

    public async set(mateId: BigNumberish, name: string): Promise<void> {
        const register = await Wallet.loadAddress();
        const contract = await this.loadWalletContract();
        await contract?.methods.set(mateId, name).send({ from: register, gas: 1500000 });
    }

    public async recordCount(mateId: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.recordCount(mateId).call());
    }

    public async record(mateId: BigNumberish, index: BigNumberish): Promise<NameRecord> {
        const result = await this.contract.methods.record(mateId, index).call();
        return {
            owner: result[0],
            name: result[1],
            blockNumber: result[2],
        };
    }

    public async exists(name: string): Promise<boolean> {
        return await this.contract.methods.exists(name).call();
    }

    public async getName(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.getName(mateId).call();
    }
}

export default new NameContract();
