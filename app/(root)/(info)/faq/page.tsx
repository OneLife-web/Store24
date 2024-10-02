import Link from "next/link";
import React from "react";

const FaqPage = () => {
  return (
    <div className="px-[3%] pb-20 lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      <section>
        <h1 className="heading1 text-center pt-10 pb-5">
          Frequently Asked Questions (FAQ)
        </h1>

        <h2 className="heading2 pt-5 pb-3">
          1. Can you help me find and ship a product that is not listed?
        </h2>
        <p className="bodyText">
          Yes, if you&apos;re looking for a product that is not listed on our
          website, feel free to contact us. We will help you find it and ship it
          to you.
        </p>

        <h2 className="heading2 pt-5 pb-3">2. How long does shipping take?</h2>
        <p className="bodyText">
          Shipping times vary depending on the product and your location. We
          work with reliable suppliers and carriers to ensure your order is
          processed and delivered as quickly as possible. Visit our{" "}
          <a className="text-secondaryBg underline" href="/shipping-info">
            Shipping Info
          </a>{" "}
          page for more information.
        </p>

        <h2 className="heading2 pt-5 pb-3">3. How much does shipping cost?</h2>
        <p className="bodyText">
          Shipping costs vary depending on the product and your location. In
          most cases, all our products are shipped for free.
        </p>

        <h2 className="heading2 pt-5 pb-3">4. What is your return policy?</h2>
        <p className="bodyText">
          We accept returns of products that are damaged, defective, or
          incorrect. If you receive a damaged or defective product, please
          contact us within seven days of receipt to arrange a return, refund,
          or replacement.
        </p>

        <h2 className="heading2 pt-5 pb-3">5. Do you ship internationally?</h2>
        <p className="bodyText">
          Yes, we ship to most countries worldwide. Please check the shipping
          options during the checkout process.
        </p>

        <h2 className="heading2 pt-5 pb-3">6. How do I track my order?</h2>
        <p className="bodyText">
          Once your order is processed and shipped, we will provide you with a
          tracking number and a link to track your order.
        </p>

        <h2 className="heading2 pt-5 pb-3">
          7. How do I contact customer service?
        </h2>
        <p className="bodyText">
          You can contact us by email at{" "}
          <a
            href="mailto:store45co@gmail.com"
            className="text-secondaryBg underline"
          >
            store45co@gmail.com
          </a>{" "}
          or through our <a href="/contact">Contact Us</a> page. We aim to
          respond to inquiries within 24 hours.
        </p>

        <h2 className="heading2 pt-5 pb-3">8. Are your products genuine?</h2>
        <p className="bodyText">
          We work with reliable suppliers and manufacturers to ensure that our
          products are of high quality and legitimate. We do not sell
          counterfeit or fake products.
        </p>

        <h2 className="heading2 pt-5 pb-3">
          9. Do you offer wholesale or bulk pricing?
        </h2>
        <p className="bodyText">
          Yes, we offer wholesale or bulk pricing for certain products. Please
          contact us for more information.
        </p>

        <h2 className="heading2 pt-5 pb-3">
          10. Can I change or cancel my order?
        </h2>
        <p className="bodyText">
          If you need to change or cancel your order, please contact our
          customer service team as soon as possible. Once an order is processed,
          we may not be able to make changes.
        </p>

        <h2 className="heading2 pt-5 pb-3">
          11. What payment methods do you accept?
        </h2>
        <p className="bodyText">
          We accept payments via cards, PayPal, and other methods as indicated
          on our website. Payment is due at the time of order placement. Visit
          our <a href="/payment-info">Payment Info</a> page for more details.
        </p>

        <p className="bodyText">
          If you experience a payment decline or don&apos;t see your preferred
          payment option on our website, feel free to reach out to us and we’ll
          provide alternative payment options.
        </p>

        <p className="bodyText mt-4">
          Have more questions? Please contact us through our{" "}
          <Link className="text-secondaryBg underline" href="/contact">
            Contact
          </Link>{" "}
          page or email us at{" "}
          <a
            href="mailto:store45co@gmail.com"
            className="text-secondaryBg underline"
          >
            store45co@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default FaqPage;
