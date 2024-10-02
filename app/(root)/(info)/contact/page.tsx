"use client";
import { useState } from "react";
import Input from "@/components/Input";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !comment || !phone) {
      setError("All fields are required");
      return null;
    }
    setLoading(true);

    const data = { name, email, phone, comment };

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Email sent successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setComment("");
      } else {
        const resData = await response.json();
        alert("Error sending email: " + resData.error);
      }
    } catch {
      alert("An error occurred while sending the email.");
    } finally {
      setLoading(false);
      setError("");
    }
  };

  return (
    <div className="px-[3%] pb-20 lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      <h1 className="heading1 text-center pt-10 pb-5">Get in touch</h1>
      <p className="bodyText text-center mx-auto max-sm:max-w-[80%]">
        We&apos;re here to help! Contact us anytime for assistance.
      </p>
      <p className="bodyText text-center mx-auto max-sm:max-w-[80%] mt-5">
        You will send an email to: mailto:store45co@gmail.com
      </p>
      <section className="pt-20">
        <form className="grid gap-5" onSubmit={handleSubmit}>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <div className="grid gap-5 lg:grid-cols-2">
            <Input
              value={name}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              value={email}
              className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Input
            value={phone}
            className="border h-14 lg:h-16 placeholder:text-black placeholder:font-normal"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment"
            className="border rounded-lg max-sm:text-sm p-4 focus:outline-none w-full min-h-[150px] placeholder:text-black placeholder:font-normal"
          ></textarea>

          <button
            className="bg-secondaryBg flex items-center justify-center font-semibold rounded-lg w-full h-14 lg:h-16 mt-10"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Send"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
