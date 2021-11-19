class Klaytn {

    private caver = new (window as any).Caver(new (window as any).Caver.providers.WebsocketProvider("wss://klaytn-node.klu.bs:9091"));

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
