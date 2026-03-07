import { Heading, HeadingSize, Text, TextSize } from "../typography"

export const Footer = () => {
  return (
    <footer>
      <div className="border-t border-b border-dashed">
        <div className="border-r border-l border-dashed max-w-[1250px] m-auto p-5 py-10 grid grid-cols-4 lg:grid-cols-12 gap-4">
          <div className="col-span-4">
            <Heading size={HeadingSize.xl}>
              <span className="text-primary">Wander</span>Scape
            </Heading>
            <Text className="mt-2">Plan smarter. Travel better.</Text>
          </div>
          <div className="col-span-4">
            <Heading className="text-primary">Socials</Heading>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                Instagram
              </li>
              <li>
                Facebook
              </li>
              <li>
                X
              </li>
              <li>
                LinkedIn
              </li>
            </ul>
          </div>
          <div className="col-span-4">
            <Heading className="text-primary">Help</Heading>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                Contact Us
              </li>
              <li>
                Client Service
              </li>
              <li>
                {`FAQ's`}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-b border-dashed">
        <div className="border-r border-l border-dashed max-w-[1250px] m-auto p-5">
          <Text className="mt-2 text-center" size={TextSize.xxs}>© 2026 WanderScape. All rights reserved.</Text>
        </div>
      </div>
    </footer>
  )
}