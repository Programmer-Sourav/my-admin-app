const firstNames = [
  "John", "Sarah", "Michael", "Emma", "David",
  "Olivia", "James", "Sophia", "Robert", "Ava",
  "Daniel", "Isabella", "William", "Mia", "Thomas"
];

const lastNames = [
  "Smith", "Johnson", "Brown", "Taylor", "Wilson",
  "Anderson", "Thomas", "Jackson", "White", "Harris"
];

const departments = [
  "Engineering",
  "Marketing",
  "Finance",
  "Human Resources",
  "Sales",
  "Operations"
];

const statuses = ["Active", "Inactive", "Pending"];

export const users = Array.from({ length: 200 }, (_, index) => {
  const id = index + 1;

  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[index % lastNames.length];

  return {
    id,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@example.com`,
    department: departments[index % departments.length],
    status: statuses[index % statuses.length],
    salary: 30000 + ((index * 1379) % 70000),
    joinDate: new Date(
      2022,
      index % 12,
      (index % 28) + 1
    ).toISOString().split("T")[0]
  };
});