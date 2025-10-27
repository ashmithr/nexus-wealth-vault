import { Navigation } from "@/components/Navigation";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}</h1>
              <p className="text-muted-foreground">Here's your financial overview</p>
            </div>
            <Button 
              variant="outline" 
              onClick={signOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Net Worth"
              value="$124,563.00"
              change="+12.5% from last month"
              changeType="positive"
              icon={DollarSign}
              gradient
            />
            <StatCard
              title="Total Investments"
              value="$89,234.00"
              change="+8.3% this month"
              changeType="positive"
              icon={TrendingUp}
            />
            <StatCard
              title="Cash Balance"
              value="$35,329.00"
              change="-2.1% this month"
              changeType="negative"
              icon={Wallet}
            />
          </div>

          {/* Portfolio Performance */}
          <Card className="p-6 shadow-soft hover:shadow-medium transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Portfolio Performance</h2>
                <p className="text-muted-foreground mt-1">Track your investment growth</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">1D</Button>
                <Button variant="outline" size="sm">1W</Button>
                <Button variant="default" size="sm">1M</Button>
                <Button variant="outline" size="sm">1Y</Button>
              </div>
            </div>
            <div className="h-64 bg-gradient-card rounded-lg flex items-center justify-center border border-border">
              <p className="text-muted-foreground">Chart visualization will be displayed here</p>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-foreground mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {[
                { name: "Apple Inc.", amount: "-$150.00", type: "expense", date: "Today, 2:30 PM" },
                { name: "Salary Deposit", amount: "+$5,420.00", type: "income", date: "Yesterday, 9:00 AM" },
                { name: "Amazon.com", amount: "-$89.99", type: "expense", date: "2 days ago" },
                { name: "Dividend Payment", amount: "+$124.50", type: "income", date: "3 days ago" },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === "income" ? "bg-success/10" : "bg-destructive/10"
                    }`}>
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="w-5 h-5 text-success" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.name}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${
                    transaction.type === "income" ? "text-success" : "text-foreground"
                  }`}>
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
