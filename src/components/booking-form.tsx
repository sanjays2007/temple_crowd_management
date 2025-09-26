"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import QRCode from "react-qr-code";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { temples } from "@/lib/temple-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

const timeSlots = ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "14:00 - 15:00", "15:00 - 16:00"];

const bookingFormSchema = z.object({
  temple: z.string({ required_error: "Please select a temple." }),
  date: z.date({ required_error: "A date for darshan is required." }),
  timeSlot: z.string({ required_error: "Please select a time slot." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit phone number." }),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export type SavedToken = BookingFormValues & {
  id: string;
  createdAt: string;
};


export function BookingForm() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<SavedToken | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  function onSubmit(data: BookingFormValues) {
    const newBooking: SavedToken = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    
    // Save to local storage
    const existingBookings: SavedToken[] = JSON.parse(localStorage.getItem("darshanTokens") || "[]");
    localStorage.setItem("darshanTokens", JSON.stringify([...existingBookings, newBooking]));

    setGeneratedToken(newBooking);
    setIsConfirmationOpen(true);
    toast({
      title: "Booking Successful!",
      description: "Your virtual darshan token has been generated.",
    })
    form.reset();
  }
  
  const selectedTemple = temples.find(t => t.id === generatedToken?.temple);
  const qrCodeValue = generatedToken ? JSON.stringify({
    tokenId: generatedToken.id,
    temple: selectedTemple?.name,
    name: generatedToken.name,
    date: generatedToken.date,
    timeSlot: generatedToken.timeSlot,
  }) : "";


  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Book Your Virtual Darshan Token</CardTitle>
          <CardDescription>Select your preferred temple, date, and time to generate a QR code for entry.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="temple"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temple</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a temple" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {temples.map((temple) => (
                          <SelectItem key={temple.id} value={temple.id}>{temple.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Darshan Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0,0,0,0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Time Slot</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                      >
                        {timeSlots.map(slot => (
                          <FormItem key={slot} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={slot} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {slot}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your 10-digit number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">Generate Token</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AlertDialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <AlertDialogTitle className="font-headline text-2xl">Booking Confirmed!</AlertDialogTitle>
              <AlertDialogDescription className="mt-2">
                Your virtual darshan token is ready. Please show this QR code at the temple entrance.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          {generatedToken && selectedTemple && (
            <div className="my-4 p-4 border rounded-lg bg-secondary/50 space-y-3">
              <div className="flex justify-center">
                <div className="p-2 bg-white rounded-md">
                    <QRCode value={qrCodeValue} size={128} />
                </div>
              </div>
              <div className="text-center space-y-1">
                <p className="font-bold text-lg">{selectedTemple.name}</p>
                <p><strong>Date:</strong> {format(generatedToken.date, "PPP")}</p>
                <p><strong>Time Slot:</strong> {generatedToken.timeSlot}</p>
                <p><strong>Name:</strong> {generatedToken.name}</p>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsConfirmationOpen(false)} className="w-full">Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
