import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { constants, utils } from "ethers";
import Wallet from "../../klaytn/Wallet";
import Contract from "../Contract";
import KIP7Contract from "../standard/KIP7Contract";

export default abstract class TurntableKIP7ListenersContract extends Contract {

    constructor(address: string) {
        super(address, require("./TurntableKIP7ListenersContractABI.json"));
    }

    abstract get lpToken(): KIP7Contract;

    public async totalShares(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("totalShares"));
    }

    public async shares(turntableId: BigNumberish, owner: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("shares", turntableId, owner));
    }

    public async claimableOf(turntableId: BigNumberish, owner: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("claimableOf", turntableId, owner));
    }

    public async listen(turntableId: BigNumberish, amount: BigNumberish): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const balance = await this.lpToken.balanceOf(owner);
            if (balance.lt(amount)) {
                if (confirm(`${String(parseInt(utils.formatEther(amount), 10))} LP 토큰이 필요합니다. LP 토큰을 생성하시겠습니까?`)) {
                    open(`https://klayswap.com/exchange/pool/detail/${this.lpToken.address}`);
                    await new Promise<void>(() => { });
                }
            } else if ((await this.lpToken.allowance(owner, this.address)).lt(amount)) {
                await this.lpToken.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("listen", turntableId, amount);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("listen", turntableId, amount);
            }
        }
    }

    public async unlisten(turntableId: BigNumberish, amount: BigNumberish): Promise<void> {
        await this.runWalletMethod("unlisten", turntableId, amount);
    }

    public async claim(turntableId: BigNumberish): Promise<void> {
        await this.runWalletMethod("claim", [turntableId]);
    }
}
