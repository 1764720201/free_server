export type EastMoneySecurity = {
    QuotationCodeTable: QuotationCodeTable

}

export interface QuotationCodeTable {
    Data: Security[]
    Status: number
    Message: string
    TotalCount: number
    BizCode: string
    BizMsg: string
}

export interface Security {
    Code: string
    Name: string
    PinYin: string
    ID: string
    JYS: string
    Classify: string
    MarketType: string
    SecurityTypeName: string
    SecurityType: string
    MktNum: string
    TypeUS: string
    QuoteID: string
    UnifiedCode: string
    InnerCode: string
}
