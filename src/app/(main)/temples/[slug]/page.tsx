import { temples } from '@/lib/temple-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, BookOpen, Landmark, Lightbulb, MapPin, Star } from 'lucide-react';

export async function generateStaticParams() {
  return temples.map((temple) => ({
    slug: temple.slug,
  }));
}

export default function TempleDetailPage({ params }: { params: { slug: string } }) {
  const temple = temples.find((t) => t.slug === params.slug);

  if (!temple) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">{temple.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{temple.location}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-3">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image
              src={temple.image.imageUrl}
              alt={temple.image.description}
              fill
              className="object-cover"
              data-ai-hint={temple.image.imageHint}
            />
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col space-y-6">
           <Card>
            <CardHeader className="flex flex-row items-center space-x-4">
              <Landmark className="w-8 h-8 text-primary" />
              <CardTitle className="font-headline">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{temple.description}</p>
            </CardContent>
          </Card>

           <Card>
            <CardHeader className="flex flex-row items-center space-x-4">
              <Clock className="w-8 h-8 text-primary" />
              <CardTitle className="font-headline">Timings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-medium">{temple.timings}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
            <CardHeader className="flex flex-row items-center space-x-4">
                <BookOpen className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline">History</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{temple.history}</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center space-x-4">
                <Star className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline">Highlights & Attractions</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{temple.highlights}</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center space-x-4">
                <MapPin className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline">How to Reach</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{temple.howToReach}</p>
            </CardContent>
        </Card>
         <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader className="flex flex-row items-center space-x-4">
                <Lightbulb className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline">Tourist Tips</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{temple.touristTips}</p>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
