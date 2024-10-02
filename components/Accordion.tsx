import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionDemo = ({
  faqs,
}: {
  faqs: {
    question: string;
    answer: string;
  }[];
}) => {
  return (
    <div>
      <p className="bodyText text-center">FREQUENTLY ASKED</p>
      <h1 className="heading1 text-center">QUESTIONS</h1>
      <div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}?</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AccordionDemo;
