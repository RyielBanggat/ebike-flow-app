'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc, serverTimestamp } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { Spinner } from "@/components/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { UserProfile } from "@/lib/data";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const userDocRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile, isLoading: profileLoading } = useDoc<UserProfile>(userDocRef);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || '');
      setLastName(userProfile.lastName || '');
      setEmail(userProfile.email || '');
      setPhoneNumber(userProfile.phoneNumber || '');
    }
  }, [userProfile]);

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !userDocRef) return;
    
    setLoading(true);
    setError(null);

    try {
      const updatedData: Partial<UserProfile> = {
        firstName,
        lastName,
        phoneNumber,
      };

      // Update Firestore document
      updateDocumentNonBlocking(userDocRef, updatedData);

      // Update Firebase Auth profile
      if (user.displayName !== `${firstName} ${lastName}`) {
          await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isUserLoading || profileLoading) {
    return <div className="flex items-center justify-center h-screen"><Spinner /></div>;
  }
  
  if (!user) {
      return null;
  }

  return (
    <div className="container mx-auto py-12">
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdateProfile}>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Update Failed</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} disabled />
                        <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <Button type="submit" disabled={loading}>{loading ? <Spinner /> : 'Update Profile'}</Button>
                </CardContent>
            </form>
        </Card>
    </div>
  );
}
