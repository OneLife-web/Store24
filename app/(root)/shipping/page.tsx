import Link from "next/link";
import React from "react";

const ShippingPage = () => {
  return (
    <div className="shipping-info">
      <h1>Shipping Information</h1>
      <p>
        All orders will have a tracking number within 5 business days of the order date. 
        You will receive an email with a tracking number once your order is shipped. You 
        can also check the <a href="/track-order">"Track Your Order"</a> page to get more 
        details and shipping history information.
      </p>

      <h2>Shipping Time</h2>

      <h3>United States Shipping Time</h3>
      <ul>
        <li>Standard free shipping: 15 - 30 business days</li>
        <li>Premium shipping: 7 - 15 business days</li>
      </ul>

      <h3>UK Shipping Time</h3>
      <ul>
        <li>Standard free shipping: 14 - 25 business days</li>
        <li>Premium shipping: 5 - 15 business days</li>
      </ul>

      <h3>Canada Shipping Time</h3>
      <ul>
        <li>Standard free shipping: 15 - 30 business days</li>
        <li>Premium shipping: 7 - 15 business days</li>
      </ul>

      <h3>Australia/New Zealand Shipping Time</h3>
      <ul>
        <li>Standard free shipping: 10 - 30 business days</li>
        <li>Premium shipping: 5 - 10 business days</li>
      </ul>

      <h3>Europe Shipping Time</h3>
      <p>
        Standard free shipping usually takes 15 - 30 business days. Premium shipping 
        time depends on the country.
      </p>

      <h3>Rest of the World Shipping Time</h3>
      <p>
        Shipping can take anywhere from 15 - 30 business days. Premium shipping 
        time depends on the country.
      </p>

      <h4>Please Note:</h4>
      <p>
        In general, shipping to all countries usually takes anywhere from 15 - 30 
        business days. Most times, orders may arrive earlier, but occasionally 
        shipping time can reach up to 50-60 days due to factors such as:
      </p>
      <ul>
        <li>Customs duty</li>
        <li>Holidays</li>
        <li>Weather conditions</li>
        <li>Incorrect address</li>
        <li>Logistic issues</li>
        <li>Global events</li>
      </ul>

      <p>
        Please note that these delays are beyond the control of the seller. If 
        you are experiencing a delay, it is a good idea to check the tracking 
        information and contact us for updates. Please check the 
        <Link href="/shipping-policy"> shipping policy</Link> for more information.
      </p>
    </div>
  );
};

export default ShippingPage;