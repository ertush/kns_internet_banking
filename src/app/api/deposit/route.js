import Bank from "@/app/model/bank";
import { kv } from "@vercel/kv";

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount } = body;

    const kv_balance = await kv.get("b_balance");
    const bank = Bank.instance();
    bank.balance = kv_balance;

    const balance = bank.deposit(Number(amount));

    await kv.set("b_balance", balance);

    return Response.json(
      {
        balance,
        exception: bank.error,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        exception: "An error occurred while processing the request",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
