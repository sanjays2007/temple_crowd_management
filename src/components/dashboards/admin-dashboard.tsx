
"use client";

import type { User } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Siren, Users, Calendar, BarChart2 } from 'lucide-react';

interface AdminDashboardProps {
    user: User;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
    const { toast } = useToast();

    const handleSendAlert = () => {
        toast({
            title: "Emergency Alert Sent!",
            description: "All staff and volunteers have been notified.",
            variant: "destructive",
        })
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Management Console</CardTitle>
                    <CardDescription>
                        This is the central control panel for managing the TempleConnect application.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p>
                        From here, you can oversee user activity, manage bookings, schedule workers, and monitor the overall status of the temple operations.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button disabled><Users className="mr-2"/> Manage Users</Button>
                        <Button disabled><Calendar className="mr-2"/> Manage Bookings</Button>
                        <Button disabled><BarChart2 className="mr-2"/> View Analytics</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Siren /> Emergency Actions</CardTitle>
                    <CardDescription>
                        Broadcast urgent alerts to all staff members in case of an emergency.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full">Send Emergency Alert</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will broadcast an emergency alert to all active staff members.
                                    This should only be used in a real emergency.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSendAlert}>Confirm & Send Alert</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    )
}
