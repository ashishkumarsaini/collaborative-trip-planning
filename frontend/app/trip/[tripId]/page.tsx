import { Heading, HeadingLevel, HeadingSize, Text, TextSize, TextType } from "@/components/typography"
import { Button } from "@/components/ui/button";
import { ActivityTimeline } from "./components/timeline";

const data = {
  "trip": {
    _id: "69a673cdd94a9921a196c305",
    description: 'Follow the essential steps to bring your innovative idea to market and ensure a successful product debut.',
    name: "Grand Horizon Luxury Goa",
    activities: [
      {
        _id: "69a5e840493c36c060f1f0f2",
        name: "Cochin - Munnar",
        description: 'Arrive at Cochin Airport or Railway Station and transfer to Munnar. Travel through Valparai with stops at Cheeyappara Waterfalls and tea plantation',
        numberOfDays: 10,
        startDate: "2026-05-10T00:00:00.000Z",
        "location": {
          "_id": "69a5178adec421dd5c82f7b8",
          "city": "Cochin",
          "address": "shri ram vihar, delhi road",
          "state": "UP",
          "country": "India",
          "__v": 0
        },
        order: 1,
        endDate: "2026-05-20T00:00:00.000Z",
        "__v": 0
      },
      {
        _id: "Explore Munnar",
        name: "activit1y1222",
        description: 'After breakfast, proceed for Munnar sightseeing.Visit Mattupettu Dam, Kundala Dam and Eco point. Later, visit the Tea Museum. Overnight stay in Munnar.',
        numberOfDays: 10,
        startDate: "2026-05-10T00:00:00.000Z",
        "location": {
          "_id": "69a5178adec421dd5c82f7b8",
          "city": "Munnar",
          "address": "shri ram vihar, delhi road",
          "state": "UP",
          "country": "India",
          "__v": 0
        },
        order: 2,
        endDate: "2026-05-20T00:00:00.000Z",
        "__v": 0
      },
      {
        _id: "69a5fe1aa1496d7a05c6655b",
        name: "Drive from Munnar to Alappuzha",
        description: 'Check out after breakfast and drive to Alappuzha. Check in at the hotel on arrival. Spend time enjoying the backwater surroundings.',
        numberOfDays: 10,
        startDate: "2026-05-10T00:00:00.000Z",
        "location": {
          "_id": "69a5178adec421dd5c82f7b8",
          "city": "Alappuzha",
          "address": "shri ram vihar, delhi road",
          "state": "UP",
          "country": "India",
          "__v": 0
        },
        order: 3,
        endDate: "2026-05-20T00:00:00.000Z",
        "__v": 0
      },
      {
        _id: "69a5fe1aa1496d7a05c6655b",
        name: "Journey from Alappuzha to Kovalam",
        description: 'Proceed to Kovalam after breakfast. Check in at the hotel. Explore the beaches of Kovalam and activities like kayaking, swimming, surfing',
        numberOfDays: 10,
        startDate: "2026-05-10T00:00:00.000Z",
        "location": {
          "_id": "69a5178adec421dd5c82f7b8",
          "city": "Kovalam",
          "address": "shri ram vihar, delhi road",
          "state": "UP",
          "country": "India",
          "__v": 0
        },
        order: 4,
        endDate: "2026-05-20T00:00:00.000Z",
        "__v": 0
      },
      {
        _id: "69a5fe1aa1496d7a05c6655b",
        name: "Trivandrum Sightseeing",
        description: 'This relaxed journey through Kerala brings together misty hill stations, tranquil backwaters, and sun kissed coastal landscapes.Beginning in the tea- covered slopes of Munnar, the itinerary offers scenic drives, nature - led sightseeing, and time to unwind amidst cool mountain air.The experience then flows into the serene backwaters of Alleppey, followed by a coastal retreat at Poovar with mangrove cruises and quiet beach moments.',
        numberOfDays: 10,
        startDate: "2026-05-10T00:00:00.000Z",
        "location": {
          "_id": "69a5178adec421dd5c82f7b8",
          "city": "Trivandrum",
          "address": "shri ram vihar, delhi road",
          "state": "UP",
          "country": "India",
          "__v": 0
        },
        order: 5,
        endDate: "2026-05-20T00:00:00.000Z",
        "__v": 0
      }
    ],
    "createdByUser": "69a4ab33a8652c90b3df0469",
    "numberOfDays": 20,
    "startDate": "2026-05-10T00:00:00.000Z",
    "endDate": "2026-05-20T00:00:00.000Z",
  }
}

export default function TripPage() {
  const trip = data.trip;

  return (
    <div className="md:py-5 lg:py-10">
      <div className="py-5 flex flex-col md:flex-row justify-between gap-5 md:gap-10 border-b border-dashed bg-background z-10 sticky top-mobile-header lg:top-desktop-header">
        <div>
          <Heading level={HeadingLevel.h1} size={HeadingSize.xl}>{trip.name}</Heading>
          <Text type={TextType.paragraph} size={TextSize.sm} className="mt-5">{trip.description}</Text>
        </div>
        <div>
          <Button size="lg">Book Now</Button>
        </div>
      </div>
      <ActivityTimeline activities={trip.activities} />
    </div>
  )
}