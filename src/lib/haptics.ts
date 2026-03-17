import { WebHaptics } from "web-haptics";

let hapticsInstance: WebHaptics | null = null;

export function useHaptics() {
  if (!hapticsInstance) {
    hapticsInstance = new WebHaptics({
      debug: true,
    });
  }

  return hapticsInstance;
}
