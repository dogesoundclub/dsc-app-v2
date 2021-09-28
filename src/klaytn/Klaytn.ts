class Klaytn {

    private caver = (window as any).caver !== undefined ? undefined :
        new (window as any).Caver("https://api.dogesound.club:9013/");

    public createContract(address: string, abi: any) {
        return this.caver === undefined ?
            new (window as any).caver.klay.Contract(abi, address) :
            this.caver.contract.create(abi, address);
    }

    public async loadBlockNumber() {
        return this.caver === undefined ?
            await (window as any).caver.klay.getBlockNumber() :
            await this.caver.klay.getBlockNumber();
    }
}

export default new Klaytn();
