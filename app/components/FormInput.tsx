import { Input } from "~/base-components/ui/input";

interface IFormInput {
  label?: string;
  subTitle?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (newValue: string) => void;
}

const FormInput = ({
  label,
  subTitle,
  placeholder,
  value,
  defaultValue,
  onChange,
}: IFormInput) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <p className="text-xs text-black">{label}</p>}
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
