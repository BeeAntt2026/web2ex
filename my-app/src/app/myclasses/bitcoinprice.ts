import { IBitcoinTime } from "./bitcointime";
import { IBpi } from "./bpi";

export interface IBitcoinPrice {
    time: IBitcoinTime;
    disclaimer: string;
    chartName: string;
    bpi: {
        USD: IBpi;
        GBP: IBpi;
        EUR: IBpi;
    };
}
