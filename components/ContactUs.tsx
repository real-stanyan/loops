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
import { useTranslations } from "next-intl";

const ContactUs = () => {
  const t = useTranslations("ContactUs");
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
          <h1 className="text-[#ff6b35] text-4xl font-black uppercase">
            {t.raw("leftSide").title}
          </h1>
          <p className="text-lg font-normal text-center xl:text-left">
            {t.raw("leftSide").content}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {/* Phone */}
          <div className="flex justify-start items-center gap-10">
            <div className="bg-[#ff6b35] p-2 rounded-full">
              <Phone size={25} />
            </div>
            <h1 className="font-semibold text-xl">0405155473</h1>
          </div>
          {/* Mail */}
          <div className="flex justify-start items-center gap-10">
            <div className="bg-[#ff6b35] p-2 rounded-full">
              <Mail size={25} />
            </div>
            <h1 className="font-semibold text-xl">info@loopsdesignstudio.co</h1>
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
            {t.raw("rightSide").title}
          </FieldLegend>
          <FieldDescription className="text-center text-md">
            {t.raw("rightSide").content}
          </FieldDescription>
          <FieldGroup>
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">
                {t.raw("rightSide").name.title}
              </FieldLabel>
              <Input
                id="name"
                autoComplete="off"
                placeholder={t.raw("rightSide").name.placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* <FieldDescription>
                This appears on invoices and emails.
              </FieldDescription> */}
            </Field>
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">
                {t.raw("rightSide").email.title}
              </FieldLabel>
              <Input
                id="email"
                autoComplete="on"
                placeholder={t.raw("rightSide").email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            {/* Business Name */}
            <Field>
              <FieldLabel htmlFor="businessName">
                {t.raw("rightSide").businessName.title}
              </FieldLabel>
              <Input
                id="businessName"
                autoComplete="off"
                placeholder={t.raw("rightSide").businessName.placeholder}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </Field>
            {/* Message */}
            <Field>
              <FieldLabel htmlFor="message">
                {t.raw("rightSide").message.title}
              </FieldLabel>
              <Textarea
                id="message"
                autoComplete="off"
                placeholder={t.raw("rightSide").message.placeholder}
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
            {loading ? (
              <span>{t.raw("function_button").loading}</span>
            ) : (
              <span>{t.raw("function_button").default}</span>
            )}
          </Button>
        </FieldSet>
      </div>
    </div>
  );
};

export default ContactUs;
