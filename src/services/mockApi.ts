export interface NetworkDevice {
  id: number;
  name: string;
  ip_address: string;
  status: "Up" | "Down";
}

// Mock API data - simulating the /devices endpoint
const mockDevices: NetworkDevice[] = [
  {
    id: 1,
    name: "Router1",
    ip_address: "192.168.1.1",
    status: "Up"
  },
  {
    id: 2,
    name: "Switch1",
    ip_address: "192.168.1.2",
    status: "Down"
  },
  {
    id: 3,
    name: "Firewall1",
    ip_address: "192.168.1.3",
    status: "Up"
  }
];

// Simulate API call with delay
export const fetchDevices = async (): Promise<NetworkDevice[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDevices);
    }, 500); // Simulate network delay
  });
};
