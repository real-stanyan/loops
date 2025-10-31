"use client";

import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Phone, Mail } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";
import { toast } from "sonner";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !businessName || !message) {
      toast.error("Please fill the form");
      return;
    }

    setLoading(true);

    const templateParams = {
      name,
      email,
      businessName,
      message,
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
        templateParams,
        process.env.NEXT_PUBLIC_USER_ID
      );
      toast.success("Thanks — your message was sent");
      setName("");
      setEmail("");
      setBusinessName("");
      setMessage("");
    } catch (error) {
      toast.error("We couldn't send it. Please retry");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        flex flex-col md:flex-row justify-between items-center 
        px-6 xl:px-30 py-20 gap-8
    `}
    >
      {/* Contact Left */}
      <div className="flex-1 flex flex-col items-center xl:items-start gap-8">
        <div className="flex flex-col items-center xl:items-start gap-4">
          <h1 className="text-[#ff6b35] text-4xl font-mono font-black uppercase">
            Get in Touch
          </h1>
          <p className="font-mono text-lg font-normal text-center xl:text-left">
            We look forward to connecting with you and discussing how we can
            help your brand thrive with tailored marketing strategies.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {/* Phone */}
          <div className="flex justify-start items-center gap-10">
            <div className="bg-[#ff6b35] p-2 rounded-full">
              <Phone size={25} />
            </div>
            <h1 className="font-mono font-semibold text-xl">0405155473</h1>
          </div>
          {/* Mail */}
          <div className="flex justify-start items-center gap-10">
            <div className="bg-[#ff6b35] p-2 rounded-full">
              <Mail size={25} />
            </div>
            <h1 className="font-mono font-semibold text-xl">
              info@loopsdesignstudio.co
            </h1>
          </div>
        </div>
      </div>
      {/* Contact Right */}
      <div
        className={`
      flex-1 p-6 md:p-8 bg-[var(--foreground)] text-[var(--background)] rounded-xl w-full
        `}
      >
        <FieldSet>
          <FieldLegend className="text-center !text-3xl font-black uppercase">
            Get a Free Quote
          </FieldLegend>
          <FieldDescription className="text-center text-md">
            Unlock Your Free Growth Strategy from Australia's best Marketing
            Agency
          </FieldDescription>
          <FieldGroup>
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                autoComplete="off"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* <FieldDescription>
                This appears on invoices and emails.
              </FieldDescription> */}
            </Field>
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                autoComplete="on"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            {/* Business Name */}
            <Field>
              <FieldLabel htmlFor="businessName">Business Name</FieldLabel>
              <Input
                id="businessName"
                autoComplete="off"
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </Field>
            {/* Message */}
            <Field>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                autoComplete="off"
                placeholder="Enter your message"
                className="w-full h-[200px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>
            {/* <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" autoComplete="off" aria-invalid />
              <FieldError>Choose another username.</FieldError>
            </Field> */}
          </FieldGroup>
          <Button
            variant="default"
            onClick={handleSubmit}
            className="cursor-target"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </FieldSet>
      </div>
    </div>
  );
};

export default ContactUs;
