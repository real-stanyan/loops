import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page() {
  return (
    <div className="pt-30 md:pt-40 xl:pt-50 min-h-[100vh] px-5 md:px-10 lg:px-20 xl:px-40">
      <h3 className="font-black text-center text-4xl mb-20">FAQs</h3>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>How much do your services cost?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              Our pricing depends on the project scope, channels involved, and
              your business goals. Most of our clients invest between{" "}
              <strong>AUD 3,000 - 15,000 per month</strong>, but we focus on
              outcomes rather than fixed retainers. Every proposal is customised
              to deliver measurable growth.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            How do you ensure measurable results?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 ">
            <p>
              We align every project with clear KPIs such as conversion rate,
              customer acquisition cost, and return on ad spend (ROAS). You'll
              receive real-time dashboards and weekly insights so you can see
              what's working and where we're optimizing.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What makes your performance-driven approach different?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              Unlike traditional agencies that chase vanity metrics, we focus on{" "}
              <strong>business results</strong>. Through continuous A/B testing
              and creative iteration, we scale what performs and refine what
              doesn't — ensuring your budget drives actual revenue growth.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            What kind of creative content do you produce?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              Our creative team handles{" "}
              <strong>
                visual design, video production, photography, motion graphics,
                web design, and copywriting.
              </strong>{" "}
              Every asset is crafted to inspire engagement, conversion, and
              brand loyalty — not just look good.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            Do you work with all business sizes?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              Yes. From emerging startups to established enterprises, we adapt
              our process to your needs. We can integrate seamlessly with your
              internal marketing team or act as your fully outsourced creative
              partner.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            Do I need to sign a long-term contract?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              Not necessarily. We offer both{" "}
              <strong>short-term and long-term partnerships</strong>, depending
              on what best suits your needs and goals. Whether you start with a
              project-based collaboration or build an ongoing strategy, we're
              flexible. We believe the quality of our service naturally
              encourages clients to stay with us for the long term.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>
            Which digital channels are right for my business?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              That depends on your audience, goals, and positioning. We'll
              conduct a discovery session to evaluate your market, then
              recommend the ideal mix — from <strong>SEO and Google Ads</strong>{" "}
              to{" "}
              <strong>
                Meta, TikTok, email marketing, or influencer strategy
              </strong>
              .
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>
            How soon can I expect to see results?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              Most clients notice early momentum within{" "}
              <strong>the first 3 months</strong>. The first month is dedicated
              to audit and strategy, the second to creative rollout and
              campaigns, and the third to scaling and optimization. Results
              compound over time.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger>
            Will I have visibility and control throughout the process?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              Absolutely. You'll have access to live analytics, monthly reports,
              and direct communication with your project lead. Transparency is
              at the core of how we work — you'll always know what's happening
              and why.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10">
          <AccordionTrigger>
            What happens if results don't meet expectations?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              We treat your KPIs as our own. If key targets fall short, we'll
              proactively review the strategy, reallocate budget, and adjust
              direction. Our goal is to be a{" "}
              <strong>true partner in growth</strong>, not just another
              vendor.how we work — you'll always know what's happening and why.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
