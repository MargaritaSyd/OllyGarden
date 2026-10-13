import {
  CareersRolePage,
  careersRoleMetadata,
} from "@/components/careers-role-page";
import { enterpriseAccountExecutive as role } from "@/lib/careers";

export const metadata = careersRoleMetadata(role);

export default function EnterpriseAccountExecutivePage() {
  return <CareersRolePage role={role} />;
}
