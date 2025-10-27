import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  error?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbols } = await req.json();
    
    if (!symbols || !Array.isArray(symbols)) {
      throw new Error('Symbols array is required');
    }

    const apiKey = Deno.env.get('ALPHA_VANTAGE_API_KEY');
    if (!apiKey) {
      throw new Error('Alpha Vantage API key not configured');
    }

    console.log('Fetching prices for symbols:', symbols);

    // Fetch prices for all symbols
    const pricePromises = symbols.map(async (symbol: string): Promise<StockQuote> => {
      try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log(`Response for ${symbol}:`, data);

        if (data['Global Quote']) {
          const quote = data['Global Quote'];
          const price = parseFloat(quote['05. price']);
          const change = parseFloat(quote['09. change']);
          const changePercent = quote['10. change percent'];

          return {
            symbol,
            price,
            change,
            changePercent,
          };
        } else if (data['Note']) {
          // API rate limit hit
          console.warn(`Rate limit for ${symbol}:`, data['Note']);
          return {
            symbol,
            price: 0,
            change: 0,
            changePercent: '0.00%',
            error: 'Rate limit reached',
          };
        } else {
          console.error(`Invalid response for ${symbol}:`, data);
          return {
            symbol,
            price: 0,
            change: 0,
            changePercent: '0.00%',
            error: 'Invalid symbol or API error',
          };
        }
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          symbol,
          price: 0,
          change: 0,
          changePercent: '0.00%',
          error: errorMessage,
        };
      }
    });

    const quotes = await Promise.all(pricePromises);

    return new Response(JSON.stringify({ quotes }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in get-stock-prices:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
