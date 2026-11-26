import { Armchair, Buildings, Compass, House, Kanban, Plant } from "@phosphor-icons/react/dist/ssr";
import type { ServiceIcon as Name } from "@/lib/types";

const map = { house: House, buildings: Buildings, armchair: Armchair, compass: Compass, kanban: Kanban, plant: Plant };

export function ServiceIcon({ name, className }: { name: Name; className?: string }) {
  const Icon = map[name];
  return <Icon size={34} weight="light" className={className} aria-hidden="true" />;
}
