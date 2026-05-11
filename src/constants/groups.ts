export interface Group {
  id: number;
  name: string;
  members: string[];
}

export const GROUPS: Group[] = [
  {
    id: 1,
    name: "Grupo 1",
    members: ["Nahyron", "Pereira", "Gomez", "Gideao"]
  },
  {
    id: 2,
    name: "Grupo 2",
    members: ["Victor", "Pietra", "Beatriz", "Joao Black"]
  },
  {
    id: 3,
    name: "Grupo 3",
    members: ["Arthur", "Josue", "Ian"]
  },
  {
    id: 4,
    name: "Grupo 4",
    members: ["Kauan", "Rua Torres", "Bonfin", "Lais", "Guedes", "Matheus", "Rafael"]
  }
];
