import { Card, CardContent } from "@/components/ui/card";
import { Server } from "lucide-react";
import { NetworkDevice } from "@/services/mockApi";
import DeviceStatusBadge from "./DeviceStatusBadge";

interface DeviceCardProps {
  device: NetworkDevice;
}

const DeviceCard = ({ device }: DeviceCardProps) => {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-secondary p-3">
              <Server className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{device.name}</h3>
              <p className="text-sm text-muted-foreground font-mono">
                {device.ip_address}
              </p>
            </div>
          </div>
          <DeviceStatusBadge status={device.status} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
