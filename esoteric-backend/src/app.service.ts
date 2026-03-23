import { Injectable, NotFoundException } from '@nestjs/common';

export class TarotService {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Injectable()
export class AppService {
  // Simulated database
  private services: TarotService[] = [
    { id: 1, name: 'Lectura General', price: 10000, category: 'Lectura' },
    { id: 2, name: 'Limpieza Energetica', price: 50000, category: 'Limpieza' },
    { id: 3, name: 'Endulzamiento', price: 80000, category: 'Lectura' },
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

  remove(id: number) {
    const index = this.services.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new NotFoundException(
        `No se encontró el servicio con ID ${id} para borrar 💨`,
      );
    }

    this.services.splice(index, 1);
    return { deleted: true };
  }

  updateService(id: number, updatedData: Partial<TarotService>): string {
    const serviceIndex = this.services.findIndex((s) => s.id === id);

    if (serviceIndex !== -1) {
      this.services[serviceIndex] = {
        ...this.services[serviceIndex],
        ...updatedData,
        id: this.services[serviceIndex].id, // Protegemos el ID original
      };
      return `Servicio con ID ${id} actualizado con éxito. ✅`;
    }

    return `No se encontró el servicio con ID ${id} para actualizar. ❌`;
  }
}
