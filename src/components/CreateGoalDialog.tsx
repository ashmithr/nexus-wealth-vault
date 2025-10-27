import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export const CreateGoalDialog = ({ onGoalCreated }: { onGoalCreated: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    goalName: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a goal",
        variant: "destructive",
      });
      return;
    }

    if (!formData.goalName || !formData.targetAmount) {
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
        .from("goals")
        .insert([{
          user_id: user.id,
          goal_name: formData.goalName,
          target_amount: parseFloat(formData.targetAmount),
          current_amount: formData.currentAmount ? parseFloat(formData.currentAmount) : 0,
          target_date: formData.targetDate || null,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Goal created successfully",
      });

      setFormData({
        goalName: "",
        targetAmount: "",
        currentAmount: "",
        targetDate: "",
      });
      setOpen(false);
      onGoalCreated();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create goal",
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
          Create Goal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Financial Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goalName">Goal Name *</Label>
            <Input
              id="goalName"
              value={formData.goalName}
              onChange={(e) => setFormData({ ...formData, goalName: e.target.value })}
              placeholder="Emergency Fund"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount *</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              placeholder="10000.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentAmount">Current Amount (Optional)</Label>
            <Input
              id="currentAmount"
              type="number"
              step="0.01"
              value={formData.currentAmount}
              onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetDate">Target Date (Optional)</Label>
            <Input
              id="targetDate"
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Goal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
