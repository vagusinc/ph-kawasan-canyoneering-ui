import { Input } from "~/base-components/ui/input";

interface IFormInput {
  label?: string;
  subTitle?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
}

const FormInput = ({
  label,
  subTitle,
  placeholder,
  value,
  defaultValue,
  required,
  onChange,
}: IFormInput) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {required && <p className="text-xs text-red-500">*</p>}
        {label && <p className="text-xs text-black">{label}</p>}
      </div>
      <Input
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {subTitle && <p className="text-[10px] text-neutral">{subTitle}</p>}
    </div>
  );
};

export { FormInput };
