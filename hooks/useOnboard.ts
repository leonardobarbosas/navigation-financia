import { NewOnboard, OnboardData } from "@/types/onboard_data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARD_KEY = "onboard";

export const useOnboard = () => {
  async function get(): Promise<OnboardData | undefined> {
    const raw = await AsyncStorage.getItem(ONBOARD_KEY);

    if (!raw) return undefined;

    try {
      const data = JSON.parse(raw);

      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function set(input: NewOnboard) {
    const data: OnboardData = {
      ...input,
      isDone: true,
      doneAt: Date.now(),
    };

    await AsyncStorage.setItem(ONBOARD_KEY, JSON.stringify(data));
  }

  async function clearOnboard() {
    await AsyncStorage.removeItem(ONBOARD_KEY);
  }

  return {
    get,
    set,
    clearOnboard,
  };
};
