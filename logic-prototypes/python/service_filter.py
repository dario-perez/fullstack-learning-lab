services = [ # List of services and prices
  {'name': 'Lectura General', 'price': 10000},
  {'name': 'Limpieza Energetica', 'price': 50000},
  {'name': 'Endulzamiento', 'price': 80000},
]

user_budget = float(input('Ingresa tu presupuesto: ')) # User budget

def filter_by_budget(budget, services_list):
  '''Receives a budget and a services list as parameters and filters the services availability according to the budget given'''
  services_available = []

  for service in services_list:
    if budget >= service['price']:
      services_available.append(service['name'])

  return services_available

result = filter_by_budget(user_budget, services)
print(f'According to your budget, you can access to the next services: {result}')