let courses = [
  { id: "1", name: "hola", price: 10000, duration: 2 },
  { id: "2", name: "bola", price: 11000, duration: 2 },
  { id: "3", name: "coca", price: 12000, duration: 2 },
  { id: "4", name: "cola", price: 13000, duration: 2 },
  { id: "5", name: "test", price: 14000, duration: 2 },
];

let student = [
  { id: "1", name: "abc", age: 16, is_deleted: false },
  { id: "2", name: "cde", age: 17, is_deleted: false },
  { id: "3", name: "efg", age: 18, is_deleted: false },
  { id: "4", name: "hij", age: 19, is_deleted: false },
  { id: "5", name: "klm", age: 20, is_deleted: false },
];

let batches = [
  { id: "1", name: "batch1", student: [{ id: "1" }] },
  { id: "2", name: "batch2", student: [{ id: "2" }] },
  { id: "3", name: "batch3", student: [{ id: "3" }] },
  { id: "4", name: "batch4", student: [{ id: "4" }] },
  { id: "5", name: "batch5", student: [{ id: "5" }] },
];

let faculties = [
  { id: "1", name: "faculty1", age: 22 },
  { id: "5", name: "faculty2", age: 23 },
  { id: "6", name: "faculty3", age: 24 },
  { id: "7", name: "faculty4", age: 25 },
  { id: "8", name: "faculty5", age: 26 },
];

export const db = {
  courses,
  student,
  batches,
  faculties,
};
