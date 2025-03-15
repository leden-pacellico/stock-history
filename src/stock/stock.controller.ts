import {Controller, Get, Param} from '@nestjs/common';
import {StockService} from "./stock.service";

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get(':symbol')
  async getStockData(@Param('symbol') symbol: string) {
    return await this.stockService.getStockData(symbol);
  }
}
