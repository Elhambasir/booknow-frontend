import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ProfileForm from "./ProfileForm";
import { TabsContent } from "@/components/ui/tabs";
import { UserDetails } from "@/types";

const ProfileTab = ({ value, userDetails, totalTrips }: { value: string, userDetails: UserDetails, totalTrips: number }) => {
  return (
    <TabsContent value={value} className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <ProfileForm userDetails={userDetails}/>

        <div className="space-y-6">
          <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">
                Account Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">
                  Member Since
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(userDetails?.createdAt)?.toDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">
                  Total Trips
                </span>
                <span className="text-sm font-semibold text-primary">
                  {totalTrips}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">
                  Favorite Route
                </span>
                <span className="text-sm text-muted-foreground">
                  Airport transfers
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-brand-gold/10 to-brand-gold/5">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-3 text-brand-gold" />
              <h3 className="font-semibold mb-2">Premium Member</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enjoy exclusive benefits and priority booking
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Benefits
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};

export default ProfileTab;