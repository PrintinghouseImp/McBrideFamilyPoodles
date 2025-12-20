'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Admin() {
  const [form, setForm] = useState({
    name: '',
    birth: '',
    gender: 'Female',
    color: '',
    sire: '',
    dam: '',
    price: '',
  })
  const [heroFile, setHeroFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    let heroUrl = ''
    const galleryUrls: string[] = []

    // Upload hero
    if (heroFile) {
      const fileName = `${Date.now()}_${heroFile.name}`
      const { data } = await supabase.storage.from('puppies').upload(`hero/${fileName}`, heroFile)
      if (data) heroUrl = supabase.storage.from('puppies').getPublicUrl(data.path).data.publicUrl
    }

    // Upload gallery photos
    for (const file of galleryFiles) {
      const fileName = `${Date.now()}_${file.name}`
      const { data } = await supabase.storage.from('puppies').upload(`gallery/${fileName}`, file)
      if (data) {
        galleryUrls.push(supabase.storage.from('puppies').getPublicUrl(data.path).data.publicUrl)
      }
    }

    // Save puppy record
    const { error } = await supabase.from('puppies').insert({
      ...form,
      hero_image: heroUrl,
      gallery_images: galleryUrls,
    })

    if (!error) {
      alert('Puppy published successfully!')
      setForm({ name: '', birth: '', gender: 'Female', color: '', sire: '', dam: '', price: '' })
      setHeroFile(null)
      setGalleryFiles([])
    } else {
      alert('Error: ' + error.message)
    }
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-deepblack py-16">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-3xl p-10 shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-burgundy mb-10">Add New Puppy</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input className="w-full p-4 bg-gray-800 rounded-lg" placeholder="Name" required
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input type="date" className="w-full p-4 bg-gray-800 rounded-lg" required
            value={form.birth} onChange={(e) => setForm({ ...form, birth: e.target.value })} />

          <select className="w-full p-4 bg-gray-800 rounded-lg"
            value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
            <option>Female</option>
            <option>Male</option>
          </select>

          <input className="w-full p-4 bg-gray-800 rounded-lg" placeholder="Color" required
            value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />

          <input className="w-full p-4 bg-gray-800 rounded-lg" placeholder="Sire" required
            value={form.sire} onChange={(e) => setForm({ ...form, sire: e.target.value })} />

          <input className="w-full p-4 bg-gray-800 rounded-lg" placeholder="Dam" required
            value={form.dam} onChange={(e) => setForm({ ...form, dam: e.target.value })} />

          <input className="w-full p-4 bg-gray-800 rounded-lg" placeholder="Price or status" required
            value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />

          <div>
            <label className="block text-burgundy mb-2 font-semibold">Hero photo (main card)</label>
            <input type="file" accept="image/*" required className="w-full"
              onChange={(e) => setHeroFile(e.target.files?.[0] || null)} />
          </div>

          <div>
            <label className="block text-burgundy mb-2 font-semibold">Gallery photos (hold Ctrl/Cmd to select many)</label>
            <input type="file" accept="image/*" multiple className="w-full"
              onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))} />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-burgundy hover:bg-burgundy/90 disabled:opacity-60 py-5 text-xl font-bold rounded-lg transition"
          >
            {uploading ? 'Publishing…' : 'Publish Puppy'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-10">
          Public page: <a href="/" className="text-burgundy underline">localhost:3000</a>
        </p>
      </div>
    </div>
  )
}