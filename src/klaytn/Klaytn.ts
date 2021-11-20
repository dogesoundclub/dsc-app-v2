// Testnet
/*class Klaytn {

    public createContract(address: string, abi: any) {
        return new (window as any).caver.klay.Contract(abi, address);
    }

    public async loadBlockNumber() {
        return await (window as any).caver.klay.getBlockNumber()
    }
}*/

// Mainnet
class Klaytn {

    private caver = new (window as any).Caver(new (window as any).Caver.providers.WebsocketProvider("wss://klaytn-node.klu.bs:9091", {
        reconnect: {
            auto: true,
            delay: 1000,
            maxAttempts: true,
            onTimeout: false
        },
    }));

    public createContract(address: string, abi: any) {
        return this.caver.contract.create(abi, address);
    }

    public async loadBlockNumber() {
        return await this.caver.klay.getBlockNumber();
    }
}

export default new Klaytn();
