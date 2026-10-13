import {
  CareersRolePage,
  careersRoleMetadata,
} from "@/components/careers-role-page";
import { aiSoftwareEngineer as role } from "@/lib/careers";

export const metadata = careersRoleMetadata(role);

export default function AiSoftwareEngineerPage() {
  return <CareersRolePage role={role} />;
}
