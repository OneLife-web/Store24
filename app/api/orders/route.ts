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

      // Email options for the store
      const storeMailOptions = {
        from: process.env.SMTP_USER, // Sender email address
        to: process.env.SMTP_USER, // Store's email address
        subject: `New Order Received - #${savedOrder.orderId}`, // Email subject with order ID
        text: `
          New order received from ${orderData.customerDetails.firstName} ${
          orderData.customerDetails.lastName
        }!

          Order ID: ${savedOrder.orderId}
          Total: $${savedOrder.total}

          Customer Details:
          Name: ${orderData.customerDetails.firstName} ${
          orderData.customerDetails.lastName
        }
          Email: ${orderData.customerDetails.email}
          Phone: ${orderData.customerDetails.phone}

          Delivery Address:
          ${orderData.customerDetails.street}, ${
          orderData.customerDetails.city
        }, ${orderData.customerDetails.state}, ${
          orderData.customerDetails.zip
        }, ${orderData.customerDetails.country}

          Items:
          ${orderData.items
            .map(
              (item: CartItem) =>
                `${item.quantity} x ${item.name} - $${item.price}`
            )
            .join("\n")}

          Special Instructions:
          ${orderData.customerDetails.deliveryInstructions || "None"}
        `,
      };

      // Email options for the customer
      const customerMailOptions = {
        from: process.env.SMTP_USER, // Sender email address
        to: orderData.customerDetails.email, // Customer's email address
        subject: `Order Confirmation - #${savedOrder.orderId}`,
        html: `
          <p>Dear ${orderData.customerDetails.firstName},</p>
          <p>Your order has been successfully placed with Store45Co.</p>
          <p>We will notify you once your tracking ID is available.</p>

          <h2>Order Summary:</h2>
          <ul style="list-style-type: none; padding: 0; margin: 0;">
            ${orderData.items
              .map(
                (item: CartItem) => `
                  <li style="display: flex; align-items: center; margin-bottom: 10px;">
                    <img src="${
                      item.productImage ? item.productImage : "/photo.png"
                    }" alt="${
                  item.name
                }" width="40" style="border-radius: 8px; margin-right: 10px;" />
                   <span style="max-width: 200px;">
            ${item.quantity} x ${item.name} - $${item.price} - ${item.color}
          </span>
                }
                  </li>
                `
              )
              .join("")}
          </ul>
          <p><strong>Total:</strong> $${savedOrder.total}</p>

          <p>We'll keep you updated and send you your tracking number as soon as your order is processed and on it's way to you.</p>
          <p>Thank you for shopping with us!</p>
        `,
      };

      // Send both emails
      await transporter.sendMail(storeMailOptions); // Send email to the store
      await transporter.sendMail(customerMailOptions); // Send email to the customer

      return NextResponse.json({ order: savedOrder, status: 200 });
    } else {
      return NextResponse.json({ error: "Order not saved", status: 400 });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order", status: 500 });
  }
}
