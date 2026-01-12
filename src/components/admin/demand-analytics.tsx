'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getDemandAnalysis } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Terminal, Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const initialState: { output: { recommendations: string } | null; error?: string } = {
  output: null,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <><Loader className="mr-2 h-4 w-4 animate-spin" />Analyzing...</> : 'Run AI Analysis'}
    </Button>
  );
}

export default function DemandAnalytics() {
  const [state, formAction] = useFormState(getDemandAnalysis, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="space-y-4">
      <form action={formAction}>
        <SubmitButton />
      </form>
      
      {pending && (
        <Card>
            <CardContent className="p-6 space-y-3">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
        </Card>
      )}

      {state.error && !pending && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Analysis Failed</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.output && !pending && (
        <Alert variant="default" className="border-primary/50 bg-primary/5">
          <Bot className="h-4 w-4" />
          <AlertTitle className="text-primary">AI Recommendations</AlertTitle>
          <AlertDescription className="text-foreground whitespace-pre-wrap">
              {state.output.recommendations}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
