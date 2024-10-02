const ShippingPolicyPage = () => {
  return (
    <div className="px-[3%] pb-20 lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      <section>
        <h1 className="heading1 text-center py-8">Shipping Policy</h1>

        <h2 className="heading2 pt-5 pb-3">Shipping to Over 200 Countries</h2>
        <p className="bodyText">
          We are proud to offer international shipping and payment services to
          over 200 countries. However, there are some locations where we&apos;re
          unable to ship. If you happen to be in one of those countries, we will
          contact you.
        </p>

        <p className="bodyText">
          Depending on where you live, the time it may take for your exchanged
          products to reach you may vary.
        </p>

        <h2 className="heading2 pt-5 pb-3">Loss/Missing Package</h2>
        <p className="bodyText">
          We are not liable if an incorrect address is provided during the
          checkout process. Please make sure that your shipping and billing
          addresses are correct before processing your order. If we have made an
          error, we will take full responsibility for the original order at no
          additional charge.
        </p>

        <h2 className="heading2 pt-5 pb-3">Customs</h2>
        <p className="bodyText">
          We are not responsible for any customs fees once the item has been
          shipped. By purchasing our products, you consent that one or more
          packages may be shipped to you and that customs fees may apply upon
          arrival, depending on the country of destination.
        </p>

        <h2 className="heading2 pt-5 pb-3">
          My Tracking Says No Information at the Moment
        </h2>
        <p className="bodyText">
          For some shipping companies, it takes 1 to 5 business days for
          tracking information to update in the system. If your order was placed
          more than 5 business days ago and there is still no information on
          your tracking number, please contact us for updates.
        </p>

        <h2 className="heading2 pt-5 pb-3">
          Will My Items Be Sent in One Package?
        </h2>
        <p className="bodyText">
          For logistical reasons, items in the same purchase may sometimes be
          sent in separate packages, even if you have specified combined
          shipping.
        </p>

        <p className="bodyText">
          If you have any other questions, please contact us and we will do our
          best to assist you.
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicyPage;
