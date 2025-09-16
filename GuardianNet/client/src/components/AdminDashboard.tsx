import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, MapPin, Clock, Users, Shield, CheckCircle } from "lucide-react";

interface SOSAlert {
  id: string;
  userId: string;
  userName: string;
  timestamp: string;
  coordinates: { lat: number; lng: number };
  status: 'active' | 'resolved' | 'responding';
  location: string;
}

interface Tourist {
  id: string;
  name: string;
  digitalId: string;
  lastLocation: string;
  lastSeen: string;
  status: 'verified' | 'pending' | 'flagged';
}

interface AdminDashboardProps {
  className?: string;
}

export default function AdminDashboard({ className }: AdminDashboardProps) {
  const [sosAlerts, setSOSAlerts] = useState<SOSAlert[]>([]);
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [activeView, setActiveView] = useState<'alerts' | 'tourists'>('alerts');

  useEffect(() => {
    // Initialize with mock data //todo: remove mock functionality
    const mockAlerts: SOSAlert[] = [
      {
        id: 'SOS_001',
        userId: 'USER_123',
        userName: 'Sarah Johnson',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        coordinates: { lat: 40.7128, lng: -74.0060 },
        status: 'active',
        location: 'Times Square, NYC'
      },
      {
        id: 'SOS_002',
        userId: 'USER_456',
        userName: 'Mike Chen',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        coordinates: { lat: 34.0522, lng: -118.2437 },
        status: 'responding',
        location: 'Hollywood Boulevard, LA'
      },
      {
        id: 'SOS_003',
        userId: 'USER_789',
        userName: 'Emma Davis',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        coordinates: { lat: 51.5074, lng: -0.1278 },
        status: 'resolved',
        location: 'Tower Bridge, London'
      }
    ];

    const mockTourists: Tourist[] = [
      {
        id: 'USER_123',
        name: 'Sarah Johnson',
        digitalId: 'CHAIN_1734445678_abc123def',
        lastLocation: 'Times Square, NYC',
        lastSeen: new Date(Date.now() - 300000).toISOString(),
        status: 'verified'
      },
      {
        id: 'USER_456',
        name: 'Mike Chen',
        digitalId: 'CHAIN_1734445789_def456ghi',
        lastLocation: 'Hollywood Boulevard, LA',
        lastSeen: new Date(Date.now() - 900000).toISOString(),
        status: 'verified'
      },
      {
        id: 'USER_789',
        name: 'Emma Davis',
        digitalId: 'CHAIN_1734445890_ghi789jkl',
        lastLocation: 'Tower Bridge, London',
        lastSeen: new Date(Date.now() - 1800000).toISOString(),
        status: 'pending'
      },
      {
        id: 'USER_101',
        name: 'Alex Rivera',
        digitalId: 'CHAIN_1734445901_jkl012mno',
        lastLocation: 'Eiffel Tower, Paris',
        lastSeen: new Date(Date.now() - 3600000).toISOString(),
        status: 'flagged'
      }
    ];

    setSOSAlerts(mockAlerts);
    setTourists(mockTourists);

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly update alert statuses
      setSOSAlerts(prev => prev.map(alert => {
        if (alert.status === 'active' && Math.random() > 0.8) {
          return { ...alert, status: 'responding' };
        }
        if (alert.status === 'responding' && Math.random() > 0.9) {
          return { ...alert, status: 'resolved' };
        }
        return alert;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleResolveAlert = (alertId: string) => {
    setSOSAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' } : alert
    ));
    console.log(`Alert ${alertId} marked as resolved`);
  };

  const handleVerifyTourist = (touristId: string) => {
    setTourists(prev => prev.map(tourist => 
      tourist.id === touristId ? { ...tourist, status: 'verified' } : tourist
    ));
    console.log(`Tourist ${touristId} verified`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Active</Badge>;
      case 'responding':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Responding</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Resolved</Badge>;
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>;
      case 'flagged':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Flagged</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const activeAlerts = sosAlerts.filter(alert => alert.status === 'active').length;
  const respondingAlerts = sosAlerts.filter(alert => alert.status === 'responding').length;
  const totalTourists = tourists.length;
  const verifiedTourists = tourists.filter(t => t.status === 'verified').length;

  return (
    <div className={`space-y-6 ${className}`} data-testid="admin-dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{activeAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Responding</p>
                <p className="text-2xl font-bold text-yellow-600">{respondingAlerts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Tourists</p>
                <p className="text-2xl font-bold">{totalTourists}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-green-600">{verifiedTourists}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts Banner */}
      {activeAlerts > 0 && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>{activeAlerts} active emergency alert{activeAlerts > 1 ? 's' : ''}</strong> requiring immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <div className="flex gap-2">
        <Button
          variant={activeView === 'alerts' ? 'default' : 'outline'}
          onClick={() => setActiveView('alerts')}
          data-testid="button-view-alerts"
        >
          SOS Alerts
        </Button>
        <Button
          variant={activeView === 'tourists' ? 'default' : 'outline'}
          onClick={() => setActiveView('tourists')}
          data-testid="button-view-tourists"
        >
          Digital IDs
        </Button>
      </div>

      {/* SOS Alerts Table */}
      {activeView === 'alerts' && (
        <Card>
          <CardHeader>
            <CardTitle>SOS Alerts Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Tourist</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sosAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-mono text-sm">{alert.id}</TableCell>
                    <TableCell>{alert.userName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </div>
                    </TableCell>
                    <TableCell>{formatTimeAgo(alert.timestamp)}</TableCell>
                    <TableCell>{getStatusBadge(alert.status)}</TableCell>
                    <TableCell>
                      {alert.status === 'active' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResolveAlert(alert.id)}
                          data-testid={`button-resolve-${alert.id}`}
                        >
                          Resolve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Tourists Digital ID Table */}
      {activeView === 'tourists' && (
        <Card>
          <CardHeader>
            <CardTitle>Digital ID Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Digital ID</TableHead>
                  <TableHead>Last Location</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tourists.map((tourist) => (
                  <TableRow key={tourist.id}>
                    <TableCell>{tourist.name}</TableCell>
                    <TableCell className="font-mono text-sm">{tourist.digitalId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {tourist.lastLocation}
                      </div>
                    </TableCell>
                    <TableCell>{formatTimeAgo(tourist.lastSeen)}</TableCell>
                    <TableCell>{getStatusBadge(tourist.status)}</TableCell>
                    <TableCell>
                      {tourist.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerifyTourist(tourist.id)}
                          data-testid={`button-verify-${tourist.id}`}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verify
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}