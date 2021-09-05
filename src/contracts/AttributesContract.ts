import { BigNumberish } from "ethers";
import Config from "../Config";
import Contract from "./Contract";

class AttributesContract extends Contract {

    constructor() {
        super(Config.contracts.Attributes, require("./AttributesContractABI.json"));
    }

    public async level(mateId: BigNumberish): Promise<number> {
        return await this.contract.methods.level(mateId).call();
    }

    public async face(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.face(mateId).call();
    }

    public async faceDetailA(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.faceDetailA(mateId).call();
    }

    public async faceDetailB(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.faceDetailB(mateId).call();
    }

    public async neck(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.neck(mateId).call();
    }

    public async mouth(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.mouth(mateId).call();
    }

    public async eyes(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.eyes(mateId).call();
    }

    public async forehead(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.forehead(mateId).call();
    }

    public async headwear(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.headwear(mateId).call();
    }

    public async headwearDetail(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.headwearDetail(mateId).call();
    }

    public async ears(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.ears(mateId).call();
    }

    public async items(mateId: BigNumberish): Promise<string> {
        return await this.contract.methods.items(mateId).call();
    }
}

export default new AttributesContract();
