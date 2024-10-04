import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/base-components/ui/button";
import { Calendar } from "~/base-components/ui/calendar";
import { cn } from "~/lib/utils";

interface IDatePickerProps {
  onDateChangeCallback?: (date?: Date) => void;
}

const DatePicker = ({ onDateChangeCallback }: IDatePickerProps) => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-2/3 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-primary-300 mt-2 rounded-md">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            onDateChangeCallback?.(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
