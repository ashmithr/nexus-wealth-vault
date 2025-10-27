import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CreateBudgetDialog } from "@/components/CreateBudgetDialog";

const Budgets = () => {
  const { data: budgets, isLoading, refetch } = useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budgets')
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
              <h1 className="text-4xl font-bold text-foreground mb-2">Budgets</h1>
              <p className="text-muted-foreground">Track and manage your spending limits</p>
            </div>
            <CreateBudgetDialog onBudgetCreated={refetch} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-32 w-full" />
                  </Card>
                ))}
              </>
            ) : budgets && budgets.length > 0 ? (
              budgets.map((budget) => {
                const percentage = Number(budget.limit_amount) > 0 
                  ? Math.round((Number(budget.current_spending) / Number(budget.limit_amount)) * 100)
                  : 0;
                
                return (
                  <Card key={budget.id} className="p-6 hover:shadow-medium transition-all duration-300">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-foreground">{budget.category}</h3>
                        <span className={`text-sm font-semibold ${
                          percentage > 90 ? 'text-destructive' : 
                          percentage > 75 ? 'text-accent' : 
                          'text-success'
                        }`}>
                          {percentage}%
                        </span>
                      </div>
                      
                      <Progress 
                        value={percentage} 
                        className="h-3"
                      />
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${Number(budget.current_spending).toFixed(2)} spent
                        </span>
                        <span className="text-muted-foreground">
                          of ${Number(budget.limit_amount).toFixed(2)}
                        </span>
                      </div>

                      {percentage > 90 && (
                        <div className="mt-2 p-2 bg-destructive/10 rounded-lg">
                          <p className="text-xs text-destructive font-medium">
                            ⚠️ You're approaching your budget limit
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No budgets created yet. Click "Create Budget" to get started!</p>
              </div>
            )}
          </div>

          <Card className="p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-foreground mb-4">Monthly Spending Trends</h2>
            <div className="h-64 bg-gradient-card rounded-lg flex items-center justify-center border border-border">
              <p className="text-muted-foreground">Spending trends chart will be displayed here</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Budgets;
