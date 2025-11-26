"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
      flex flex-col lg:flex-row 
      h-auto items-start
      bg-white text-black 
      px-6 py-10 lg:px-24 lg:py-20 
      overflow-x-hidden
      gap-10 lg:gap-0
    `}
    >
      {/* Left Side: Logo & Form */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 lg:pr-20 w-full">
        {/* Logo Simulation */}
        <div className="flex justify-start md:block">
          <Image
            src={"/hero/logo.webp"}
            width={500}
            height={500}
            alt="logo"
            className="w-10 md:w-12 h-auto pt-2"
          />
        </div>

        <div className="flex flex-col gap-6 w-full">
          {/* Name */}
          <div className="relative">
            <Input
              id="name"
              autoComplete="off"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 border-gray-400 rounded-md text-base md:text-lg placeholder:text-gray-400 px-3"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Input
              id="email"
              autoComplete="on"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-gray-400 rounded-md text-base md:text-lg placeholder:text-gray-400 px-3"
            />
          </div>

          {/* Business Name */}
          <div className="relative">
            <Input
              id="businessName"
              autoComplete="off"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="h-12 border-gray-400 rounded-md text-base md:text-lg placeholder:text-gray-400 px-3"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <Textarea
              id="message"
              autoComplete="off"
              placeholder="Messages"
              className="w-full min-h-[150px] md:min-h-[180px] border-gray-400 rounded-md text-base md:text-lg placeholder:text-gray-400 p-3 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-2">
            <Button
              variant="default"
              onClick={handleSubmit}
              className="bg-black text-white hover:bg-gray-800 rounded-md px-20 py-6 text-lg font-normal w-full sm:w-auto"
            >
              {loading ? "Sending..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side: Typography */}
      {/* 修改重点：
         1. hidden: 默认隐藏（针对手机、平板竖屏）。
         2. lg:flex: 仅在 lg (1024px) 及以上屏幕显示为 flex 布局。
      */}
      <div className="hidden lg:flex items-center justify-center lg:justify-end mt-8 lg:mt-0 w-full lg:w-auto">
        <div className="leading-[0.72] tracking-tighter">
          <h1 className="text-[12vw] font-black text-black block">GET</h1>
          <h1 className="text-[7vw] ml-10 font-black text-black block">
            QUOTE
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
