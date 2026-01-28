"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
  captcha?: string;
}

type Status = "sending" | "success" | "error" | null;

const success = "Thank you for contacting AGL Consulting of Florida.";

// Constants moved outside component
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/1oY3nolFTHpH34NNbIi1DZfJwZYx5-y9Mcyv9bi5KiuQ/formResponse";

const FIELD_ENTRIES = {
  name: "entry.1059374314",
  email: "entry.1359071833",
  message: "entry.1364077543",
} as const;

const LOCALHOST_HOSTNAMES = ['localhost', '127.0.0.1', '[::1]'];

declare global {
  interface Window {
    grecaptcha?: {
      reset: () => void;
    };
  }
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLocalhost] = useState(() => {
    if (typeof window !== 'undefined') {
      return LOCALHOST_HOSTNAMES.includes(window.location.hostname);
    }
    return false;
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    if (!isLocalhost && !captchaToken) {
      errors.captcha = "Please complete the reCAPTCHA verification";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error for this field when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors({ ...validationErrors, [name]: undefined });
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token && validationErrors.captcha) {
      setValidationErrors({ ...validationErrors, captcha: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setValidationErrors({});

    // Honeypot check
    const honeypot = (e.currentTarget.elements.namedItem('website') as HTMLInputElement).value;
    if (honeypot) {
      setStatus("error");
      return;
    }

    // Validate form
    if (!validateForm()) {
      setStatus("error");
      return;
    }

    const formDataEncoded = new URLSearchParams();
    formDataEncoded.append(FIELD_ENTRIES.name, formData.name);
    formDataEncoded.append(FIELD_ENTRIES.email, formData.email);
    formDataEncoded.append(FIELD_ENTRIES.message, formData.message);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Forms
        body: formDataEncoded,
      });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setCaptchaToken(null);
      if (typeof window !== 'undefined') {
        window.grecaptcha?.reset();
      }
    } catch (error) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Form submission error:', error);
      }
      setStatus("error");
    }
  };

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 
    "6Lc3-PoqAAAAAOBDfRKS8Es-iqAy3JQ4qWif_kJy";

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
      <p className="text-m mb-4">Expect to hear back from us within 3-5 business days.</p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name: <span className="text-red-600" aria-label="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-invalid={!!validationErrors.name}
            aria-describedby={validationErrors.name ? "name-error" : undefined}
            className={`w-full p-2 border rounded-md ${
              validationErrors.name ? "border-red-500" : ""
            }`}
          />
          {validationErrors.name && (
            <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">
              {validationErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email: <span className="text-red-600" aria-label="required">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-invalid={!!validationErrors.email}
            aria-describedby={validationErrors.email ? "email-error" : undefined}
            className={`w-full p-2 border rounded-md ${
              validationErrors.email ? "border-red-500" : ""
            }`}
          />
          {validationErrors.email && (
            <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
              {validationErrors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message: <span className="text-red-600" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            aria-invalid={!!validationErrors.message}
            aria-describedby={validationErrors.message ? "message-error" : undefined}
            className={`w-full p-2 border rounded-md ${
              validationErrors.message ? "border-red-500" : ""
            }`}
          />
          {validationErrors.message && (
            <p id="message-error" className="text-red-600 text-sm mt-1" role="alert">
              {validationErrors.message}
            </p>
          )}
        </div>
        {/* Honeypot field - hidden from users and screen readers */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px' }}
        />
        <div className="flex justify-center my-4" aria-live="polite">
          {!isLocalhost && (
            <div>
              <ReCAPTCHA
                sitekey={recaptchaSiteKey}
                onChange={handleCaptchaChange}
              />
              {validationErrors.captcha && (
                <p className="text-red-600 text-sm mt-1 text-center" role="alert">
                  {validationErrors.captcha}
                </p>
              )}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={status === "sending" || (!isLocalhost && !captchaToken)}
          aria-busy={status === "sending"}
        >
          {status === "sending" ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
        <div aria-live="polite" aria-atomic="true">
          {status === "success" && (
            <p className="text-green-600" role="status">
              {success}
            </p>
          )}
          {status === "error" && !Object.keys(validationErrors).length && (
            <p className="text-red-600" role="alert">
              Error sending message. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
