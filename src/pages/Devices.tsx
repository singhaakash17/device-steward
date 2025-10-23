import { useQuery } from "@tanstack/react-query";
import { fetchDevices } from "@/services/mockApi";
import DeviceCard from "@/components/DeviceCard";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const Devices = () => {
  const { data: devices, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredDevices = devices?.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip_address.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Network Devices</h2>
          <p className="text-muted-foreground">
            Manage and monitor all your network devices
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search devices..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDevices?.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
          {filteredDevices?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No devices found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Devices;
