'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useFirestore } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, AuthError } from "firebase/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

export default function SignupPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const firestore = useFirestore();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/');
            }
        });
        return () => unsubscribe();
    }, [auth, router]);

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: `${firstName} ${lastName}` });
            
            const userDocRef = doc(firestore, "users", user.uid);
            
            const userData = {
                id: user.uid,
                firstName,
                lastName,
                email,
                createdAt: serverTimestamp(),
            };
            
            setDocumentNonBlocking(userDocRef, userData, { merge: true });

            // Let onAuthStateChanged handle redirect
        } catch (e) {
            const error = e as AuthError;
            setError(error.message);
            setLoading(false);
        }
    };


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
        <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
            Enter your information to create an account
            </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
            <CardContent className="grid gap-4">
                 {error && (
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Signup Failed</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="Max" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Robinson" required value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Spinner /> : 'Create an account'}
                </Button>
                 <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </form>
        </Card>
    </div>
  );
}
