export default {
    base: process.env.NEXT_PUBLIC_API_URL ?? 'http://203.159.93.236:8076',
    local: process.env.NEXT_PUBLIC_AUTH_URL ?? 'http://localhost:3000'
}