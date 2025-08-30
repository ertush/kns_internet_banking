import Bank from "@/app/model/bank";
import { kv } from "@vercel/kv";

export async function POST(request) {
  try {
    const bank = Bank.instance();
    const result = bank.resetBank();

    await kv.set("b_balance", result.balance);

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Keep GET for backward compatibility but mark as deprecated
export async function GET(request) {
  return Response.json(
    { error: "Please use POST method for reset" },
    { status: 405 },
  );
}
