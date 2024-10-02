import Link from "next/link";
import React from "react";

const ShippingPage = () => {
  return (
    <div className="px-[3%] pb-20 lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      <h1 className="heading1 text-center py-8">Shipping Information</h1>
      <p className="bodyText">
        All orders will have a tracking number within 5 business days of the
        order date. You will receive an email with a tracking number once your
        order is shipped. You can also check the{" "}
        <a href="/track-order">&quot;Track Your Order&quot;</a> page to get more
        details and shipping history information.
      </p>

      <h2 className="heading2 pt-5 pb-3">Shipping Time</h2>

      <h3 className="font-medium underline">United States Shipping Time</h3>
      <ul className="bodyText list-disc pl-4 py-3 grid gap-2">
        <li>Standard free shipping: 15 - 30 business days</li>
        <li>Premium shipping: 7 - 15 business days</li>
      </ul>

      <h3 className="font-medium underline">UK Shipping Time</h3>
      <ul className="bodyText list-disc pl-4 py-3 grid gap-2">
        <li>Standard free shipping: 14 - 25 business days</li>
        <li>Premium shipping: 5 - 15 business days</li>
      </ul>

      <h3 className="font-medium underline">Canada Shipping Time</h3>
      <ul className="bodyText list-disc pl-4 py-3 grid gap-2">
        <li>Standard free shipping: 15 - 30 business days</li>
        <li>Premium shipping: 7 - 15 business days</li>
      </ul>

      <h3 className="font-medium underline">
        Australia/New Zealand Shipping Time
      </h3>
      <ul className="bodyText list-disc pl-4 py-3 grid gap-2">
        <li>Standard free shipping: 10 - 30 business days</li>
        <li>Premium shipping: 5 - 10 business days</li>
      </ul>

      <h3 className="font-medium underline">Europe Shipping Time</h3>
      <p className="bodyText py-3">
        Standard free shipping usually takes 15 - 30 business days. Premium
        shipping time depends on the country.
      </p>

      <h3 className="font-medium underline">Rest of the World Shipping Time</h3>
      <p className="bodyText py-3">
        Shipping can take anywhere from 15 - 30 business days. Premium shipping
        time depends on the country.
      </p>

      <h4 className="font-medium">Please Note:</h4>
      <p className="bodyText py-3">
        In general, shipping to all countries usually takes anywhere from 15 -
        30 business days. Most times, orders may arrive earlier, but
        occasionally shipping time can reach up to 50-60 days due to factors
        such as:
      </p>
      <ul className="bodyText list-disc pl-4 py-3 grid gap-2">
        <li>Customs duty</li>
        <li>Holidays</li>
        <li>Weather conditions</li>
        <li>Incorrect address</li>
        <li>Logistic issues</li>
        <li>Global events</li>
      </ul>

      <p className="bodyText">
        Please note that these delays are beyond the control of the seller. If
        you are experiencing a delay, it is a good idea to check the tracking
        information and contact us for updates. Please check the
        <Link className="text-secondaryBg underline" href="/shipping-policy">
          {" "}
          shipping policy
        </Link>{" "}
        for more information.
      </p>
    </div>
  );
};

export default ShippingPage;
