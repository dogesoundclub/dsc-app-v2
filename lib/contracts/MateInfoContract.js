"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const Contract_1 = __importDefault(require("./Contract"));
class MateInfoContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.MateInfo, require("./MateInfoContractABI.json"));
    }
    async names() {
        const step = 600;
        let names = [];
        const promises = [];
        for (let id = 0; id < 10000; id += step) {
            const promise = async (start, end) => {
                const names = await this.runMethod("names", start, end);
                for (const [index, name] of names.entries()) {
                    names[start + index] = name;
                }
            };
            promises.push(promise(id, id + step > 9999 ? 9999 : id + step));
        }
        await Promise.all(promises);
        return names;
    }
    async links() {
        const step = 300;
        const links = [];
        for (let id = 0; id < 10000; id += 1) {
            links.push({
                twitter: "",
                instagram: "",
            });
        }
        const promises = [];
        for (let id = 0; id < 10000; id += step) {
            const loadTwitters = async (start, end) => {
                const twitters = await this.runMethod("links", start, end, 0);
                for (const [index, twitter] of twitters.entries()) {
                    links[start + index].twitter = twitter;
                }
            };
            promises.push(loadTwitters(id, id + step > 9999 ? 9999 : id + step));
            const loadInstagrams = async (start, end) => {
                const instagrams = await this.runMethod("links", start, end, 0);
                for (const [index, instagram] of instagrams.entries()) {
                    links[start + index].instagram = instagram;
                }
            };
            promises.push(loadInstagrams(id, id + step > 9999 ? 9999 : id + step));
        }
        await Promise.all(promises);
        return links;
    }
}
exports.default = new MateInfoContract();
//# sourceMappingURL=MateInfoContract.js.map