import React, { useState } from "react";
import { Icon } from "./icon";
import { cn } from "./utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
};

export function Input({ className, label, errorMessage, ...props }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm">
      {label && <span className="text-[var(--neutral-on-background-strong)]">{label}</span>}
      <input
        {...props}
        className={cn(
          "w-full rounded-[var(--radius-m)] border border-[var(--neutral-alpha-weak)] bg-[var(--surface-background)] px-3 py-2 text-sm text-[var(--neutral-on-background-strong)] outline-none focus:ring-2 focus:ring-[var(--brand-alpha-strong)]",
          className,
        )}
      />
      {errorMessage && <span className="text-xs text-[var(--danger-solid-strong)]">{errorMessage}</span>}
    </label>
  );
}

export type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
};

export function PasswordInput({ className, label, errorMessage, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="flex w-full flex-col gap-2 text-sm">
      {label && <span className="text-[var(--neutral-on-background-strong)]">{label}</span>}
      <div className="relative">
        <input
          {...props}
          type={visible ? "text" : "password"}
          className={cn(
            "w-full rounded-[var(--radius-m)] border border-[var(--neutral-alpha-weak)] bg-[var(--surface-background)] px-3 py-2 pr-10 text-sm text-[var(--neutral-on-background-strong)] outline-none focus:ring-2 focus:ring-[var(--brand-alpha-strong)]",
            className,
          )}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--neutral-on-background-weak)]"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <Icon name={visible ? "eyeOff" : "eye"} />
        </button>
      </div>
      {errorMessage && <span className="text-xs text-[var(--danger-solid-strong)]">{errorMessage}</span>}
    </label>
  );
}
