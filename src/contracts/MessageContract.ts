import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../klaytn/Wallet";
import Contract from "./Contract";

export interface MessageRecord {
    owner: string,
    name: string,
    message: string,
    blockNumber: string,
}

class MessageContract extends Contract {

    constructor() {
        super(Config.contracts.Message, require("./MessageContractABI.json"));
    }

    public async set(mateId: BigNumberish, message: string): Promise<void> {
        const register = await Wallet.loadAddress();
        const contract = await this.loadWalletContract();
        await contract?.methods.set(mateId, message).send({ from: register, gas: 1500000 });
    }

    public async recordCount(mateId: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.recordCount(mateId).call());
    }

    public async record(mateId: BigNumberish, index: BigNumberish): Promise<MessageRecord> {
        const result = await this.contract.methods.record(mateId, index).call();
        return {
            owner: result[0],
            name: result[1],
            message: result[2],
            blockNumber: result[3],
        };
    }

    public async remainBlocks(mateId: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.contract.methods.remainBlocks(mateId).call());
    }

    public async lastMessage(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.lastMessage(mateId).call();
    }
}

export default new MessageContract();
