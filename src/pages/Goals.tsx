import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CreateGoalDialog } from "@/components/CreateGoalDialog";

const Goals = () => {
  const { data: goals, isLoading, refetch } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goals')
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
              <h1 className="text-4xl font-bold text-foreground mb-2">Financial Goals</h1>
              <p className="text-muted-foreground">Track progress towards your savings goals</p>
            </div>
            <CreateGoalDialog onGoalCreated={refetch} />
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
            ) : goals && goals.length > 0 ? (
              goals.map((goal) => {
                const percentage = Number(goal.target_amount) > 0
                  ? Math.round((Number(goal.current_amount) / Number(goal.target_amount)) * 100)
                  : 0;
                
                return (
                  <Card key={goal.id} className="p-6 hover:shadow-medium transition-all duration-300 bg-gradient-card">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Target className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-foreground">{goal.goal_name}</h3>
                            <p className="text-sm text-muted-foreground">
                              ${Number(goal.current_amount).toLocaleString()} of ${Number(goal.target_amount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-primary">{percentage}%</span>
                      </div>
                      
                      <Progress value={percentage} className="h-3" />
                      
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Add Contribution
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          ${(Number(goal.target_amount) - Number(goal.current_amount)).toLocaleString()} remaining
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No goals created yet. Click "Create Goal" to get started!</p>
              </div>
            )}
          </div>

          <Card className="p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-foreground mb-4">Goals Progress Overview</h2>
            <div className="h-64 bg-gradient-card rounded-lg flex items-center justify-center border border-border">
              <p className="text-muted-foreground">Goals progress chart will be displayed here</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Goals;
