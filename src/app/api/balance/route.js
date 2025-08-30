// import { kv } from "@vercel/kv";
import Bank from "@/app/model/bank";

export async function GET(request) {
  const bank = new Bank.instance();

  return Response.json(
    {
      balance: bank.balance,
      exception: `Current balance is KSH ${bank.balance.toString().toUpperCase()}`,
    },
    {
      status: 200,
    },
  );
}
