interface TarotService {
  name: string;
  price: number;
  category: string;
}

const services: TarotService[] = [
  {name: 'Lectura General', price: 10000, category: 'Lectura'},
  {name: 'Limpieza Energetica', price: 50000, category: 'Limpieza'},
  {name: 'Endulzamiento', price: 80000, category: 'Lectura'},
];

function filterByBudget(budget: number, servicesList: TarotService[]): TarotService[] {
  const available: TarotService[] = [];

  for (const service of servicesList) {
    let finalPrice = service.price;
    let finalName = service.name;

    if (service.category === 'Limpieza') {
      finalPrice = service.price * 0.9;
      finalName = `OFERTA: ${service.name}`;
    }

    if (budget >= finalPrice) {
      available.push({
        ...service,
        name: finalName,
        price: finalPrice,
      })
    }
  }

  return available;
}

const userBudget = 60000;
const results = filterByBudget(userBudget, services)
results.forEach(s => console.log(`- ${s.name} (${s.category}): $${s.price}`));