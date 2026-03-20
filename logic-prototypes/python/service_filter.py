services = [ # List of services and prices
  {'name': 'Lectura General', 'price': 10000, 'category': 'Lectura'},
  {'name': 'Limpieza Energetica', 'price': 50000, 'category': 'Limpieza'},
  {'name': 'Endulzamiento', 'price': 80000, 'category': 'Lectura'},
]

user_budget = float(input('Ingresa tu presupuesto: ')) # User budget

def filter_by_budget(budget, services_list):
  '''Receives a budget and a services list as parameters and filters the services availability according to the budget given.'''
  services_available = []

  for service in services_list:
    '''If cleansing service is available, applies %10 discount.'''
    final_price = service['price']
    if service['category'] == 'Limpieza':
      final_price = service['price'] * 0.9

    if budget >= service['price']:
      services_available.append({
        'name': service['name'],
        'category': service['category'],
        'price': final_price,
      })

  return services_available

result = filter_by_budget(user_budget, services)
print(f"\nServicios disponibles para tu presupuesto (${user_budget}):")
print("-" * 45)
print(f"\n{'SERVICIO':<25} | {'CATEGORÍA':<15} | {'PRECIO':<15}")
print("=" * 60)

for item in result:
    name = item['name']
    cat = item['category']
    price = item['price']
    print(f"{name:<25} | {cat:<15} | {price:<15}")

    if item['category'] == 'Limpieza':
      print(f'\nDescuento en servicios de {item['category']} aplicado!\n')