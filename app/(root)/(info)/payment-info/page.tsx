import React from "react";

const PaymentInfoPage = () => {
  return (
    <div className="px-[3%] pb-20 lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      <section>
        <h1 className="heading1 text-center py-8">Payment Information</h1>
        <p className="bodyText">
          At Store 45, we ensure that your payment information is secure by
          encrypting it through a trusted and secure payment gateway.
        </p>

        <h2 className="heading2 pt-5 pb-3">Supported Payment Options:</h2>
        <ul className="bodyText list-disc pl-4 py-3 grid gap-2">
          <li>
            Credit/Debit Cards (Visa, Mastercard, Discover, American Express)
          </li>
          <li>Digital Wallets (PayPal, Apple Pay, Google Pay, etc.)</li>
          <li>Bank Transfer</li>
          <li>Mobile Money</li>
          <li>USSD Payments</li>
        </ul>

        <p className="bodyText">
          Please note, for security reasons and fraud prevention, you may be
          asked to undergo additional verification (e.g., OTP) to ensure that
          your card is being used by the authorized owner and to prevent
          unauthorized access.
        </p>

        <p className="bodyText mt-4">
          <strong>Important:</strong> You may experience payment declines or
          other issues if your card does not support 3DS authentication. If this
          occurs, please contact us and we will provide you with an alternative
          payment option.
        </p>

        <p className="bodyText mt-4">
          If your preferred payment option is not available, feel free to reach
          out to us, and we will do our best to assist you with other possible
          payment methods.
        </p>
      </section>
    </div>
  );
};

export default PaymentInfoPage;
