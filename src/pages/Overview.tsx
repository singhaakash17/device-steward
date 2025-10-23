import { useQuery } from "@tanstack/react-query";
import { fetchDevices } from "@/services/mockApi";
import StatCard from "@/components/StatCard";
import { Activity, Server, Wifi, WifiOff, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DeviceCard from "@/components/DeviceCard";

const networkData = [
  { time: "00:00", traffic: 45, latency: 12 },
  { time: "04:00", traffic: 32, latency: 15 },
  { time: "08:00", traffic: 78, latency: 8 },
  { time: "12:00", traffic: 95, latency: 5 },
  { time: "16:00", traffic: 85, latency: 7 },
  { time: "20:00", traffic: 65, latency: 10 },
  { time: "24:00", traffic: 50, latency: 11 },
];

const Overview = () => {
  const { data: devices, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });

  const upCount = devices?.filter((d) => d.status === "Up").length ?? 0;
  const downCount = devices?.filter((d) => d.status === "Down").length ?? 0;
  const totalDevices = devices?.length ?? 0;
  const uptime = totalDevices > 0 ? ((upCount / totalDevices) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Devices"
          value={totalDevices}
          icon={Server}
          trend={{ value: "12% from last month", positive: true }}
        />
        <StatCard
          title="Online"
          value={upCount}
          icon={Wifi}
          trend={{ value: "5% from yesterday", positive: true }}
          className="text-success"
        />
        <StatCard
          title="Offline"
          value={downCount}
          icon={WifiOff}
          trend={{ value: "2% from yesterday", positive: false }}
        />
        <StatCard
          title="Network Uptime"
          value={`${uptime}%`}
          icon={TrendingUp}
          trend={{ value: "0.5% from last week", positive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Network Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={networkData}>
                <defs>
                  <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="traffic"
                  stroke="hsl(var(--primary))"
                  fill="url(#trafficGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="gradient-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Network Latency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={networkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Devices */}
      <Card className="gradient-border">
        <CardHeader>
          <CardTitle>Recent Device Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {devices?.slice(0, 3).map((device) => (
                <DeviceCard key={device.id} device={device} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
