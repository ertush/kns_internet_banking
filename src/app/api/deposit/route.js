import Bank from "@/app/model/bank"
import { kv } from "@vercel/kv"

export async function GET(request) {
    
    const { searchParams } = new URL(request.url)

    const amount = searchParams.get('amount')

    const kv_balance = await kv.get("b_balance");

    const bank = new Bank.instance()

    bank.balance = kv_balance


    const balance = bank.deposit(Number(amount))

    await kv.set("b_balance", balance);

    
    
    return Response.json({
        balance,
        exception: bank.error
    }, {
        status: 200
    })
}