import {Injectable} from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';

type QueryOptions = {
  period1: string | number | Date; // Start date for the query
  period2: string | number | Date; // End date for the query
  interval?: '1mo' | '1d' | '1wk'; // Interval for the data (optional)
  events?: 'history' | 'dividends' | 'split'; // Type of events to include (optional)
  includeAdjustedClose?: boolean; // Whether to include adjusted close prices (optional)
};



@Injectable()
export class StockService {


  async getStockData(symbol: string): Promise<any> {
    const queryOptions:QueryOptions = {
      period1: '2020-01-01',
      period2: '2025-01-01',
      interval: '1mo'
    };
    let result: Array<any>|undefined = undefined;
    try {
      result = await yahooFinance.historical(symbol, queryOptions);
    } catch (e) {
      const shortSymbol = symbol.substring(0, symbol.indexOf('.')-1)
      try {
        result = await yahooFinance.historical(shortSymbol, queryOptions);
      } catch (e) {
        console.log(`could not resolve ${symbol}`);
        console.log(await yahooFinance.search('stock code like '+symbol));
      }
    }
    if (result === undefined) {
      result = [];

    }
    return result;
  }

}
