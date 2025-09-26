
import type { User } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface UserDashboardProps {
    user: User;
}

export function UserDashboard({ user }: UserDashboardProps) {
    const router = useRouter();
    
    const handleSignOut = async () => {
        await auth.signOut();
        router.push("/");
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>This is your central hub for managing your activities.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> <span className="capitalize bg-primary/20 text-primary font-medium py-1 px-2 rounded-md">User</span></p>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button asChild>
                            <Link href="/queue">Book Darshan Token</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/tokens">View My Tokens</Link>
                        </Button>
                    </div>
                    <Button onClick={handleSignOut} variant="destructive" className="w-full">Sign Out</Button>
                </CardContent>
            </Card>
        </div>
    )
}
