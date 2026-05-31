import { Route, Sparkles, Users } from "lucide-react"
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography"

export const FeaturesSection = () => {
  return (
    <section className="bg-[#fff1ea] py-12 sm:py-16">
      <div className="serene-shell grid gap-8 lg:grid-cols-[1.1fr_1.6fr] lg:items-center">
        <div>
          <Heading level={HeadingLevel.h2} size={HeadingSize.xl} className="max-w-sm leading-tight">Smart Planning for Modern Travelers</Heading>
          <Text size={TextSize.xxs} className="mt-4 max-w-md leading-6 text-muted-foreground">
            Combine collaborative tools with intelligent routing to create itineraries that are not just lists, but experiences.
          </Text>
          <div className="mt-7 space-y-5">
            <div className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Users className="size-5" /></span>
              <div>
                <Heading level={HeadingLevel.h3} size={HeadingSize.xs}>Collaborative Curation</Heading>
                <Text size={TextSize.xxs} className="text-muted-foreground">Invite friends to vote on activities and add recommendations in real time.</Text>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e6e97d]/50 text-[#5d6000]"><Sparkles className="size-5" /></span>
              <div>
                <Heading level={HeadingLevel.h3} size={HeadingSize.xs}>AI-Powered Optimization</Heading>
                <Text size={TextSize.xxs} className="text-muted-foreground">Let WanderScape suggest smoother routes, timing, and open planning windows.</Text>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="serene-card rounded-[2rem] p-5">
            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80" alt="Friends planning a trip" className="h-48 w-full rounded-[1.5rem] object-cover" />
            <Text size={TextSize.xxs} className="mt-5 font-bold uppercase text-primary">Shared List</Text>
            <Heading level={HeadingLevel.h3} size={HeadingSize.lg} className="mt-1">Live Group Editing</Heading>
            <Text size={TextSize.xxs} className="mt-2 text-muted-foreground">See who is planning what with clear presence indicators.</Text>
          </div>
          <div className="serene-card rounded-[2rem] p-5">
            <div className="grid h-48 place-items-center rounded-[1.5rem] bg-[#372f2a] text-[#ffdbc9]">
              <Route className="size-20" />
            </div>
            <Text size={TextSize.xxs} className="mt-5 font-bold uppercase text-primary">Smart Routing</Text>
            <Heading level={HeadingLevel.h3} size={HeadingSize.lg} className="mt-1">AI Route Builder</Heading>
            <Text size={TextSize.xxs} className="mt-2 text-muted-foreground">Automatically group activities by location to save hours of transit time.</Text>
          </div>
        </div>
      </div>
    </section>
  )
}
