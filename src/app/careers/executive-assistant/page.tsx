import {
  CareersRolePage,
  careersRoleMetadata,
} from "@/components/careers-role-page";
import { executiveAssistant as role } from "@/lib/careers";

export const metadata = careersRoleMetadata(role);

export default function ExecutiveAssistantPage() {
  return <CareersRolePage role={role} />;
}
