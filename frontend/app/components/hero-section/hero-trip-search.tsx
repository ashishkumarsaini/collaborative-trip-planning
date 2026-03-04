import { MapPin, Search } from "lucide-react";
import { Text } from "@/components/typography";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const HeroTripSearch = () => {
  return (
    <div className="w-full rounded-sm border border-dashed">
      <form>
        <div className="grid grid-col-6 lg:grid-cols-12 gap-4">
          <div className="col-start-1 col-span-3 px-3 gap-2 py-5 border-r border-dashed">
            <Field>
              <FieldLabel htmlFor="destination">
                <MapPin className="fill-primary" />
                <Text>Destination</Text>
              </FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="destination">
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="col-start-4 col-span-3 px-3 gap-2 py-5 border-r border-dashed">
            <Field>
              <FieldLabel htmlFor="destination">
                <MapPin className="fill-primary" />
                <Text>Destination</Text>
              </FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="destination">
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="col-start-7 col-span-3 px-3 gap-2 py-5 border-r border-dashed">
            <Field>
              <FieldLabel htmlFor="destination">
                <MapPin className="fill-primary" />
                <Text>Destination</Text>
              </FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="destination">
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="col-start-10 col-span-3 px-5 gap-2 py-5 flex items-center justify-center">
            <Button type="submit" className="w-full" size="lg">
              <Search />
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}