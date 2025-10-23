import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Shield, Bell, CreditCard } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences</p>
          </div>

          {/* Profile Section */}
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="user@example.com" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" className="mt-1" />
                </div>
              </div>
              <Button className="bg-gradient-primary">Save Changes</Button>
            </div>
          </Card>

          {/* Security Section */}
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <div className="pt-4 border-t border-border">
                <Button variant="outline">Change Password</Button>
              </div>
            </div>
          </Card>

          {/* Notifications Section */}
          <Card className="p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Budget Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when approaching limits</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Transaction Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts for new transactions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Investment Updates</p>
                  <p className="text-sm text-muted-foreground">Daily portfolio performance summary</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Subscription Section */}
          <Card className="p-6 shadow-soft bg-gradient-card">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Subscription</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Current Plan</p>
                  <p className="text-sm text-muted-foreground">Premium Monthly - $9.99/month</p>
                </div>
                <Button variant="outline">Manage Plan</Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
