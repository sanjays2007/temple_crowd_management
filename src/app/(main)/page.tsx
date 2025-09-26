import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Map,
  Sparkles,
  Ticket,
  Users,
  BookOpen,
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: <Ticket className="h-8 w-8 text-primary" />,
    title: "Virtual Queue",
    description: "Book your darshan slot online and avoid long waits.",
    href: "/queue",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Live Crowd Status",
    description: "Check real-time crowd levels and waiting times.",
    href: "/status",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Temple Information",
    description: "Explore history, timings, and details of each temple.",
    href: "/temples",
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: "Interactive Maps",
    description: "Navigate temple complexes with ease.",
    href: "/maps",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Schedules & Events",
    description: "Stay updated on prayer times and special events.",
    href: "/temples",
  },
];

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner');

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center">
        {heroImage && (
            <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
            />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-headline tracking-tight">
            Welcome to TempleConnect
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90">
            Your seamless guide to a divine pilgrimage experience in Gujarat.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/queue">Book Darshan Token</Link>
          </Button>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Features for a Blessed Journey
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide a suite of tools to make your visit peaceful, organized, and spiritually fulfilling.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.title} className="group">
                <Card className="h-full transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
