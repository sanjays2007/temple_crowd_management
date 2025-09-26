
"use client";

import { useEffect, useState, useTransition } from "react";
import { getAllUsers, setUserDisabledStatus, AppUser } from "@/lib/user-service";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { Loader2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function UserManagement() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    async function loadUsers() {
      setIsLoading(true);
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to load users:", error);
        toast({
          variant: "destructive",
          title: "Failed to load users",
          description: "Could not fetch user data. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  }, [toast]);

  const handleStatusChange = (uid: string, currentStatus: boolean) => {
    startTransition(async () => {
        const newStatus = !currentStatus;
        
        // Optimistically update UI
        setUsers(prevUsers => prevUsers.map(u => u.uid === uid ? {...u, disabled: newStatus} : u));

        const result = await setUserDisabledStatus(uid, newStatus);
        if (result.success) {
            toast({
                title: "User Updated",
                description: `User has been ${newStatus ? 'deactivated' : 'activated'}.`
            })
        } else {
            // Revert optimistic update on failure
            setUsers(prevUsers => prevUsers.map(u => u.uid === uid ? {...u, disabled: currentStatus} : u));
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: result.message
            });
        }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Users /> User Management
        </CardTitle>
        <CardDescription>View and manage all registered users in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.uid}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className="capitalize">{user.role}</Badge>
                    </TableCell>
                    <TableCell>{format(new Date(user.createdAt), "PPP")}</TableCell>
                    <TableCell>
                       <Badge variant={user.disabled ? 'outline' : 'default'} className={cn(!user.disabled && "bg-green-600")}>
                           {user.disabled ? 'Inactive' : 'Active'}
                       </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <div className="flex items-center justify-end gap-2">
                           <span className="text-sm text-muted-foreground">{user.disabled ? 'Activate' : 'Deactivate'}</span>
                            <Switch
                                checked={!user.disabled}
                                onCheckedChange={() => handleStatusChange(user.uid, user.disabled || false)}
                                disabled={isPending}
                                aria-label="Toggle user status"
                            />
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
