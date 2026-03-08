import { CreateActivityForm } from "@/components/form";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "@/components/typography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatDate } from "@/lib/date";
import { Activity } from "@/lib/types";

const items = [
  {
    value: "notifications",
    trigger: "Notification Settings",
    content:
      "Manage how you receive notifications. You can enable email alerts for updates or push notifications for mobile devices.",
  },
  {
    value: "privacy",
    trigger: "Privacy & Security",
    content:
      "Control your privacy settings and security preferences. Enable two-factor authentication, manage connected devices, review active sessions, and configure data sharing preferences. You can also download your data or delete your account.",
  },
  {
    value: "billing",
    trigger: "Billing & Subscription",
    content:
      "View your current plan, payment history, and upcoming invoices. Update your payment method, change your subscription tier, or cancel your subscription.",
  },
]

export const Activities = ({ activities = [], tripId }: { activities: Activity[], tripId: string }) => {
  return (
    <div className="mt-5 border border-dashed rounded-md py-5 px-3 md:px-5 mg:px-10 lg:px-20">
      <Heading level={HeadingLevel.h2} size={HeadingSize.lg}>Add New Activities</Heading>
      <div className="mt-5 md:mx-5">
        <Accordion
          type="multiple"
          className="max-w-xl border-none rounded-none m-auto"
        >
          {activities.map((activity) => (
            <AccordionItem key={activity._id} value={activity.name} className="border-b border-primary">
              <AccordionTrigger >
                <Text className="bolder">{activity.name}</Text>
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <Text size={TextSize.sm}>{activity.description}</Text>
                  <div className="flex flex-col gap-1">
                    <Text size={TextSize.xs}>{formatDate(activity.startDate)} - {formatDate(activity.endDate)}</Text>
                    <Text size={TextSize.xs}>Number of days: {activity.numberOfDays}</Text>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          <AccordionItem key={'create-form'} value={'create-form'}>
            <AccordionTrigger>
              <Text className="text-primary">Add New Activity</Text>
            </AccordionTrigger>
            <AccordionContent>
              <CreateActivityForm order={activities.length + 1} tripId={tripId} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}