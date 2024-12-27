import DummyData from './dummy_data';

export const getEmployees = () => {
  let data = [];
  const persistData = localStorage.getItem('ing_case_employeeData');

  if (persistData) {
    try {
      data = JSON.parse(persistData);
    } catch (error) {
      console.error('An error occurred while parsing persisted data.', error);
      data = DummyData;
      localStorage.setItem('ing_case_employeeData', JSON.stringify(DummyData));
    }
  } else {
    data = DummyData;
    localStorage.setItem('ing_case_employeeData', JSON.stringify(DummyData));
  }

  return data;
};

export const getSingleEmployee = (id) => {
  const employees = getEmployees();
  return employees.find((employee) => employee.id === id) || null;
};

export const getOne = (query) => {
  const employees = getEmployees();
  return (
    employees.find((employee) =>
      Object.entries(query).every(([key, value]) => employee[key] === value)
    ) || null
  );
};

export const addEmployee = (newEmployee) => {
  const employees = getEmployees();
  const updatedEmployees = [
    ...employees,
    {id: `${Date.now()}`, ...newEmployee},
  ];
  localStorage.setItem(
    'ing_case_employeeData',
    JSON.stringify(updatedEmployees)
  );
  return updatedEmployees;
};

export const updateEmployee = (id, updatedData) => {
  const employees = getEmployees();
  const updatedEmployees = employees.map((employee) =>
    employee.id === id ? {...employee, ...updatedData} : employee
  );
  localStorage.setItem(
    'ing_case_employeeData',
    JSON.stringify(updatedEmployees)
  );
  return updatedEmployees;
};

export const deleteEmployee = (id) => {
  const employees = getEmployees();
  const updatedEmployees = employees.filter((employee) => employee.id !== id);
  localStorage.setItem(
    'ing_case_employeeData',
    JSON.stringify(updatedEmployees)
  );
  return updatedEmployees;
};

export const clearAllEmployees = () => {
  localStorage.removeItem('ing_case_employeeData');
  return [];
};

export const resetEmployees = () => {
  localStorage.setItem('ing_case_employeeData', JSON.stringify(DummyData));
  return DummyData;
};
