import { BookingForm } from "@/components/booking-form";

export default function QueuePage() {
  return (
    <div className="container py-12">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Virtual Queue Booking
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Secure your spot in the darshan line from the comfort of your home.
        </p>
      </div>
      <BookingForm />
    </div>
  );
}
