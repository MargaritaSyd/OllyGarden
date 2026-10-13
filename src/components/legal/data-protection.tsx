/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Database,
  Eye,
  LegalPage,
  Lock,
  Mail,
  Shield,
} from "@/components/legal/legal-page";
import { lastUpdated, legalEntities } from "@/lib/legal";

const DataProtection = () => {
  return (
    <LegalPage
      title="Data Protection Policy"
      icon={<Shield />}
      updated={`${legalEntities.inc.name} | ${lastUpdated("/data-protection-policy")}`}
    >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Purpose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              This policy outlines many of the procedures and technical controls
              in support of data protection.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Scope
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Production systems that create, receive, store, or transmit
              OllyGarden, Inc. customer data (hereafter "Production Systems")
              must follow the requirements and guidelines described in this
              policy.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Database className="h-5 w-5" />
              Roles and Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="space-y-2">
              <div>• End Users</div>
              <div>• End Customers</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>OllyGarden, Inc. policy requires that:</p>
            <div className="space-y-2">
              <div>
                • Data must be handled and protected according to its
                classification requirements and following approved encryption
                standards, if applicable.
              </div>
              <div>
                • Whenever possible, store data of the same classification in a
                given data repository and avoid mixing sensitive and
                non-sensitive data in the same repository. Security controls,
                including authentication, authorization, data encryption, and
                auditing, should be applied according to the highest
                classification of data in a given repository.
              </div>
              <div>
                • Employees shall not have direct administrative access to
                production data during normal business operations. Exceptions
                include emergency operations such as forensic analysis and
                manual disaster recovery.
              </div>
              <div>
                • All Production Systems must disable services that are not
                required to achieve the business purpose or function of the
                system.
              </div>
              <div>• All access to Production Systems must be logged.</div>
              <div>
                • All Production Systems must have security monitoring enabled,
                including activity and file integrity monitoring, vulnerability
                scanning, and/or malware detection, as applicable.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              Data Protection Implementation and Processes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground">
              Customer Data Protection
            </h3>
            <p>
              OllyGarden, Inc. hosts on "Google Cloud Platform (GCP)" in the
              europe-west4 region by default. Data is replicated across multiple
              regions for redundancy and disaster recovery.
            </p>
            <p>
              All OllyGarden, Inc. employees adhere to the following processes
              to reduce the risk of compromising Production Data:
            </p>
            <div className="space-y-2">
              <div>
                • Implement and/or review controls designed to protect
                Production Data from improper alteration or destruction.
              </div>
              <div>
                • Ensure that confidential data is stored in a manner that
                supports user access logs and automated monitoring for potential
                security incidents.
              </div>
              <div>
                • Ensure OllyGarden, Inc. Customer Production Data is segmented
                and only accessible to Customers authorized to access data.
              </div>
              <div>
                • All Production Data at rest is stored on encrypted volumes
                using encryption keys managed by OllyGarden, Inc.
              </div>
              <div>
                • Volume encryption keys and machines that generate volume
                encryption keys are protected from unauthorized access. Volume
                encryption key material is protected with access controls such
                that the key material is only accessible by privileged accounts.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              OllyGarden, Inc. employee access to production is guarded by an
              approval process and is disabled by default. When access is
              approved, temporary access is granted that allows access to
              production. Production access is reviewed by the security team on
              a case by case basis.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Separation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Customer data will be logically separated at the
              database/datastore level using a unique identifier for the
              customer. The separation is enforced at the API layer, where the
              client must authenticate with a chosen account, and then the
              customer's unique identifier is included in the access token and
              used by the API to restrict access to data to the account. All
              database/datastore queries then include the account identifier.
            </p>
            <p>
              Alternatively, dedicated resources (database, compute) will be
              allocated to each customer so that customers cannot impact or
              access data or resources of other customers.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Data Leakage Prevention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              OllyGarden, Inc. will implement data leakage prevention mechanisms
              to systems that process, store or transmit sensitive information.
              These mechanisms will be configured to prevent data leakage (e.g.,
              through email or other messaging technologies) and generate audit
              logs and alerts.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              OllyGarden, Inc. uses Google Cloud Platform, and Grafana Cloud to
              monitor the entire cloud service operation (monitoring and
              internal reporting capabilities are used to report on
              cryptographic operations, encryption, and key management policies,
              processes, procedures, and controls). If a system failure and
              alarm are triggered, key personnel are notified by text, chat,
              and/or email message to take appropriate corrective action.
            </p>
            <p>
              OllyGarden, Inc. uses a security agent to monitor production
              systems. The agents monitor system activities, generate alerts on
              suspicious activities, and report on vulnerability findings to a
              centralized management console.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">
              Confidentiality/Non-Disclosure Agreement (NDA)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              OllyGarden, Inc. uses confidentiality or non-disclosure agreements
              to protect confidential information using legally enforceable
              terms. NDAs are applicable to both internal and external parties.
              NDAs will have the following elements:
            </p>
            <div className="space-y-2">
              <div>• Definition of the information to be protected</div>
              <div>• Duration of the agreement</div>
              <div>• Required actions upon termination of the agreement</div>
              <div>
                • Responsibilities and actions to avoid unauthorized disclosure
              </div>
              <div>
                • Ownership of information, trade secrets, and intellectual
                property
              </div>
              <div>
                • Permitted use of the confidential information and rights to
                use information
              </div>
              <div>
                • Audit and monitor activities that involve confidential
                information
              </div>
              <div>
                • Process of notification and reporting of unauthorized
                disclosure or information leakage
              </div>
              <div>
                • Information return or destruction terms when the agreement is
                terminated
              </div>
              <div>• Actions in case of breach of agreement</div>
              <div>• Periodic review</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Data At Rest</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground">
              Encryption
            </h3>
            <p>
              All databases, data stores, and file systems are encrypted in
              accordance with OllyGarden, Inc.'s Encryption Policy.
            </p>

            <h3 className="text-lg font-semibold text-foreground">
              Storage and Disposal
            </h3>
            <p>
              Stored data must be properly stored and handled while at rest.
              Considerations for storage and disposal of data at rest in
              conjunction with OllyGarden, Inc. Asset Management Policy, Data
              Classification Policy and Data Retention Policy include:
            </p>
            <div className="space-y-2">
              <div>• Authorization to access or manage stored data</div>
              <div>
                • Proper identification of records and their retention period
              </div>
              <div>
                • Technology change and ability to access data throughout
                retention period
              </div>
              <div>• Acceptable timeframe and format to retrieve data</div>
              <div>• Appropriate methods of disposal</div>
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              Data Deletion
            </h3>
            <p>
              Stored sensitive data that is no longer required will be properly
              deleted in accordance with OllyGarden, Inc.'s business objectives,
              retention policies, applicable laws and regulations, and relevant
              third-party agreements. A record of such deletion will be kept.
            </p>
            <p>
              Hard-copy materials with sensitive data will be destroyed when no
              longer needed for business or legal reasons through secure means
              (e.g., shredding, pulping, incinerating, etc.) so that the data
              cannot be reconstructed. Hard copy materials will be stored in
              secure storage containers prior to destruction.
            </p>
            <p>
              Electronic media with sensitive data will be destroyed or rendered
              unrecoverable when no longer needed for business or legal reasons.
              Data on hardware (e.g, hard drives) will be disposed of through
              secure means, such as wiping or hard drive destruction.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Data in Transit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground">Necessity</h3>
            <p>
              Data will only be transferred where strictly necessary for
              effective business processes.
            </p>

            <h3 className="text-lg font-semibold text-foreground">
              Transfer Factors
            </h3>
            <p>
              Before choosing the method of data transfer, the following must be
              considered:
            </p>
            <div className="space-y-2">
              <div>
                • Nature, sensitivity, confidentiality, and value of the
                information
              </div>
              <div>• Size of data being transferred</div>
              <div>• Impact of loss during transit</div>
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              Encryption
            </h3>
            <p>To ensure the safety of data in transit:</p>
            <div className="space-y-2">
              <div>
                • All external data transmission must be encrypted end-to-end.
                This includes, but is not limited to, cloud infrastructure and
                third party vendors and applications.
              </div>
              <div>
                • All internet and intranet connections are encrypted and
                authenticated using a strong protocol, a strong key exchange,
                and a strong cipher.
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              Movement of Media
            </h3>
            <div className="space-y-2">
              <div>
                • Media with sensitive data sent outside the company's
                facilities will be logged, securely transmitted (e.g., via
                secure courier or other trackable method), and captured within
                offsite tracking logs to include details about media location.
              </div>
              <div>
                • Management will approve all media with sensitive data that is
                moved outside the facility (including when media is distributed
                to individuals). Documentation of management's approval for the
                movement of media will be retained.
              </div>
              <div>
                • Packaging of media will be sufficient to protect the contents
                from any physical damage during transport and in accordance with
                any manufacturers' specifications.
              </div>
              <div>
                • Inventory logs of all electronic media with sensitive data
                will be maintained.
              </div>
              <div>
                • A separate log or a clearly-defined section of the overall
                record shall be designated specifically for media containing
                ePHI.
              </div>
              <div>
                • Removable media devices, such as USB drives, digital video
                disks, compact disks, external or removable hard disks, etc.,
                that contain sensitive data will be encrypted to protect the
                confidentiality of the information during movement.
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              Information Exchange
            </h3>
            <p>
              Information will be exchanged between OllyGarden, Inc.'s system
              and other information systems only as authorized through a Privacy
              Policy Agreement, which include:
            </p>
            <div className="space-y-2">
              <div>• Interface characteristics</div>
              <div>
                • Security and privacy requirements, controls, and
                responsibilities for each system
              </div>
              <div>• Impact level of the information communicated</div>
            </div>
            <p>
              The agreement(s) will be reviewed and updated every year, or as
              needed.
            </p>

            <h3 className="text-lg font-semibold text-foreground">
              End-user Messaging Channels
            </h3>
            <div className="space-y-2">
              <div>
                • Restricted and sensitive data is not allowed to be sent over
                electronic end-user messaging channels such as email or chat,
                unless end-to-end encryption is enabled.
              </div>
              <div>
                • Messages must be protected from unauthorized access,
                modification or denial of service commensurate with the
                classification scheme adopted by the organization.
              </div>
              <div>
                • Messages must be reviewed prior to sending to ensure correct
                addressing and transportation of the message.
              </div>
              <div>
                • The reliability and availability of the messaging channel must
                be verified.
              </div>
              <div>• All applicable legal requirements will be adhered to.</div>
              <div>
                • Use of external public services such as instant messaging,
                social networking or file sharing will require prior approval
                and authorization.
              </div>
              <div>
                • Publicly accessible networks will be controlled by stronger
                authentication.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Submitting a Data Deletion Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Customers who wish to request deletion of their personal data can
              submit a request by emailing{" "}
              <a
                href="mailto:support@ollygarden.com?subject=Data%20Deletion%20Request"
                className="text-olly-green underline hover:no-underline"
              >
                support@ollygarden.com
              </a>{" "}
              with the subject &ldquo;Data Deletion Request&rdquo;.
            </p>
            <p>OllyGarden, Inc. will:</p>
            <div className="space-y-2">
              <div>• Acknowledge the request within 5 business days.</div>
              <div>
                • Verify the requester&apos;s identity before any data is
                deleted.
              </div>
              <div>
                • Complete and confirm the deletion within 30 days of receiving
                the verified request.
              </div>
            </div>
            <p>
              All Data Deletion Requests are logged with the request date,
              requester identifier, action taken, and completion date. The log
              is maintained as an internal record and reviewed during periodic
              compliance reviews.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl">Revision History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <caption className="sr-only">Revision History</caption>
                <thead>
                  <tr className="bg-muted">
                    <th
                      scope="col"
                      className="border border-border px-3 py-2 text-left text-sm"
                    >
                      Version
                    </th>
                    <th
                      scope="col"
                      className="border border-border px-3 py-2 text-left text-sm"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="border border-border px-3 py-2 text-left text-sm"
                    >
                      Editor
                    </th>
                    <th
                      scope="col"
                      className="border border-border px-3 py-2 text-left text-sm"
                    >
                      Approver
                    </th>
                    <th
                      scope="col"
                      className="border border-border px-3 py-2 text-left text-sm"
                    >
                      Description of Changes
                    </th>
                    <th
                      scope="col"
                      className="border border-border px-3 py-2 text-left text-sm"
                    >
                      Format
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-3 py-2 text-sm">
                      1.0
                    </td>
                    <td className="border border-border px-3 py-2 text-sm">
                      02.07.2025
                    </td>
                    <td className="border border-border px-3 py-2 text-sm">
                      Yuri Oliveira
                    </td>
                    <td className="border border-border px-3 py-2 text-sm">
                      Juraci Paixão
                    </td>
                    <td className="border border-border px-3 py-2 text-sm"></td>
                    <td className="border border-border px-3 py-2 text-sm"></td>
                  </tr>
                  <tr>
                    <td className="border border-border px-3 py-2 text-sm">
                      1.1
                    </td>
                    <td className="border border-border px-3 py-2 text-sm">
                      03.06.2026
                    </td>
                    <td className="border border-border px-3 py-2 text-sm">
                      Lanay Marques
                    </td>
                    <td className="border border-border px-3 py-2 text-sm">
                      Juraci Paixão
                    </td>
                    <td className="border border-border px-3 py-2 text-sm">
                      Added Data Deletion Request submission and logging
                      procedure
                    </td>
                    <td className="border border-border px-3 py-2 text-sm"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
    </LegalPage>
  );
};

export default DataProtection;
