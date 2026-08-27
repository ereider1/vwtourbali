"use client";

import { useEffect, useState } from "react";
import type { GalleryPhoto } from "@/lib/gallery";

export default function GalleryAdmin() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/gallery").then((response) => response.json()).then((data: { photos?: GalleryPhoto[] }) => setPhotos(data.photos ?? []));
  }, []);

  async function save(nextPhotos: GalleryPhoto[], notice = "Saved") {
    setPhotos(nextPhotos);
    const response = await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reorder", photos: nextPhotos }),
    });
    setMessage(response.ok ? notice : "Could not save changes");
  }

  function movePhoto(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    const from = photos.findIndex((photo) => photo.id === draggedId);
    const to = photos.findIndex((photo) => photo.id === targetId);
    const next = [...photos];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    void save(next, "Order saved");
    setDraggedId(null);
  }

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.set("file", file);
    const response = await fetch("/api/admin/gallery/upload", { method: "POST", body: formData });
    const data = (await response.json()) as { photo?: GalleryPhoto; error?: string };
    if (response.ok && data.photo) setPhotos((current) => [...current, data.photo as GalleryPhoto]);
    setMessage(response.ok ? "Photo added" : data.error ?? "Upload failed");
    event.target.value = "";
  }

  async function toggle(photo: GalleryPhoto) {
    const response = await fetch("/api/admin/gallery", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: photo.id, isPublished: !photo.isPublished }) });
    if (response.ok) setPhotos((current) => current.map((item) => item.id === photo.id ? { ...item, isPublished: !item.isPublished } : item));
  }

  async function remove(photo: GalleryPhoto) {
    if (!window.confirm("Remove this photo from the gallery?")) return;
    const response = await fetch("/api/admin/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: photo.id }) });
    if (response.ok) setPhotos((current) => current.filter((item) => item.id !== photo.id));
    setMessage(response.ok ? "Photo removed" : "Could not remove photo");
  }

  return <main className="min-h-screen bg-[#fbfaf6] px-5 py-10 text-[#20241f] sm:px-10">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-black/10 pb-8">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#79924f]">Content studio</p><h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-black uppercase leading-none">Guest gallery</h1><p className="mt-3 text-sm text-black/55">Drag photos to change their order on the live page.</p></div>
        <label className="cursor-pointer bg-[#263b27] px-5 py-3 text-xs font-bold uppercase tracking-[.15em] text-white hover:bg-[#425f32]">Add photo<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={upload} /></label>
      </div>
      <p className="h-10 pt-4 text-sm text-[#425f32]">{message}</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => <article key={photo.id} draggable onDragStart={() => setDraggedId(photo.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => movePhoto(photo.id)} className={`group bg-white p-2 shadow-sm ${photo.isPublished ? "" : "opacity-50"}`}>
          <div className="relative aspect-square overflow-hidden bg-[#263b27]"><img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" /><span className="absolute left-2 top-2 bg-[#20241f]/75 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{photo.isPublished ? "Live" : "Hidden"}</span></div>
          <div className="flex items-center justify-between gap-2 p-2"><span className="truncate text-xs text-black/55">{photo.id}</span><div className="flex gap-2"><button type="button" onClick={() => void toggle(photo)} className="text-xs font-bold text-[#425f32]">{photo.isPublished ? "Hide" : "Show"}</button><button type="button" onClick={() => void remove(photo)} className="text-xs font-bold text-red-700">Delete</button></div></div>
        </article>)}
      </div>
    </div>
  </main>;
}