/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from "react";

interface ICounterProps {
  defaultValue?: number;
  onCounterChange?: (count: number) => void;
}

const Counter = ({ defaultValue, onCounterChange }: ICounterProps) => {
  const [counter, setCounter] = useState(defaultValue || 1);

  const increment = () => {
    setCounter((prev) => prev + 1);
  };

  const decrement = () => {
    if (counter <= 1) return;

    setCounter((prev) => prev - 1);
  };

  useEffect(() => {
    onCounterChange?.(counter);
  }, [counter]);

  return (
    <div className="border border-black p-2 flex items-center gap-2 w-fit">
      <div
        tabIndex={0}
        role="button"
        className="text-base text-black"
        onClick={decrement}
      >
        -
      </div>
      <div className="text-base text-black">{counter}</div>
      <div
        tabIndex={0}
        role="button"
        className="text-base text-black"
        onClick={increment}
      >
        +
      </div>
    </div>
  );
};

export { Counter };
