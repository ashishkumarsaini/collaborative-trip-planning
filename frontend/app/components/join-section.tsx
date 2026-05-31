import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const JoinSection = () => {
  return (
    <section className="serene-shell pb-10">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-primary px-5 py-16 text-center text-white sm:rounded-[2rem] sm:px-6 sm:py-24 md:px-12 lg:py-30">
        <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80" alt="Warm landscape at sunset" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="relative">
          <Heading level={HeadingLevel.h2} size={HeadingSize.xl} className="text-white">Ready for your next journey?</Heading>
          <Text size={TextSize.sm} className="mx-auto mt-3 max-w-xl text-white/85">Join thousands of travelers who have found a better way to explore the world together.</Text>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/all"><Button variant="secondary" size="lg" className="w-full border-white/50 bg-white/10 text-white hover:bg-white/20 sm:w-auto">Start Planning</Button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
