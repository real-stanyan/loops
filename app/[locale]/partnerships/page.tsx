import React from "react";
import GlassIcons from "@/components/GlassIcons";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("Partnerships_page");

  return (
    <div className="pt-30 md:pt-40 xl:pt-50 min-h-[100vh]">
      <h1 className="text-center uppercase text-4xl font-black ">
        {t("title")}
      </h1>
      <GlassIcons items={t.raw("logos")} />
    </div>
  );
};

export default page;
