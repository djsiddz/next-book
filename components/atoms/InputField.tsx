'use client';

type InputFieldProps = {
  type: string;
  placeholder: string;
  label: string;
};

export function InputField({ type, placeholder, label }: InputFieldProps) {
  return (
    <div className="mb-3">
      <label className="text-md">{label}</label>
      <br />
      <input className="rounded-lg px-6 py-3 text-sm " type={type} placeholder={placeholder} />
    </div>
  );
}
