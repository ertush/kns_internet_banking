import { kv } from '@vercel/kv'
import Bank from '@/app/model/bank'

export async function GET(request) {


    const bank = Bank.instance()

    let bankBalance = Number(await kv.get("bank"));

    if (bankBalance) {
        bank.balance = bankBalance
    } else {
        await kv.set("bank", bank.balance);
        bankBalance = bank.balance
    }


    return Response.json({
        balance: bankBalance,
        exception: bank.error
    }, {
        status: 200
    })
}