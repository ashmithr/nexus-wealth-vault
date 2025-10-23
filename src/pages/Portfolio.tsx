import { Navigation } from "@/components/Navigation";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Percent } from "lucide-react";

const holdingsData = [
  { ticker: "AAPL", name: "Apple Inc.", shares: 50, price: "$182.45", value: "$9,122.50", change: "+2.3%" },
  { ticker: "MSFT", name: "Microsoft Corp.", shares: 35, price: "$378.91", value: "$13,261.85", change: "+1.8%" },
  { ticker: "GOOGL", name: "Alphabet Inc.", shares: 25, price: "$142.32", value: "$3,558.00", change: "-0.5%" },
  { ticker: "AMZN", name: "Amazon.com Inc.", shares: 40, price: "$178.25", value: "$7,130.00", change: "+3.2%" },
  { ticker: "TSLA", name: "Tesla Inc.", shares: 15, price: "$248.50", value: "$3,727.50", change: "-1.2%" },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Portfolio</h1>
            <p className="text-muted-foreground">Track your investment performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Portfolio Value"
              value="$89,234.00"
              change="+8.3% this month"
              changeType="positive"
              icon={DollarSign}
              gradient
            />
            <StatCard
              title="Total Gain/Loss"
              value="+$12,456.00"
              change="+16.2% all time"
              changeType="positive"
              icon={TrendingUp}
            />
            <StatCard
              title="Average Return"
              value="12.8%"
              change="Annualized"
              changeType="positive"
              icon={Percent}
            />
          </div>

          <Card className="p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-foreground mb-6">Investment Holdings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Ticker</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Shares</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Price</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Value</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {holdingsData.map((holding) => (
                    <tr key={holding.ticker} className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-bold text-primary">{holding.ticker}</span>
                      </td>
                      <td className="py-4 px-4 text-foreground">{holding.name}</td>
                      <td className="py-4 px-4 text-right text-foreground">{holding.shares}</td>
                      <td className="py-4 px-4 text-right text-foreground">{holding.price}</td>
                      <td className="py-4 px-4 text-right font-semibold text-foreground">{holding.value}</td>
                      <td className={`py-4 px-4 text-right font-semibold ${
                        holding.change.startsWith('+') ? 'text-success' : 'text-destructive'
                      }`}>
                        {holding.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6 shadow-soft bg-gradient-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">Asset Allocation</h2>
            <div className="h-64 bg-background/50 rounded-lg flex items-center justify-center border border-border">
              <p className="text-muted-foreground">Asset allocation chart will be displayed here</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
