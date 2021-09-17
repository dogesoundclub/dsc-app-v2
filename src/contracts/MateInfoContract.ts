import Config from "../Config";
import Contract from "./Contract";

interface SNS {
    twitter: string,
    instagram: string,
}

class MateInfoContract extends Contract {

    constructor() {
        super(Config.contracts.MateInfo, require("./MateInfoContractABI.json"));
    }

    public async names(): Promise<string[]> {
        const step = 600;

        let names: string[] = [];

        const promises: Promise<void>[] = [];
        for (let id = 0; id < 10000; id += step) {
            const promise = async (start: number, end: number) => {
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

    public async links(): Promise<SNS[]> {
        const step = 300;

        const links: SNS[] = [];
        for (let id = 0; id < 10000; id += 1) {
            links.push({
                twitter: "",
                instagram: "",
            });
        }

        const promises: Promise<void>[] = [];
        for (let id = 0; id < 10000; id += step) {

            const loadTwitters = async (start: number, end: number) => {
                const twitters = await this.runMethod("links", start, end, 0);
                for (const [index, twitter] of twitters.entries()) {
                    links[start + index].twitter = twitter;
                }
            };
            promises.push(loadTwitters(id, id + step > 9999 ? 9999 : id + step));

            const loadInstagrams = async (start: number, end: number) => {
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

export default new MateInfoContract();
