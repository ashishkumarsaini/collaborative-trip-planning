import { Trip } from "@/lib/types"
import { FC } from "react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { Text, TextSize } from "../typography"

export const TripCard: FC<{ trip: Trip }> = ({ trip }) => {
  return (
    <Link href={`/trip/${trip._id}`} aria-label={trip.name}>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
          alt={trip.name}
          className="relative z-20 h-70 w-full object-cover"
        />
        <CardHeader>
          <CardAction>
            <Badge className="bg-primary absolute right-5 bottom-8">10% discount</Badge>
          </CardAction>
          <CardTitle><Text size={TextSize.sm}>{trip.name}</Text></CardTitle>
          <CardDescription>
            {trip.description && <Text size={TextSize.xxs}>{trip.description.slice(0, 150)}<span className="text-primary">...</span></Text>}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button size="lg" variant="outline">View Details</Button>
        </CardFooter>
      </Card>
    </Link >
  )
}