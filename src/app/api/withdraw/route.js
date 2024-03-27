import Bank from "@/app/model/bank"
import { kv } from "@vercel/kv"

export async function GET(request) {
    
    const { searchParams } = new URL(request.url)

    const amount = searchParams.get('amount')

    const bank = Bank.instance()

    bank.balance = await kv.get("bank");

    const balance = bank.withdraw(Number(amount))

    await kv.set("bank", balance);

    
    
    return Response.json({
        balance,
        exception: bank.error
    }, {
        status: 200
    })
}