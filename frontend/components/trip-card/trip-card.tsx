import { Trip } from "@/lib/types"
import { FC } from "react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import Link from "next/link"

export const TripCard: FC<{ trip: Trip }> = ({ trip }) => {
  return (
    <Link href={`/trip/${trip._id}`} aria-label={trip.name}>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-square bg-black/35" />
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
          alt={trip.name}
          className="relative z-20 aspect-square w-full object-cover"
        />
        <CardHeader>
          <CardAction>
            <Badge className="bg-primary absolute right-5 bottom-8">10% discount</Badge>
          </CardAction>
          <CardTitle>{trip.name}</CardTitle>
          <CardDescription>
            {trip.description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button size="lg" variant="outline">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  )
}