import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, CreditCard, TrendingUp, Plus } from "lucide-react";

const accountsData = [
  {
    id: 1,
    name: "Chase Checking",
    type: "depository",
    mask: "4567",
    balance: "$12,543.00",
    icon: Building2,
  },
  {
    id: 2,
    name: "Chase Savings",
    type: "depository",
    mask: "8901",
    balance: "$22,786.00",
    icon: Building2,
  },
  {
    id: 3,
    name: "American Express",
    type: "credit",
    mask: "1234",
    balance: "-$2,450.00",
    icon: CreditCard,
  },
  {
    id: 4,
    name: "Vanguard Investment",
    type: "investment",
    mask: "5678",
    balance: "$89,234.00",
    icon: TrendingUp,
  },
];

const Accounts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Accounts</h1>
              <p className="text-muted-foreground">Manage your linked financial accounts</p>
            </div>
            <Button className="bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Link New Account
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accountsData.map((account) => {
              const Icon = account.icon;
              return (
                <Card 
                  key={account.id} 
                  className="p-6 hover:shadow-medium transition-all duration-300 cursor-pointer bg-gradient-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{account.name}</h3>
                        <p className="text-sm text-muted-foreground">••••{account.mask}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {account.type}
                    </Badge>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">Balance</p>
                    <p className="text-2xl font-bold text-foreground">{account.balance}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-foreground mb-4">Recent Transactions</h2>
            <p className="text-muted-foreground">Select an account above to view its transactions</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Accounts;
