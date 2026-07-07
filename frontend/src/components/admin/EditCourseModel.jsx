import React, { useEffect, useRef, useState } from "react";
import API_BASE, { fetchWithAuth } from "../../config/api";

export default function EditCourseModel({ course, onClose, onUpdated }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  const [form, setForm] = useState({
    id: course?.id || "",
    name: course?.name || "",
    field_id: course?.field_id || "",
    specialization_id: course?.specialization_id || "",
    duration: course?.duration || "",
    degree_level: course?.degree_level || "Undergraduate",
    status: course?.status || "Active",
  });

  const [fields, setFields] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWithAuth(`${API_BASE}?r=dashboard/get-fields`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") setFields(json.data || []);
      })
      .catch(console.error);

    fetchWithAuth(`${API_BASE}?r=dashboard/get-specializations`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") setSpecializations(json.data || []);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose?.();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    fetchWithAuth(`${API_BASE}?r=dashboard/update-course`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: form.id,
        name: form.name,
        field_id: form.field_id,
        specialization_id: form.specialization_id,
        duration: form.duration,
        degree_level: form.degree_level,
        status: form.status,
      }),
    })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.status === "error") {
          throw new Error(json.message || `Server error (${res.status})`);
        }
        onUpdated?.();
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to update course");
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-2xl max-h-[calc(100vh-2.5rem)] flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 sm:my-6"
      >
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Edit Course</h2>
              <p className="mt-1 text-sm text-slate-500">
                Update the course details below.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onClose?.()}
              aria-label="Close modal"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-600">Course Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                  placeholder="e.g. B.Tech in Computer Science"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600">Field</label>
                  <select
                    name="field_id"
                    value={form.field_id}
                    onChange={handleChange}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                  >
                    <option value="">Select Field</option>
                    {fields.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600">Specialization</label>
                  <select
                    name="specialization_id"
                    value={form.specialization_id}
                    onChange={handleChange}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                  >
                    <option value="">Select Specialization</option>
                    {specializations.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600">Duration</label>
                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                    placeholder="e.g. 4 Years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600">Degree Level</label>
                  <select
                    name="degree_level"
                    value={form.degree_level}
                    onChange={handleChange}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Doctoral">Doctoral</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white px-5 py-4 sm:px-8">
            {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => onClose?.()}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Update Course"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
