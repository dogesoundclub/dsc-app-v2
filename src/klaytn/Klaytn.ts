class Klaytn {

    public caver = new (window as any).Caver(new (window as any).Caver.providers.WebsocketProvider("wss://klaytn-node.dogesound.club:9091"));

    public createContract(address: string, abi: any) {
        return this.caver === undefined ?
            new (window as any).caver.klay.Contract(abi, address) :
            this.caver.contract.create(abi, address);
    }
}

export default new Klaytn();
