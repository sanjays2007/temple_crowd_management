import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { temples } from "@/lib/temple-data";
import { ArrowRight } from "lucide-react";

export default function TemplesPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Discover Gujarat's Divine Abodes
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Learn about the history, significance, and darshan details of these sacred temples.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {temples.map((temple) => (
          <Card key={temple.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
            <div className="relative w-full h-64">
              <Image
                src={temple.image.imageUrl}
                alt={temple.image.description}
                fill
                className="object-cover"
                data-ai-hint={temple.image.imageHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{temple.name}</CardTitle>
              <CardDescription>{temple.location}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{temple.shortDescription}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/temples/${temple.slug}`}>
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
