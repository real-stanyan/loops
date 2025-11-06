import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("FAQs");

  return (
    <div className="pt-30 md:pt-40 xl:pt-50 min-h-[100vh] px-5 md:px-10 lg:px-20 xl:px-40">
      <h3 className="font-black text-center text-4xl">{t("title")}</h3>
      <Accordion
        type="single"
        collapsible
        className="w-full my-20"
        // defaultValue="item-1"
      >
        {t.raw("questions").map((item: any, index: number) => (
          <AccordionItem value={item.question} key={index}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
