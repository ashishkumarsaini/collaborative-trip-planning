import { MapPin, Search } from "lucide-react";
import { Text } from "@/components/typography";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroTripSearch = () => {
  return (
    <div className="max-w-4xl w-full">
      <div className=" rounded-sm border border-dashed">
        <form>
          <div className="grid grid-col-3 md:grid-col-6 lg:grid-cols-12 gap lg:gap-4">
            <div className="col-span-4 px-3 gap-2 py-5 lg:border-r border-dashed">
              <Field>
                <FieldLabel htmlFor="destination">
                  <MapPin className="fill-primary" />
                  <Text>Country</Text>
                </FieldLabel>
                <Select defaultValue="">
                  <SelectTrigger id="destination">
                    <SelectValue placeholder="Select Destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="developer">India</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="col-span-4 px-3 gap-2 py-5 lg:border-r border-dashed">
              <Field>
                <FieldLabel htmlFor="destination">
                  <MapPin className="fill-primary" />
                  <Text>City</Text>
                </FieldLabel>
                <Select defaultValue="">
                  <SelectTrigger id="destination">
                    <SelectValue placeholder="Select Destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="developer">Manali</SelectItem>
                      <SelectItem value="designer">Goa</SelectItem>
                      <SelectItem value="manager">Jaipur</SelectItem>
                      <SelectItem value="other">Banglore</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className=" col-span-4 px-5 gap-2 py-5 flex items-center justify-center">
              <Link href='/trips' className="w-full">
                <Button type="submit" className="w-full" size="lg">
                  <Search />
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <small>Not working for now!</small>
    </div>
  )
};
