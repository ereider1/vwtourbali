"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { upload } from "@vercel/blob/client";

const whatsappNumber = "6281237812783";

const inputClass = "mt-2 w-full border-b border-black/20 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-[#425f32]";
const labelClass = "text-[10px] font-bold uppercase tracking-[.18em] text-black/55";

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoUploadError, setPhotoUploadError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [published, setPublished] = useState(false);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedPhoto = event.target.files?.[0] ?? null;
    if (!selectedPhoto) return;
    if (!selectedPhoto.type.startsWith("image/") || selectedPhoto.size > 8 * 1024 * 1024) {
      event.target.value = "";
      return;
    }
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhoto(selectedPhoto);
    setPhotoPreview(URL.createObjectURL(selectedPhoto));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "A guest");
    const country = String(form.get("country") || "");
    const tour = String(form.get("tour") || "my Bali tour");
    const date = String(form.get("date") || "");
    const highlights = String(form.get("highlights") || "");
    const review = String(form.get("review") || "");
    const permissionGranted = Boolean(form.get("permission"));
    const permission = permissionGranted ? "Yes, you may share this review." : "Please keep this review private.";
    let photoUrl = "";

    if (photo) {
      try {
        const safeName = photo.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-").slice(-80);
        const uploadedPhoto = await upload(`review-photos/${Date.now()}-${safeName}`, photo, {
          access: "public",
          handleUploadUrl: "/api/review-photo/upload",
        });
        photoUrl = uploadedPhoto.url;
        setPhotoUploadError("");
      } catch {
        setPhotoUploadError("We couldn't upload that photo. Please try again or choose a smaller image.");
        return;
      }
    }

    if (permissionGranted) {
      try {
        const response = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            country,
            rating,
            review,
            permission: true,
            website: form.get("website") || "",
          }),
        });

        if (!response.ok) throw new Error("Review could not be saved.");
        setSubmissionError("");
        setPublished(true);
      } catch {
        setSubmissionError("We couldn't add your review to the guest stories. Please try again.");
        return;
      }
    }

    const message = [
      "Hi Bobby, I’d like to leave a review for my Bali Safari Tour.",
      "",
      `Name: ${name}`,
      country ? `From: ${country}` : "",
      `Tour: ${tour}`,
      date ? `Tour date: ${date}` : "",
      `Rating: ${rating}/5`,
      highlights ? `Favorite part: ${highlights}` : "",
      photo ? "I have a photo to share with this review." : "",
      photoUrl ? `Photo link: ${photoUrl}` : "",
      "",
      review,
      "",
      permission,
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-[560px] bg-[#263b27] p-8 text-white shadow-[0_24px_70px_rgb(30_42_25/0.14)] sm:p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b6cd72] text-2xl font-bold text-[#263b27]" aria-hidden="true">✓</div>
        <p className="mt-10 text-[10px] font-bold uppercase tracking-[.2em] text-[#b6cd72]">Thank you for taking the time</p>
        <h3 className="mt-4 max-w-lg font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-[.88] tracking-tight sm:text-6xl">Your story is on its way</h3>
        <p className="mt-7 max-w-lg text-sm leading-7 text-white/65">{photo ? "Your photo has been added to the guest gallery at balivw.tours/#content. " : ""}{published ? "Your review is now in Stories Brought Home, and " : ""}WhatsApp should have opened with your review ready to send.</p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary mt-9 bg-[#79924f]">Open WhatsApp again <span aria-hidden>↗</span></a>
        <a href="/" className="ml-5 inline-flex text-[10px] font-bold uppercase tracking-[.18em] text-white/60 transition hover:text-white">Back to the road</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-7 shadow-[0_24px_70px_rgb(30_42_25/0.10)] sm:p-10 lg:p-12">
      <div className="flex items-start justify-between gap-6 border-b border-black/10 pb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#79924f]">01 · Your experience</p>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-black uppercase leading-none sm:text-4xl">How was your day?</h3>
        </div>
        <span className="hidden text-right text-[10px] uppercase leading-5 tracking-[.16em] text-black/35 sm:block">Private tour<br />Guest review</span>
      </div>

      <div className="mt-8 grid gap-7 sm:grid-cols-2">
        <label className="block"><span className={labelClass}>Your name *</span><input className={inputClass} name="name" required placeholder="The name you'd like us to use" /></label>
        <label className="block"><span className={labelClass}>Country / region</span><input className={inputClass} name="country" placeholder="Optional — where are you from?" /></label>
        <label className="block"><span className={labelClass}>Which tour did you take? *</span><select className={inputClass} name="tour" required defaultValue=""><option value="" disabled>Select a route</option><option>Bali Temples Tour</option><option>Bali Waterfall Tour</option><option>Kintamani Volcano Tour</option><option>Uluwatu Sunset Tour</option><option>Bali Swing and Ubud Tour</option><option>Jatiluwih & Tanah Lot Tour</option><option>Gates of Heaven Tour</option><option>A custom / private route</option></select></label>
        <label className="block"><span className={labelClass}>When did you travel?</span><input className={inputClass} name="date" type="date" /></label>
      </div>

      <fieldset className="mt-9 border-0 p-0">
        <legend className={labelClass}>How would you rate your experience? *</legend>
        <div className="mt-3 flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} aria-label={`Rate ${star} out of 5`} className={`p-1 text-3xl leading-none transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#425f32] ${star <= rating ? "text-[#79924f]" : "text-black/15"}`}>★</button>
          ))}
          <span className="ml-3 text-xs text-black/45">{rating === 5 ? "Absolutely loved it" : rating >= 4 ? "A great day" : "Thanks for your honesty"}</span>
        </div>
      </fieldset>

      <div className="mt-8 grid gap-7">
        <label className="block"><span className={labelClass}>What stood out most?</span><input className={inputClass} name="highlights" placeholder="A favorite stop, your guide, the VW, lunch..." /></label>
        <label className="block"><span className={labelClass}>Tell us about it *</span><textarea className="mt-2 min-h-36 w-full resize-y border-b border-black/20 bg-transparent px-0 py-3 text-sm leading-7 outline-none transition placeholder:text-black/35 focus:border-[#425f32]" name="review" required placeholder="What will you remember about the day?" /></label>
      </div>

      <div className="mt-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className={labelClass}>Add a photo</span>
          <span className="text-[10px] uppercase tracking-[.16em] text-black/35">Optional · 8 MB max</span>
        </div>
        <label className="mt-3 flex cursor-pointer items-center gap-4 border border-dashed border-black/20 p-4 transition hover:border-[#425f32] hover:bg-[#f7f6f0]">
          {photoPreview ? <img src={photoPreview} alt="Selected review photo preview" className="h-16 w-16 shrink-0 object-cover" /> : <span className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#f0eee5] text-2xl text-[#79924f]" aria-hidden="true">＋</span>}
          <span className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-[.12em] text-[#425f32]">{photo ? "Change photo" : "Choose a photo"}</span>
            <span className="mt-1 block truncate text-xs text-black/45">{photo?.name ?? "A favorite moment from your day"}</span>
          </span>
          <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} />
        </label>
        {photoUploadError ? <p className="mt-2 text-xs text-[#a04832]">{photoUploadError}</p> : null}
      </div>

      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="mt-8 flex cursor-pointer items-start gap-3 text-xs leading-5 text-black/55"><input className="mt-0.5 h-4 w-4 accent-[#425f32]" type="checkbox" name="permission" /> <span>It&apos;s okay to share my review on the website or social media.</span></label>
      {submissionError ? <p className="mt-4 text-xs leading-5 text-[#a04832]">{submissionError}</p> : null}
      <p className="mt-5 text-[11px] leading-5 text-black/35">Your review will open in WhatsApp so you can check it before sending.</p>
      <button type="submit" className="btn-primary mt-8 w-full bg-[#425f32] py-4 sm:w-auto">Send my review <span aria-hidden>↗</span></button>
    </form>
  );
}
