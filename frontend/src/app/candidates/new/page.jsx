"use client";

import { useState } from "react";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  position: "",
};

export default function NewCandidatePage() {
  const [form, setForm] = useState(initialFormState);
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
  }

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!form.position.trim()) {
      newErrors.position = "Position applied for is required.";
    }

    if (!resumeFile) {
      newErrors.resume = "Resume upload is required.";
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(resumeFile.type)) {
        newErrors.resume = "Resume must be a PDF or Word document.";
      }
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage("");
    setServerError("");

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("email", form.email.trim());
      payload.append("phone", form.phone.trim());
      payload.append("position", form.position.trim());
      payload.append("resume", resumeFile);

      const response = await fetch("/api/candidates", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to register candidate.");
      }

      setSuccessMessage("Candidate registered successfully.");
      setForm(initialFormState);
      setResumeFile(null);
      e.target.reset();
    } catch (err) {
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-1">Register New Candidate</h1>
      <p className="text-sm text-gray-500 mb-6">
        Add candidate details before scheduling an interview.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Candidate's full name"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="candidate@example.com"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium mb-1">
            Position Applied For
          </label>
          <input
            id="position"
            name="position"
            type="text"
            value={form.position}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer Intern"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.position && (
            <p className="text-xs text-red-600 mt-1">{errors.position}</p>
          )}
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium mb-1">
            Resume Upload
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full text-sm border rounded-md px-3 py-2 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 file:text-sm"
          />
          {resumeFile && (
            <p className="text-xs text-gray-500 mt-1">{resumeFile.name}</p>
          )}
          {errors.resume && (
            <p className="text-xs text-red-600 mt-1">{errors.resume}</p>
          )}
        </div>

        {serverError && (
          <p className="text-sm text-red-600">{serverError}</p>
        )}
        {successMessage && (
          <p className="text-sm text-green-600">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white rounded-md py-2 text-sm font-medium disabled:opacity-60 hover:bg-blue-700 transition"
        >
          {submitting ? "Registering..." : "Register Candidate"}
        </button>
      </form>
    </div>
  );
}