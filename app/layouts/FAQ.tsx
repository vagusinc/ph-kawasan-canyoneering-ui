/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { Question } from "~/components";
import { TFAQType } from "~/types/FAQTypes";
import { TItemType } from "~/types/StrapiTypes";

interface IFAQProps {
  questions: TItemType<TFAQType>[];
}

const FAQ = forwardRef<HTMLDivElement, IFAQProps>(({ questions }, ref) => {
  return (
    <div ref={ref} className="py-10 pb-40 px-60 flex flex-col">
      <h1 className="self-center font-rushink text-primary text-5xl mb-16">
        FREQUENTLY ASKED QUESTIONS
      </h1>

      <div className="flex flex-col gap-4">
        {questions.map((question, index) => (
          <Question key={index} {...question.attributes} />
        ))}
      </div>
    </div>
  );
});

export { FAQ };