import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, CreditCard, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LinkAccountDialog } from "@/components/LinkAccountDialog";

const getAccountIcon = (type: string) => {
  switch (type) {
    case "credit":
      return CreditCard;
    case "investment":
      return TrendingUp;
    default:
      return Building2;
  }
};

const Accounts = () => {
  const { data: accounts, isLoading, refetch } = useQuery({
    queryKey: ['linked-accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('linked_accounts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });
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
            <LinkAccountDialog onAccountCreated={refetch} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-24 w-full" />
                  </Card>
                ))}
              </>
            ) : accounts && accounts.length > 0 ? (
              accounts.map((account) => {
                const Icon = getAccountIcon(account.account_type);
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
                          <h3 className="font-bold text-foreground">{account.account_name}</h3>
                          {account.account_mask && (
                            <p className="text-sm text-muted-foreground">••••{account.account_mask}</p>
                          )}
                        </div>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {account.account_type}
                      </Badge>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">Balance</p>
                      <p className="text-2xl font-bold text-foreground">
                        ${Number(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No accounts linked yet. Click "Link New Account" to get started!</p>
              </div>
            )}
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
