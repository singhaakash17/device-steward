import { NetworkDevice } from "@/types/device";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const fetchDevices = async (): Promise<NetworkDevice[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/devices`);
    if (!response.ok) {
      throw new Error(`Failed to fetch devices: ${response.statusText}`);
    }
    const data = await response.json();
    return data as NetworkDevice[];
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};
