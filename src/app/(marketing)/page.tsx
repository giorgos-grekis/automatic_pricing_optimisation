import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { NeonIcon } from "./_icons/Neon";
import { ClerkIcon } from "./_icons/Clerk";
import { subscriptionTiersInOrder } from "@/data/subscriptionTiers";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/formatCompactNumber";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        {/* generally when we have larger font size it's better to used a tracking-tight because it makes your font a little bit easier to read */}
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">Price Smarter, Sell bigger!</h1>
        <p className="text-lg lg:text-3xl max-w-screen-xl">
          Optimize your product pricing across countries to maximize sales. Capture 85% of the untapped market with location-based dynamic pricing
        </p>
        <SignUpButton>
          <Button className="text-lg p-6 rounded-lg flex gap-2">
            Get started for free <ArrowRightIcon className="size-5" />
          </Button>
        </SignUpButton>
      </section>

      {/* Trusted section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 flex flex-col gap-16 px-8 md:px-16">
          <h2 className="text-3xl text-center text-balance">Trusted by the top modern companies</h2>

          <div className="grid grid-2 md:grid-cols-3 xl:grid-cols-5 gap-16">
            <Link href="https://neon.tech" target="_blank" title="Neon Tech">
              <NeonIcon />
            </Link>
            <Link href="https://cleck.com" target="_blank" title="Neon Tech">
              <ClerkIcon />
            </Link>
            <Link href="https://neon.tech" target="_blank" title="Neon Tech">
              <NeonIcon />
            </Link>
            <Link href="https://cleck.com" target="_blank" title="Neon Tech">
              <ClerkIcon />
            </Link>
            <Link href="https://neon.tech" target="_blank" title="Neon Tech">
              <NeonIcon />
            </Link>
            <Link href="https://cleck.com" target="_blank" title="Neon Tech">
              <ClerkIcon />
            </Link>
            <Link href="https://neon.tech" target="_blank" title="Neon Tech">
              <NeonIcon />
            </Link>
            <Link href="https://cleck.com" target="_blank" title="Neon Tech">
              <ClerkIcon />
            </Link>
            <Link href="https://neon.tech" target="_blank" title="Neon Tech">
              <NeonIcon />
            </Link>
            <Link className="md:max-xl:hidden" href="https://cleck.com" target="_blank" title="Neon Tech">
              <ClerkIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section id="pricing" className="px-8 py-16 bg-accent/5">
        <h2 className="text-4xl text-center text-balance font-semibold mb-8">Pricing software which pays for itself 20x over</h2>
        <div className="grid grid-col-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
          {(subscriptionTiersInOrder ?? []).map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>
    </>
  );
}

/**
 * typeof subscriptionTiersInOrder)[number]
 * means give me the type of one of the elements
 * inside this array
 */
function PricingCard({
  name,
  priceInCents,
  maxNumberOfProducts,
  maxNumberOfVisits,
  canAccessAnalytics,
  canCustomizeBanner,
  canRemoveBranding,
  stripePriceId,
}: (typeof subscriptionTiersInOrder)[number]) {
  // const isMostPopular = name === "Standard";

  const btnVariant = name === "Standard" ? "accent" : "default";

  return (
    <Card>
      <CardHeader>
        <div className="text-accent font-semibold mb-8">{name}</div>
        <CardTitle className="text-xl font-bold">${priceInCents / 100} / mo</CardTitle>
        <CardDescription>{formatCompactNumber(maxNumberOfVisits)} pricing page visits /mo</CardDescription>
      </CardHeader>

      <CardContent>
        <SignUpButton>
          <Button className="text-lg w-full rounded-lg" variant={btnVariant}>
            Get Started
          </Button>
        </SignUpButton>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 items-start">
        <Feature className="font-bold">
          {maxNumberOfProducts} {maxNumberOfProducts === 1 ? "product" : "products"}
        </Feature>

        <Feature>APO Discounts</Feature>
        {canAccessAnalytics && <Feature>Advanced analytics</Feature>}
        {canRemoveBranding && <Feature>Remove Easy APO branding</Feature>}
        {canCustomizeBanner && <Feature>Banner customization</Feature>}
      </CardFooter>
    </Card>
  );
}

function Feature({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CheckIcon className="size-4 stroke-accent bg-accent/25 rounded-full p-0.5" />
      <span>{children}</span>
    </div>
  );
}
