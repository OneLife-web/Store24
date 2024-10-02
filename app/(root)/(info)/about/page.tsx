import React from "react";

const AboutPage = () => {
  return (
    <div className="px-[3%] pb-20 lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      <section>
        <h1 className="heading1 text-center py-8">About Us</h1>
        <p className="bodyText">
          Welcome to <strong>STORE 45</strong>
        </p>
        <p className="bodyText">
          At Store 45, we believe that shopping should be simple, enjoyable, and
          accessible to everyone. Our mission is to bring you a curated
          selection of high-quality products from around the globe, all at
          unbeatable prices. If you have any product you&apos;re looking to buy
          that&apos;s not listed here,{" "}
          <a href="mailto:store45co@gmail.com">contact us</a>, and we can help
          you find it and ship it out to you.
        </p>
        <h2 className="heading2 pt-5 pb-3">Who We Are</h2>
        <p className="bodyText">
          We are a passionate team of online shopping enthusiasts dedicated to
          finding the best products for our customers. Our diverse range of
          items reflects our commitment to quality and affordability, ensuring
          that you can find exactly what you&apos;re looking for, whether it&apos;s the
          latest gadgets, stylish apparel, or home essentials.
        </p>
        <h2 className="heading2 pt-5 pb-3">Our Promise</h2>
        <p className="bodyText">
          Customer satisfaction is our top priority. We are here to provide you
          with exceptional service and support every step of the way. If you
          have any questions or concerns, our friendly team is always ready to
          help.
        </p>
        <p className="bodyText">
          Thank you for choosing Store 45. We look forward to serving you and
          helping you find the perfect products for your needs!
        </p>
        <p className="bodyText pt-4">
          <strong>Happy shopping!</strong>
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
