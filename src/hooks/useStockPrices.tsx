import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  error?: string;
}

interface StockPricesResponse {
  quotes: StockQuote[];
}

export const useStockPrices = (symbols: string[]) => {
  return useQuery({
    queryKey: ['stock-prices', symbols],
    queryFn: async () => {
      if (!symbols.length) return { quotes: [] };

      const { data, error } = await supabase.functions.invoke<StockPricesResponse>(
        'get-stock-prices',
        {
          body: { symbols },
        }
      );

      if (error) throw error;
      return data;
    },
    refetchInterval: 60000, // Refetch every minute
    enabled: symbols.length > 0,
  });
};
