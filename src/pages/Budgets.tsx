import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

const budgetsData = [
  { category: "Groceries", spent: 420, limit: 500, percentage: 84 },
  { category: "Dining Out", spent: 280, limit: 300, percentage: 93 },
  { category: "Transportation", spent: 150, limit: 400, percentage: 38 },
  { category: "Entertainment", spent: 180, limit: 200, percentage: 90 },
  { category: "Shopping", spent: 340, limit: 500, percentage: 68 },
  { category: "Utilities", spent: 175, limit: 250, percentage: 70 },
];

const Budgets = () => {
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
            <Button className="bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Create Budget
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {budgetsData.map((budget) => (
              <Card key={budget.category} className="p-6 hover:shadow-medium transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground">{budget.category}</h3>
                    <span className={`text-sm font-semibold ${
                      budget.percentage > 90 ? 'text-destructive' : 
                      budget.percentage > 75 ? 'text-accent' : 
                      'text-success'
                    }`}>
                      {budget.percentage}%
                    </span>
                  </div>
                  
                  <Progress 
                    value={budget.percentage} 
                    className="h-3"
                  />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${budget.spent} spent
                    </span>
                    <span className="text-muted-foreground">
                      of ${budget.limit}
                    </span>
                  </div>

                  {budget.percentage > 90 && (
                    <div className="mt-2 p-2 bg-destructive/10 rounded-lg">
                      <p className="text-xs text-destructive font-medium">
                        ⚠️ You're approaching your budget limit
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
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
