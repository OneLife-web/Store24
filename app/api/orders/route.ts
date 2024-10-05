import { CartItem } from "@/providers/CartContext";
import { connectToDb } from "@/utils/config/mongodb";
import OrderModel from "@/utils/models/Order";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  await connectToDb();

  try {
    const orderData = await req.json();
    const order = new OrderModel(orderData);
    const savedOrder = await order.save();

    // Check if the order is successfully saved
    if (savedOrder) {
      // Setup nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail", // Your email provider
        auth: {
          user: process.env.SMTP_USER, // Your email address
          pass: process.env.SMTP_PASS, // Your email password or app-specific password
        },
        secure: true, // Ensures the connection uses SSL/TLS
      });

      // Email options
      const mailOptions = {
        from: process.env.SMTP_USER, // Sender email address
        to: process.env.SMTP_USER, // Store's email address
        subject: `New Order Received - ${savedOrder._id}`, // Email subject with order ID
        text: `
          New order received from ${orderData.customerDetails.firstName} ${orderData.customerDetails.lastName}!

          Order ID: ${savedOrder._id}
          Total: $${savedOrder.total}

          Customer Details:
          Name: ${orderData.customerDetails.firstName} ${orderData.customerDetails.lastName}
          Email: ${orderData.customerDetails.email}
          Phone: ${orderData.customerDetails.phone}

          Delivery Address:
          ${orderData.customerDetails.street}, ${orderData.customerDetails.city}, ${orderData.customerDetails.state}, ${orderData.customerDetails.zip}, ${orderData.customerDetails.country}

          Items:
          ${orderData.items
            .map(
              (item: CartItem) =>
                `${item.quantity} x ${item.name} - $${item.price}`
            )
            .join("\n")}

          Special Instructions:
          ${orderData.customerDetails.deliveryInstructions || "None"}

          Thank you for choosing our store!
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return NextResponse.json({ order: savedOrder, status: 200 });
    } else {
      return NextResponse.json({ error: "Order not saved", status: 400 });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order", status: 500 });
  }
}