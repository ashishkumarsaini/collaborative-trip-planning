import Link from "next/link";
import { Heading, HeadingLevel, HeadingSize, Text, TextSize } from "../typography";

const footerLinks = {
  Company: ["About Us", "Press", "Contact"],
  Support: ["Sustainability", "Help Center"],
  Legal: ["Terms of Service", "Privacy"],
};

export const Footer = () => {
  return (
    <footer className="mt-16 bg-[#efe0d9]">
      <div className="serene-shell grid gap-10 py-12 md:grid-cols-[1.4fr_2fr]">
        <div>
          <Link href="/" className="text-2xl font-extrabold text-primary">
            WanderScape
          </Link>
          <Text size={TextSize.xxs} className="mt-4 max-w-sm leading-6 text-muted-foreground">
            Designing the future of collaborative exploration through thoughtful design and intelligent tools.
          </Text>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <Heading level={HeadingLevel.h3} size={HeadingSize.xs} className="text-xs font-bold uppercase tracking-widest text-foreground">{title}</Heading>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="transition-colors hover:text-primary">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-primary/10">
        <div className="serene-shell flex flex-col gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <Text size={TextSize.xxs}>© 2026 WanderScape. All rights reserved.</Text>
          <Text size={TextSize.xxs}>ENG (USD)</Text>
        </div>
      </div>
    </footer>
  );
};
