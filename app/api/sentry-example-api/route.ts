// app/api/auth/token/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const clerk = await auth();
    // many Clerk versions offer getToken; if your version differs, adjust accordingly
    const token =
      typeof clerk.getToken === "function" ? await clerk.getToken() : null;
    return NextResponse.json({ token: token ?? null });
  } catch (err) {
    return NextResponse.json(
      { token: null, error: (err as Error).message },
      { status: 500 }
    );
  }
}
