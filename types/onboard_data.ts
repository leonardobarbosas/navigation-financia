export interface OnboardData {
  name: string;
  email: string;
  isDone: boolean;
  doneAt: number;
}

export type NewOnboard = Omit<OnboardData, "isDone" | "doneAt">;
