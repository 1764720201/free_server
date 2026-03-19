import { Injectable } from '@nestjs/common';
import { EastMoneySecurity, Security } from './types/east-money';

@Injectable()
export class SecuritiesService {

  async search(keyword: string, pageNo: number, pageSize: number) {
    const res = await fetch(`https://searchapi.eastmoney.com/api/suggest/get?input=${keyword}&type=14&count=${pageSize}`)
    const data = await res.json() as EastMoneySecurity

    if (!data.QuotationCodeTable.Data.length) {
      return {
        list: [],
        total: data.QuotationCodeTable.TotalCount
      }
    }

    return {
      list: data.QuotationCodeTable.Data.map(item => this.mapSuggestItem(item)),
      total: data.QuotationCodeTable.TotalCount
    }
  }

  /** 映射 */
  private mapSuggestItem(item: Security) {
    const secid = item.QuoteID
    const market = Number(item.MarketType)
    const exchange = item.QuoteID.startsWith("1.") ? 'SH' : 'SZ'

    const name = item.Name ?? "";
    const classify = item.Classify ?? "";

    let assetType = "unknown";
    if (classify === "Stock") assetType = "stock";
    else if (classify === "Fund") assetType = name.includes("ETF") ? "etf" : "fund";
    else if (classify === "Index") assetType = "index";

    return {
      secid,
      market,
      code: item.Code,
      name,
      pinyin: item.PinYin,
      exchange,
      assetType,
      securityTypeName: item.SecurityTypeName,
    }
  }
}
