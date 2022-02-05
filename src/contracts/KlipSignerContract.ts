import KlipSignerArtifact from "./abi/klip-signer/artifacts/contracts/KlipSigner.sol/KlipSigner.json";
import Contract from "./Contract";

class KlipSignerContract extends Contract {

    constructor() {
        super("0xAc2d108a066f3cf4a77A006B8B459199E51a611c", KlipSignerArtifact.abi);
    }

    public async signedKeys(key: string): Promise<string> {
        return await this.runMethod("signedKeys", key);
    }

    public async sign(key: string): Promise<void> {
        await this.runWalletMethod("sign", key);
    }
}

export default new KlipSignerContract();
