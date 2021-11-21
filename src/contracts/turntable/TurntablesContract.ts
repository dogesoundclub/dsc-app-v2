import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { constants, utils } from "ethers";
import Config from "../../Config";
import Wallet from "../../klaytn/Wallet";
import Contract from "../Contract";
import MixContract from "../mix/MixContract";

interface TurntableType {
    price: BigNumber,
    destroyReturn: BigNumber,
    volume: number,
    lifetime: number,
}

export interface TurntableInfo {
    owner: string,
    typeId: number,
    endBlock: number,
    lastClaimedBlock: number,
}

class TurntablesContract extends Contract {

    constructor() {
        super(Config.contracts.Turntables, require("./TurntablesContractABI.json"));
    }

    public async types(typeId: BigNumberish): Promise<TurntableType> {
        const result = await this.runMethod("types", typeId);
        return {
            price: BigNumber.from(result[0]),
            destroyReturn: BigNumber.from(result[1]),
            volume: parseInt(result[2], 10),
            lifetime: parseInt(result[3], 10),
        };
    }

    public async buy(typeId: BigNumberish): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const price = (await this.types(typeId)).price;
            const balance = await MixContract.balanceOf(owner);
            if (balance.lt(price)) {
                if (confirm(`${String(parseInt(utils.formatEther(price), 10))} 믹스가 필요합니다. 믹스를 구매하시겠습니까?`)) {
                    open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                    await new Promise<void>(() => { });
                }
            } else if ((await MixContract.allowance(owner, this.address)).lt(price)) {
                await MixContract.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("buy", typeId);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("buy", typeId);
            }
        }
    }

    public async turntables(turntableId: BigNumberish): Promise<TurntableInfo> {
        const result = await this.runMethod("turntables", turntableId);
        return {
            owner: result[0],
            typeId: parseInt(result[1], 10),
            endBlock: parseInt(result[2], 10),
            lastClaimedBlock: parseInt(result[3], 10),
        };
    }

    public async totalVolume(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("totalVolume"));
    }

    public async turntableLength(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("turntableLength"));
    }

    public async claimableOf(turntableId: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("claimableOf", turntableId));
    }

    public async charge(turntableId: BigNumberish, amount: BigNumber) {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const balance = await MixContract.balanceOf(owner);
            if (balance.lt(amount)) {
                if (confirm(`${String(parseInt(utils.formatEther(amount), 10))} 믹스가 필요합니다. 믹스를 구매하시겠습니까?`)) {
                    open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                    await new Promise<void>(() => { });
                }
            } else if ((await MixContract.allowance(owner, this.address)).lt(amount)) {
                await MixContract.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("charge", turntableId, amount);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("charge", turntableId, amount);
            }
        }
    }

    public async claim(turntableIds: BigNumberish[]) {
        await this.runWalletMethod("claim", turntableIds);
    }

    public async destroy(turntableId: BigNumberish) {
        await this.runWalletMethod("destroy", turntableId);
    }
}

export default new TurntablesContract();
