// /app/api/verify-transaction/route.ts

import OrderModel from "@/utils/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { status: "failure", message: "Reference is required" },
      { status: 400 }
    );
  }

  try {
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { status: "failure", message: "Failed to verify transaction" },
        { status: verifyResponse.status }
      );
    }

    const verifyData = await verifyResponse.json();

    if (verifyData.data && verifyData.data.status === "success") {
      // Ensure that `reference` matches your Order's ID field
      const updateResult = await OrderModel.updateOne(
        { _id: verifyData.data.reference },
        { status: "processing" }
      );

      // Use modifiedCount to check if the document was updated
      if (updateResult.modifiedCount === 1) {
        return NextResponse.json({ status: "success" }, { status: 200 });
      } else {
        return NextResponse.json(
          { status: "failure", message: "Order not found or already updated" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { status: "failure", message: "Payment not successful" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return NextResponse.json(
      { status: "failure", message: "Internal server error" },
      { status: 500 }
    );
  }
}