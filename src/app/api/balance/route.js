import { kv } from "@vercel/kv";
import Bank from "@/app/model/bank";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const amount = searchParams.set("amount", "");
  const kv_balance = await kv.get("b_balance");

  const bank = new Bank.instance();

  bank.balance = kv_balance;

  const balance = bank.withdraw(Number(amount));

  return Response.json(
    {
      balance: bank.balance,
      exception: `Current balance is KSH ${balance.toString().toUpperCase()}`,
    },
    {
      status: 200,
    },
  );
}
