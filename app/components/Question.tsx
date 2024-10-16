/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCollapse } from "~/hooks";

import questionCircle from "icons/question-circle.svg";
import chevronDown from "icons/chevron-down.svg";
import { TFAQType } from "~/types/FAQTypes";

const Question = (props: TFAQType) => {
  const { isCollapsed, toggle } = useCollapse();

  return (
    <div className="flex items-start gap-3">
      <img
        src={questionCircle}
        alt="question circle icon"
        className="w-5 h-5 md:w-10 md:h-10 mt-1"
      />
      <div className="flex flex-col gap-3 w-full">
        <div
          className="p-1 px-3 md:p-3 flex items-center bg-primary-100 border border-black rounded-lg cursor-pointer"
          onClick={toggle}
        >
          <p className="flex-1 font-bold text-sm md:text-base text-black">
            {props.question}
          </p>
          <img src={chevronDown} alt="arrow down icon" className="w-6 h-6" />
        </div>
        {!isCollapsed && (
          <div className="p-3 bg-primary-100 border border-black rounded-lg">
            <p className="font-bold text-sm md:text-base text-black">
              {props.answer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Question };
