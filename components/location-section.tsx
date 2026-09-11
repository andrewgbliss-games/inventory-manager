import { ClockIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const hours = [
  { days: "Tuesday – Friday", time: "11:00 – 19:00" },
  { days: "Saturday – Sunday", time: "10:00 – 17:00" },
  { days: "Monday", time: "Closed" },
] as const;

export function LocationSection() {
  return (
    <section
      id="location"
      className="mx-auto grid w-full max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24"
      aria-labelledby="location-heading"
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Location</p>
          <h2
            id="location-heading"
            className="font-heading mt-2 text-3xl tracking-tight"
          >
            Come by the floor
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            The shop is on the ground floor, a short walk from the streetcar.
            Ring the bell if the door is latched during a private showing.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinIcon className="size-4" />
              Northline Atelier
            </CardTitle>
            <CardDescription>
              418 Pine Street
              <br />
              Portland, OR 97204
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Separator />
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-2 text-sm font-medium">
                <ClockIcon className="size-4" />
                Hours
              </p>
              <dl className="grid gap-2 text-sm">
                {hours.map((row) => (
                  <div
                    key={row.days}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <dt className="text-muted-foreground">{row.days}</dt>
                    <dd>{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <PhoneIcon className="size-4" />
              <a href="tel:+15035550194" className="hover:text-foreground">
                (503) 555-0194
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="relative aspect-4/3 overflow-hidden rounded-xl ring-1 ring-foreground/10 lg:aspect-square">
        <Image
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=80"
          alt="Storefront windows facing a quiet city street"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
