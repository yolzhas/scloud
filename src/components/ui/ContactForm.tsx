"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";

type FormState = "idle" | "submitting" | "success" | "error";

type FormData = {
  fullName: string;
  companyName: string;
  targetMarket: string;
  companyType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const COMPANY_TYPES = [
  "government",
  "enterprise",
  "telco",
  "startup",
  "retailChain",
  "other",
] as const;

const inputStyles =
  "w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 transition-colors";

const labelStyles = "text-sm font-medium text-zinc-700 mb-1.5 block";

const errorStyles = "text-sm text-brand-red mt-1";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, setState] = useState<FormState>("idle");
  const [data, setData] = useState<FormData>({
    fullName: "",
    companyName: "",
    targetMarket: "",
    companyType: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!data.fullName.trim()) errs.fullName = "Required";
    if (!data.companyName.trim()) errs.companyName = "Required";
    if (!data.targetMarket.trim()) errs.targetMarket = "Required";
    if (!data.companyType) errs.companyType = "Required";
    if (!data.message.trim()) errs.message = "Required";
    return errs;
  }

  function handleChange(
    field: keyof FormData,
    value: string,
  ) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setState("submitting");

    const subject = encodeURIComponent(
      `S-Cloud Demo Request — ${data.companyName}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${data.fullName}`,
        `Company: ${data.companyName}`,
        `Target Market: ${data.targetMarket}`,
        `Company Type: ${data.companyType}`,
        ``,
        `Message:`,
        data.message,
      ].join("\n"),
    );

    window.location.href = `mailto:cloud@snoonu.com?subject=${subject}&body=${body}`;
    setState("success");
  }

  return (
    <AnimatePresence mode="wait">
      {state === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col items-center justify-center py-16 text-center gap-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.15,
            }}
          >
            <CheckCircle size={56} weight="fill" className="text-emerald-500" />
          </motion.div>
          <p className="text-lg font-medium text-zinc-900">{t("success")}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className={labelStyles}>
              {t("fullName")}
            </label>
            <input
              id="fullName"
              type="text"
              className={inputStyles}
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            {errors.fullName && (
              <p className={errorStyles}>{errors.fullName}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className={labelStyles}>
              {t("companyName")}
            </label>
            <input
              id="companyName"
              type="text"
              className={inputStyles}
              value={data.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
            {errors.companyName && (
              <p className={errorStyles}>{errors.companyName}</p>
            )}
          </div>

          {/* Target Market */}
          <div>
            <label htmlFor="targetMarket" className={labelStyles}>
              {t("targetMarket")}
            </label>
            <input
              id="targetMarket"
              type="text"
              className={inputStyles}
              value={data.targetMarket}
              onChange={(e) => handleChange("targetMarket", e.target.value)}
            />
            {errors.targetMarket && (
              <p className={errorStyles}>{errors.targetMarket}</p>
            )}
          </div>

          {/* Company Type */}
          <div>
            <label htmlFor="companyType" className={labelStyles}>
              {t("companyType")}
            </label>
            <select
              id="companyType"
              className={inputStyles}
              value={data.companyType}
              onChange={(e) => handleChange("companyType", e.target.value)}
            >
              <option value="">{t("companyTypePlaceholder")}</option>
              {COMPANY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {t(`companyTypes.${type}`)}
                </option>
              ))}
            </select>
            {errors.companyType && (
              <p className={errorStyles}>{errors.companyType}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelStyles}>
              {t("message")}
            </label>
            <textarea
              id="message"
              rows={4}
              className={inputStyles}
              value={data.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
            {errors.message && (
              <p className={errorStyles}>{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={state === "submitting"}
            className="w-full rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2 min-h-[44px] bg-brand-red text-white hover:bg-brand-red-dark disabled:opacity-60 disabled:pointer-events-none"
          >
            {state === "submitting" ? t("sending") : t("submit")}
          </button>

          {/* Error state */}
          {state === "error" && (
            <p className="text-sm text-brand-red text-center">{t("error")}</p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
