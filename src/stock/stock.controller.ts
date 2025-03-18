import {Controller, Get, Param} from '@nestjs/common';
import {StockService} from "./stock.service";

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('current/:symbol')
  async getCurrentStockPrice(@Param('symbol') symbol: string) {
    return await this.stockService.getCurrentPrice(symbol);
  }

  @Get('history/:symbol')
  async getStockHistory(@Param('symbol') symbol: string) {
    return await this.stockService.getStockHistory(symbol);
  }

  /**
   * @deprecated use stock/history/:symbol instead
   * @param symbol
   */
  @Get(':symbol')
  async getStockData(@Param('symbol') symbol: string) {
    return await this.stockService.getStockHistory(symbol);
  }
}
