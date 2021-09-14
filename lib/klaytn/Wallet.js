"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventcontainer_1 = __importDefault(require("eventcontainer"));
const ConnectWalletPopup_1 = __importDefault(require("../ui/ConnectWalletPopup"));
const ExtWallet_1 = __importDefault(require("./ExtWallet"));
const Klip_1 = __importDefault(require("./Klip"));
class Wallet extends eventcontainer_1.default {
    constructor() {
        super();
        this.checkConnected();
    }
    async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }
    async loadAddress() {
        if (ExtWallet_1.default.installed === true) {
            return await ExtWallet_1.default.loadAddress();
        }
        else {
            return Klip_1.default.address;
        }
    }
    async connected() {
        return await this.loadAddress() !== undefined;
    }
    async connect() {
        if (ExtWallet_1.default.installed === true) {
            return await ExtWallet_1.default.connect();
        }
        else {
            return new ConnectWalletPopup_1.default();
        }
    }
}
exports.default = new Wallet();
//# sourceMappingURL=Wallet.js.map