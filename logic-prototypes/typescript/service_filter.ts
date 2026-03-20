interface TarotService {
  name: string;
  price: number;
}

const services: TarotService[] = [
  {name: 'Lectura General', price: 10000},
  {name: 'Limpieza Energetica', price: 50000},
  {name: 'Endulzamiento', price: 80000},
];

function filterByBudget(budget: number, servicesList: TarotService[]): string[] {
  const servicesAvailable: string[] = [];

  for (const service of servicesList) {
    if (budget >= service.price) {
      servicesAvailable.push(service.name)
    }
  }

  return servicesAvailable;
}

const userBudget = 15000;
console.log(`Available services: ${filterByBudget(userBudget, services)}`)