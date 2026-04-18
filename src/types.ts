export interface Entity {
  type: 'pedestrian' | 'passenger' | 'animal' | 'obstacle' | 'man' | 'woman' | 'child' | 'elderly';
  description: string;
  count: number;
}

export interface Scenario {
  id: string;
  description: string;
  entities?: Entity[];
  lane?: 'left' | 'right';
  willHit?: boolean;
  imageUrl?: string;
  imagePath?: string;
}

export interface Dilemma {
  id: string | number;
  question: string;
  optionA: Scenario;
  optionB: Scenario;
}

export type AppState = 'home' | 'judging' | 'results' | 'admin';
