import React from "react";

const RefundPolicy = () => {
  return (
    <div className="px-[3%] pb-20 lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      <section>
        <h1 className="heading1 text-center py-8">Refund Policy</h1>

        <h2 className="heading2 pt-5 pb-3">Refund for Damaged Items</h2>
        <p className="bodyText">
          You can apply for a refund if any items you ordered arrive damaged.
        </p>

        <h2 className="heading2 pt-5 pb-3">
          Refund for Packages Lost in Transit
        </h2>
        <p className="bodyText">
          You can apply for a refund if your package is marked as &quot;lost in
          transit&quot; according to its tracking details. If the package eventually
          arrives later, you can keep it with no need to return it.
        </p>

        <h2 className="heading2 pt-5 pb-3">
          Refund for Non-Delivery After 30 Days
        </h2>
        <p className="bodyText">
          If your package is not delivered within 30 days after shipment, you
          are eligible to apply for a refund. If it arrives later, you may keep
          the package without returning it.
        </p>

        <h2 className="heading2 pt-5 pb-3">Returns and Refunds</h2>
        <ul className="bodyText list-disc pl-4 py-3 grid gap-2">
          <li>
            We accept returns of products that are damaged, defective, or
            incorrect.
          </li>
          <li>
            If you receive a damaged or defective product, please contact us
            within seven days of receiving the product to arrange for a return,
            refund, or replacement.
          </li>
          <li>
            We reserve the right to refuse a return or refund if the product has
            been worn, used, or damaged through misuse or negligence.
          </li>
        </ul>

        <p className="bodyText">
          For any further questions or to request a refund, please contact us.
        </p>
      </section>
    </div>
  );
};

export default RefundPolicy;
