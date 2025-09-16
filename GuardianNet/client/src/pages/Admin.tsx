import AdminDashboard from "@/components/AdminDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, AlertTriangle } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen bg-background p-6" data-testid="page-admin">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Monitor tourist safety, manage SOS alerts, and verify digital identities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <h3 className="font-semibold mb-1">Active Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Real-time emergency notifications requiring immediate response
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold mb-1">Tourist Management</h3>
              <p className="text-sm text-muted-foreground">
                Monitor registered tourists and their digital identity status
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold mb-1">Blockchain Verification</h3>
              <p className="text-sm text-muted-foreground">
                Verify and manage blockchain-based digital identities
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Dashboard */}
        <AdminDashboard />
      </div>
    </div>
  );
}