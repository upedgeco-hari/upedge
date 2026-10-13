import { Armchair, Buildings, Compass, Hammer, House, Kanban } from "@phosphor-icons/react/dist/ssr";
import type { ServiceIcon as Name } from "@/lib/types";

const map = { house: House, buildings: Buildings, hammer: Hammer, armchair: Armchair, compass: Compass, kanban: Kanban };

export function ServiceIcon({ name, className }: { name: Name; className?: string }) {
  const Icon = map[name];
  return <Icon size={34} weight="light" className={className} aria-hidden="true" />;
}
