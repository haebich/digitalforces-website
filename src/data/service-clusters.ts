export type ServiceClusterId = 'decision' | 'engineering' | 'operations';

export const serviceClusters: Array<{
  id: ServiceClusterId;
  order: number;
  title: string;
}> = [
  { id: 'decision', order: 1, title: 'Einordnen und entscheiden' },
  { id: 'engineering', order: 2, title: 'Shopware und Systeme weiterentwickeln' },
  { id: 'operations', order: 3, title: 'Betrieb und Veränderung begleiten' },
];
