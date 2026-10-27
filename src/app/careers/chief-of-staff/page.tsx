import {
  CareersRolePage,
  careersRoleMetadata,
} from "@/components/careers-role-page";
import { chiefOfStaff as role } from "@/lib/careers";

export const metadata = careersRoleMetadata(role);

export default function ChiefOfStaffPage() {
  return <CareersRolePage role={role} />;
}
