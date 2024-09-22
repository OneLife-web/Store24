import { updateData } from "@/types";
import React from "react";

const SingleProductContainer = ({ data }: { data: updateData }) => {
  return (
    <section>
      <div>{data?.title}</div>
    </section>
  );
};

export default SingleProductContainer;
