import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export const CreateBudgetDialog = ({ onBudgetCreated }: { onBudgetCreated: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    category: "",
    limitAmount: "",
    periodStart: "",
    periodEnd: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a budget",
        variant: "destructive",
      });
      return;
    }

    if (!formData.category || !formData.limitAmount || !formData.periodStart || !formData.periodEnd) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("budgets")
        .insert([{
          user_id: user.id,
          category: formData.category,
          limit_amount: parseFloat(formData.limitAmount),
          period_start: formData.periodStart,
          period_end: formData.periodEnd,
          current_spending: 0,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Budget created successfully",
      });

      setFormData({
        category: "",
        limitAmount: "",
        periodStart: "",
        periodEnd: "",
      });
      setOpen(false);
      onBudgetCreated();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create budget",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary shadow-medium hover:shadow-strong transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Create Budget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Budget</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Groceries"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="limitAmount">Budget Limit *</Label>
            <Input
              id="limitAmount"
              type="number"
              step="0.01"
              value={formData.limitAmount}
              onChange={(e) => setFormData({ ...formData, limitAmount: e.target.value })}
              placeholder="500.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="periodStart">Period Start Date *</Label>
            <Input
              id="periodStart"
              type="date"
              value={formData.periodStart}
              onChange={(e) => setFormData({ ...formData, periodStart: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="periodEnd">Period End Date *</Label>
            <Input
              id="periodEnd"
              type="date"
              value={formData.periodEnd}
              onChange={(e) => setFormData({ ...formData, periodEnd: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Budget"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
