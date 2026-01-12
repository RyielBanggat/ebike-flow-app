import { SubscriptionCard } from '@/components/subscriptions/subscription-card';
import { subscriptions } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function SubscriptionsPage() {
  const bannerImage = getPlaceholderImage('subscription-banner');

  return (
    <div className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Subscription Plans</h1>
        <p className="mt-4 text-lg text-muted-foreground">Unlock unlimited rides with our daily, weekly, and monthly plans.</p>
      </div>

      <div className="relative rounded-xl overflow-hidden mb-12 shadow-lg">
        <Image
          src={bannerImage.imageUrl}
          alt={bannerImage.description}
          data-ai-hint={bannerImage.imageHint}
          width={1200}
          height={400}
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
         <div className="absolute bottom-0 left-0 p-8">
            <h2 className="text-4xl font-bold text-white shadow-md">Ride More, Pay Less.</h2>
            <p className="text-xl text-white/90 mt-2 shadow-md">Choose a plan that fits your lifestyle.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {subscriptions.map((plan) => (
          <SubscriptionCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
