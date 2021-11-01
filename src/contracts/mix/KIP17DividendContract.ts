import { BigNumber, BigNumberish, ContractInterface } from "ethers";
import Contract from "../Contract";

export default abstract class KIP17DividendContract extends Contract {

    constructor(address: string, abi?: ContractInterface) {
        super(address, abi === undefined ? require("./KIP17DividendContractABI.json") : abi);
    }

    public async claimableOf(id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("claimableOf", id));
    }

    public async claim(ids: BigNumberish[]) {
        if (ids.length <= 50) {
            await this.runWalletMethod("claim", ids);
        } else if (ids.length <= 500) {
            await this.runWalletMethodWithLargeGas("claim", ids);
        } else {
            await this.runWalletMethodWithLargeGas("claim", ids.slice(0, 500));
            await this.runWalletMethodWithLargeGas("claim", ids.slice(500));
        }
    }
}
