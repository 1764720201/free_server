import 'dotenv/config'

export const llmConstants = {
    googleApiKey: process.env.GOOGLE_API_KEY,
    qiNiuApiKey: process.env.QINIU_API_KEY,
    qiNiuBaseUrl: process.env.QINIU_BASE_URL
}