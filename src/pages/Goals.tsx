import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Target } from "lucide-react";

const goalsData = [
  { name: "Emergency Fund", current: 8500, target: 10000, percentage: 85 },
  { name: "Vacation Fund", current: 3200, target: 5000, percentage: 64 },
  { name: "New Car Down Payment", current: 12000, target: 20000, percentage: 60 },
  { name: "Home Renovation", current: 5400, target: 15000, percentage: 36 },
];

const Goals = () => {
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
            <Button className="bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goalsData.map((goal) => (
              <Card key={goal.name} className="p-6 hover:shadow-medium transition-all duration-300 bg-gradient-card">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{goal.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-primary">{goal.percentage}%</span>
                  </div>
                  
                  <Progress value={goal.percentage} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      Add Contribution
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      ${(goal.target - goal.current).toLocaleString()} remaining
                    </span>
                  </div>
                </div>
              </Card>
            ))}
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
