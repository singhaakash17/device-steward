import { useQuery } from "@tanstack/react-query";
import { fetchDevices } from "@/services/mockApi";
import DeviceCard from "@/components/DeviceCard";
import { Activity, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const { data: devices, isLoading, isError } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });

  const upCount = devices?.filter(d => d.status === "Up").length ?? 0;
  const downCount = devices?.filter(d => d.status === "Down").length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Network Device Monitor</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time monitoring of network infrastructure
          </p>
        </header>

        {/* Stats */}
        {!isLoading && devices && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Devices</div>
              <div className="text-2xl font-bold">{devices.length}</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Online</div>
              <div className="text-2xl font-bold text-success">{upCount}</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Offline</div>
              <div className="text-2xl font-bold text-destructive">{downCount}</div>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to fetch device data. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        )}

        {/* Devices List */}
        {devices && !isLoading && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Devices</h2>
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
