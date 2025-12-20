// src/app/page.tsx
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

type Puppy = {
  id: string
  name: string
  birth: string
  gender: string
  color: string
  sire: string
  dam: string
  price: string
  hero_image: string | null
  created_at?: string
}

export default async function Home() {
  const { data: puppies } = await supabase
    .from('puppies')
    .select('*')
    .order('birth', { ascending: false })

  return (
    <main className="min-h-screen bg-deepblack text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-16 text-burgundy">
          Available Puppies
        </h1>

        {puppies && puppies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {puppies.map((pup: Puppy) => (
              <div key={pup.id} className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02]">
                {pup.hero_image && (
                  <Image
                    src={pup.hero_image}
                    alt={pup.name}
                    width={800}
                    height={1000}
                    className="w-full aspect-[4/5] object-cover"
                  />
                )}
                <div className="p-8 text-center">
                  <h3 className="text-4xl font-bold text-burgundy">{pup.name}</h3>
                  <p className="text-gray-300 mt-2">
                    {pup.color} • {pup.gender} • Born{' '}
                    {new Date(pup.birth).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="mt-4 text-gray-400">
                    Sire: {pup.sire} • Dam: {pup.dam}
                  </p>
                  <p className="text-3xl font-bold mt-6 text-luxurygold">{pup.price}</p>
                  <a
                    href="/admin"
                    className="mt-8 inline-block w-full bg-burgundy hover:bg-burgundy/90 py-4 rounded-lg font-semibold transition"
                  >
                    View Gallery →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl text-gray-400">No puppies yet — add one in /admin!</p>
        )}
      </div>
    </main>
  )
}