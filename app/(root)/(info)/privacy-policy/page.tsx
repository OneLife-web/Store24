import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="px-[3%] pb-20 lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      <section>
        <h1 className="heading1 text-center py-8">PRIVACY POLICY</h1>
        <p className="bodyText">
          At <strong>STORE 45</strong>, we value your privacy and are committed
          to protecting your personal information. This Privacy Policy outlines
          how we collect, use, disclose, and protect your information when you
          visit our website and make a purchase.
        </p>

        <h2 className="heading2 pt-5 pb-3">Information We Collect</h2>
        <p className="bodyText">
          When you visit our website, we collect the following types of
          information:
        </p>
        <ul className="bodyText list-disc pl-4 py-3 grid gap-2">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Shipping address</li>
          <li>Payment information</li>
          <li>
            IP address, browser type, and preferences (e.g., language and
            location) through cookies and analytics tools.
          </li>
        </ul>

        <h2 className="heading2 pt-5 pb-3">How We Use Your Information</h2>
        <p className="bodyText">We may use the information we collect for the following purposes:</p>
        <ul className="bodyText list-disc pl-4 py-3 grid gap-2">
          <li>To process and fulfill your orders</li>
          <li>
            To communicate with you about your order status and respond to
            inquiries
          </li>
          <li>To personalize your shopping experience</li>
          <li>To improve our website and services</li>
          <li>
            To send you promotional offers and newsletters (with your consent)
          </li>
          <li>
            <strong>Usage Data:</strong> We may collect information about how
            you access and use our website, including your IP address, browser
            type, pages visited, and time spent on our website.
          </li>
        </ul>

        <h2 className="heading2 pt-5 pb-3">How We Share Your Information</h2>
        <p className="bodyText">
          We do not sell or rent your personal information to third parties.
          However, we may share your information with the following parties to
          facilitate your orders:
        </p>

        <h3 className="font-medium underline pt-3">Third-party Service Providers</h3>
        <ul className="bodyText list-disc pl-4 py-3 grid gap-2">
          <li>
            <strong>Payment Gateway:</strong> We do not store your credit card
            information. All payment transactions are processed through secure
            third-party payment processors.
          </li>
          <li>
            <strong>Shipping Companies:</strong> They have access to your
            personal information only to perform specific tasks on our behalf.
          </li>
        </ul>

        <p className="bodyText">If you don't agree to these terms, please leave the website.</p>

        <p className="bodyText">
          If you have any questions, please{" "}
          <a href="mailto:support@store45.com" className="text-secondaryBg underline">contact us</a> for more
          information.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
