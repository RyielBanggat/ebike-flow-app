import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Subscription } from "@/lib/data";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export function SubscriptionCard({ plan }: { plan: Subscription }) {
  return (
    <Card className={cn(
        "flex flex-col",
        plan.isPopular && "border-primary shadow-lg"
    )}>
        {plan.isPopular && (
            <Badge className="absolute -top-3 right-4 flex items-center gap-1">
                <Star className="h-3 w-3"/> Most Popular
            </Badge>
        )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>
            <span className="text-3xl font-bold text-foreground">₱{plan.price}</span>
            <span className="text-muted-foreground">{plan.duration}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center text-sm">
              <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
          Choose Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
