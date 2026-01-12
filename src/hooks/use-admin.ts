
'use client';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export function useAdmin() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const adminDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'roles_admin', user.uid) : null),
    [firestore, user]
  );
  
  const { data: adminDoc, isLoading: isAdminLoading } = useDoc(adminDocRef);

  return {
    isAdmin: !!adminDoc,
    isAdminLoading: isUserLoading || isAdminLoading,
  };
}
