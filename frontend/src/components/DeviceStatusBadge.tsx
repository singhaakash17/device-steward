import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeviceStatusBadgeProps {
  status: "Up" | "Down";
}

const DeviceStatusBadge = ({ status }: DeviceStatusBadgeProps) => {
  const isUp = status === "Up";
  
  return (
    <Badge
      variant={isUp ? "default" : "destructive"}
      className={cn(
        "gap-1.5 font-medium",
        isUp && "bg-success hover:bg-success/90"
      )}
    >
      <Circle
        className={cn(
          "h-2 w-2 fill-current",
          isUp && "pulse-success"
        )}
      />
      {status}
    </Badge>
  );
};

export default DeviceStatusBadge;
