import UserTable from "~/components/UserTable";
import { User } from "~/types/user";

export default function Index() {
  const mockUsers: User[] = Array.from({ length: 75 }, (_, i) => ({
    first_name: `Nombre${i + 1}`,
    last_name: `Apellido${i + 1}`,
    country: ["Costa Rica", "México", "Chile", "Perú", "Argentina"][i % 5],
    picture: `https://randomuser.me/api/portraits/lego/${i % 10}.jpg`,
  }));

  return (
    <div className="p-4">
      <h1>Usuarios</h1>
      <UserTable initialUsers={mockUsers} />
    </div>
  );
}
