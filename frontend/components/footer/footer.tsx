import { Heading, HeadingSize, Text } from "../typography"

export const Footer = () => {
  return (
    <div className="border-t border-b border-dashed">
      <div className="border-r border-l border-dashed max-w-[1250px] m-auto p-5 py-10 h-100 grid grid-cols-3">
        <div>
          <Heading size={HeadingSize.xl}>
            TripBees
          </Heading>
          <Text className="mt-2">Plan smarter. Travel better.</Text>
        </div>
      </div>
    </div>
  )
}