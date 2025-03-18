"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type Status = "sending" | "success" | "error" | null;

const success = "Thank you for contacting AGL Consulting of Florida.";

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>(null);

  const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/1oY3nolFTHpH34NNbIi1DZfJwZYx5-y9Mcyv9bi5KiuQ/formResponse";

  const FIELD_ENTRIES = {
    name: "entry.1059374314",
    email: "entry.1359071833",
    message: "entry.1364077543",
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    setStatus("sending");

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return null;
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
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (e) {
      console.log(e);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Name: <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Email: <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Message: <span className="text-red-600">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
        {status === "success" && <p className="text-green-600">{success}</p>}
        {status === "error" && <p className="text-red-600">Error sending message.</p>}
      </form>
    </div>
  );
};