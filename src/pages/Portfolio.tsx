import { Navigation } from "@/components/Navigation";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, DollarSign, Percent } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useStockPrices } from "@/hooks/useStockPrices";
import { useMemo } from "react";

const Portfolio = () => {
  // Fetch investment holdings from database
  const { data: holdings, isLoading: holdingsLoading } = useQuery({
    queryKey: ['investment-holdings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investment_holdings')
        .select('*')
        .order('ticker_symbol');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Extract ticker symbols for price fetching
  const symbols = useMemo(() => 
    holdings?.map(h => h.ticker_symbol) || [], 
    [holdings]
  );

  // Fetch real-time stock prices
  const { data: priceData, isLoading: pricesLoading } = useStockPrices(symbols);

  // Combine holdings with real-time prices
  const enrichedHoldings = useMemo(() => {
    if (!holdings || !priceData?.quotes) return [];

    return holdings.map(holding => {
      const quote = priceData.quotes.find(q => q.symbol === holding.ticker_symbol);
      const price = quote?.price || holding.current_price || 0;
      const totalValue = price * Number(holding.quantity);
      
      return {
        ...holding,
        currentPrice: price,
        totalValue,
        change: quote?.change || 0,
        changePercent: quote?.changePercent || '0.00%',
        hasError: !!quote?.error,
      };
    });
  }, [holdings, priceData]);

  // Calculate portfolio totals
  const portfolioStats = useMemo(() => {
    const totalValue = enrichedHoldings.reduce((sum, h) => sum + h.totalValue, 0);
    const totalGain = enrichedHoldings.reduce((sum, h) => {
      const costBasis = (h.current_price || h.currentPrice) * Number(h.quantity);
      return sum + (h.totalValue - costBasis);
    }, 0);
    const gainPercent = totalValue > 0 ? ((totalGain / totalValue) * 100).toFixed(1) : '0.0';

    return { totalValue, totalGain, gainPercent };
  }, [enrichedHoldings]);

  const isLoading = holdingsLoading || pricesLoading;
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
              value={isLoading ? "..." : `$${portfolioStats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              change="Real-time data"
              changeType="positive"
              icon={DollarSign}
              gradient
            />
            <StatCard
              title="Total Gain/Loss"
              value={isLoading ? "..." : `${portfolioStats.totalGain >= 0 ? '+' : ''}$${Math.abs(portfolioStats.totalGain).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              change={`${portfolioStats.gainPercent}% all time`}
              changeType={portfolioStats.totalGain >= 0 ? "positive" : "negative"}
              icon={TrendingUp}
            />
            <StatCard
              title="Holdings Count"
              value={isLoading ? "..." : enrichedHoldings.length.toString()}
              change="Active positions"
              changeType="positive"
              icon={Percent}
            />
          </div>

          <Card className="p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Investment Holdings
              <span className="text-sm font-normal text-muted-foreground ml-2">
                (Updates every minute)
              </span>
            </h2>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : enrichedHoldings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No holdings found. Add some investments to get started!</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Ticker</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Shares</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Price</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrichedHoldings.map((holding) => (
                      <tr key={holding.id} className="border-b border-border hover:bg-secondary transition-colors">
                        <td className="py-4 px-4">
                          <span className="font-bold text-primary">{holding.ticker_symbol}</span>
                          {holding.hasError && (
                            <span className="text-xs text-destructive ml-2">(Error)</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right text-foreground">
                          {Number(holding.quantity).toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-right text-foreground">
                          ${holding.currentPrice.toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-right font-semibold text-foreground">
                          ${holding.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className={`py-4 px-4 text-right font-semibold ${
                          holding.change >= 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {holding.change >= 0 ? '+' : ''}{holding.changePercent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
