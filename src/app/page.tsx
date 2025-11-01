import Hero from '@/components/Hero'
import PopularTools from '@/components/PopularTools'
import ToolCategories from '@/components/ToolCategories'
import BlogShowcase from '@/components/BlogShowcase'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <PopularTools />
      <ToolCategories />
      <BlogShowcase />
    </div>
  )
}
