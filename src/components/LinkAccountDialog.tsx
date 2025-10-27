import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export const LinkAccountDialog = ({ onAccountCreated }: { onAccountCreated: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    accountName: "",
    accountType: "depository" as "depository" | "credit" | "investment",
    balance: "",
    accountMask: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create an account",
        variant: "destructive",
      });
      return;
    }

    if (!formData.accountName || !formData.accountType || !formData.balance) {
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
        .from("linked_accounts")
        .insert([{
          user_id: user.id,
          account_name: formData.accountName,
          account_type: formData.accountType,
          balance: parseFloat(formData.balance),
          account_mask: formData.accountMask || null,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Account linked successfully",
      });

      setFormData({
        accountName: "",
        accountType: "depository",
        balance: "",
        accountMask: "",
      });
      setOpen(false);
      onAccountCreated();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to link account",
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
          Link New Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Link New Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name *</Label>
            <Input
              id="accountName"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              placeholder="Chase Checking"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type *</Label>
            <Select
              value={formData.accountType}
              onValueChange={(value: any) => setFormData({ ...formData, accountType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="depository">Depository (Checking/Savings)</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance">Current Balance *</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              placeholder="1000.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountMask">Last 4 Digits (Optional)</Label>
            <Input
              id="accountMask"
              value={formData.accountMask}
              onChange={(e) => setFormData({ ...formData, accountMask: e.target.value })}
              placeholder="1234"
              maxLength={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Link Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
