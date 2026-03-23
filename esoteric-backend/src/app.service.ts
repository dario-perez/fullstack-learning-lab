import { Injectable } from '@nestjs/common';

export class TarotService {
  name: string;
  price: number;
  category: string;
}

@Injectable()
export class AppService {
  // Simulated database
  private services: TarotService[] = [
    { name: 'Lectura General', price: 10000, category: 'Lectura' },
    { name: 'Limpieza Energetica', price: 50000, category: 'Limpieza' },
    { name: 'Endulzamiento', price: 80000, category: 'Lectura' },
  ];

  getHello(): string {
    return 'Bienvenido a Esoteric Services - Gestión de Turnos';
  }

  getAvailableServices(budget: number, category?: string): TarotService[] {
    const available: TarotService[] = [];

    for (const service of this.services) {
      let finalPrice = service.price;
      let finalName = service.name;

      if (service.category === 'Lectura') {
        finalName = `PREMIUM: ${service.name}`;
      } else if (service.category === 'Limpieza') {
        finalPrice = service.price * 0.9;
        finalName = `OFERTA: ${service.name}`;
      }

      if (
        budget >= finalPrice &&
        (!category || service.category === category)
      ) {
        available.push({
          ...service,
          name: finalName,
          price: finalPrice,
        });
      }
    }
    return available;
  }

  createService(newService: TarotService): string {
    this.services.push(newService);
    return `Servicio '${newService.name}' creado con éxito.`;
  }

  deleteService(name: string): string {
    const initialLength = this.services.length;

    this.services = this.services.filter(
      (s) => s.name.toLowerCase() !== name.toLowerCase(),
    );

    if (this.services.length < initialLength) {
      return `Servicio '${name}' eliminado con éxito.`;
    } else {
      return `No se encontró ningún servicio con el nombre ${name}`;
    }
  }

  updateService(name: string, updatedData: Partial<TarotService>): string {
    const serviceIndex = this.services.findIndex(
      (s) => s.name.toLowerCase() === name.toLowerCase(),
    );

    if (serviceIndex !== -1) {
      this.services[serviceIndex] = {
        ...this.services[serviceIndex],
        ...updatedData,
      };
      return `Servicio ${name} actualizado con éxito.`;
    }

    return `No se encontró el servicio '${name}' para actualizar.`;
  }
}
