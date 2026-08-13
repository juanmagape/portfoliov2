function AzureProject() {
    return (
        <div className="documentation-container">
            <h1>Hybrid Infrastructure Deployment: Windows Server 2025 and Microsoft Entra ID</h1>

            <p className="project-description">
                This project documents the creation of a hybrid network architecture connecting an on-premise domain controller with Microsoft Entra ID. Furthermore, Zero Trust security policies are implemented by deploying and remotely managing cloud infrastructure (IaaS) through Azure Bastion.
            </p>

            <nav className="table-of-contents">
                <h2>Table of Contents</h2>
                <ul>
                    <li><a href="#setup">1. Virtualization Environment Setup</a></li>
                    <li><a href="#configuration">2. Initial Configuration and Server Roles</a></li>
                    <li><a href="#structure">3. Active Directory Structure Design</a></li>
                    <li><a href="#automation">4. User Deployment Automation with PowerShell</a></li>
                    <li><a href="#hybrid-environment">5. Hybrid Environment Preparation (Azure / Entra ID)</a></li>
                    <li><a href="#synchronization">6. Entra Cloud Sync Finalization and Identity Synchronization</a></li>
                    <li><a href="#iaas-bastion">7. Azure IaaS Deployment and Secure Access (Zero Trust) with Bastion</a></li>
                </ul>
            </nav>

            <section id="setup" className="doc-section">
                <h2>1. Virtualization Environment Setup</h2>
                <p>To build our base infrastructure, instead of using traditional desktop solutions, I opted for Microsoft's native hypervisor. The first thing we need to do is open our Hyper-V Manager.</p>
                <ul>
                    <li>Once inside, we create a new Virtual Machine, assigning the necessary resources (RAM, vCPU, and a dynamically expanding virtual hard disk) to support the server operating system.</li>
                    <li>In this case, I named the machine <code>winserv2025</code>, as can be seen in the control panel.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-07-31 205431.png" alt="Hyper-V Manager with winserv2025" className="doc-image" />
            </section>

            <section id="configuration" className="doc-section">
                <h2>2. Initial Configuration and Server Roles</h2>
                <p>Once the Windows Server 2025 installation is complete and a static IP is configured (an essential requirement for a domain controller), we head to the Server Manager.</p>
                <ul>
                    <li>The next thing we will do is go to the "Add roles and features" option.</li>
                    <li>For this server to act as the core of our network, I installed and promoted the three fundamental roles: <strong>AD DS</strong> (Active Directory Domain Services) for identity management, <strong>DNS</strong> for local network name resolution, and <strong>DHCP</strong> for automatic IP assignment to client machines.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-07-31 232639.png" alt="Server Manager Dashboard" className="doc-image" />
            </section>

            <section id="structure" className="doc-section">
                <h2>3. Active Directory Structure Design</h2>
                <p>With the domain created, the next step is not to create users randomly, but to establish a logical hierarchy. To do this, we open the "Active Directory Users and Computers" tool.</p>
                <ul>
                    <li>At the root of the domain, I created a main Organizational Unit (OU) named <code>Suppora_Corp</code>.</li>
                    <li>Within it, I segmented the infrastructure into three sub-OUs: <code>departamentos</code> (departments), <code>equipos</code> (computers), and <code>servidores</code> (servers). This will allow us to apply Group Policies (GPOs) in a much more granular and organized way in the future.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-08-02 194935.png" alt="Organizational Units Structure" className="doc-image" />
            </section>

            <section id="automation" className="doc-section">
                <h2>4. User Deployment Automation with PowerShell</h2>
                <p>In a real corporate environment, creating users manually is not efficient. To demonstrate advanced administration capabilities, I created an automation script.</p>
                <ul>
                    <li>First, I prepared a <code>usuarios.csv</code> file with all the staff data (First Name, Last Name, Department, Job Title, and destination OU).</li>
                    <li>Subsequently, I developed the <code>script_users.ps1</code> script, which reads this CSV, generates the login name (sAMAccountName), converts the password to a secure format, and uses the <code>New-ADUser</code> command to create accounts in bulk, automatically skipping those that already exist.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-08-12 232425.png" alt="CSV file with user data" className="doc-image" />
                <img src="/azure-project/Screenshot 2026-08-12 232430.png" alt="PowerShell script for user creation" className="doc-image" />
                <ul>
                    <li>Once the script is executed, the system generates a log file (<code>user-creation-log.txt</code>) confirming the successful creation of each account.</li>
                    <li>If we return to our Active Directory and enter specific OUs, such as <code>dep-desarrollo</code>, we can verify that all users have been correctly imported with their respective profiles.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-08-12 232351.png" alt="User creation log" className="doc-image" />
                <img src="/azure-project/Screenshot 2026-08-12 232512.png" alt="Users created in Active Directory" className="doc-image" />
            </section>

            <section id="hybrid-environment" className="doc-section">
                <h2>5. Hybrid Environment Preparation (Azure / Entra ID)</h2>
                <p>To modernize the infrastructure and allow users to use the same local credentials in the Microsoft 365 cloud, I configured identity synchronization.</p>
                <ul>
                    <li>The first thing we had to do on the local server was to go to "Active Directory Domains and Trusts" to add the alternative UPN suffix of our cloud tenant. This ensures that usernames match exactly between the local environment and Azure.</li>
                </ul>
                <img src="/azure-project/pendblur-sufijo.png" alt="Alternative UPN suffix configuration" className="doc-image" />
                <ul>
                    <li>Finally, I downloaded and installed the provisioning agent (<code>Microsoft Entra Provisioning Agent</code>).</li>
                    <li>During the configuration wizard, I validated the cloud global administrator credentials to establish a secure bridge between our Windows Server 2025 and Microsoft Entra ID.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-08-12 233706.png" alt="Provisioning Agent Installation" className="doc-image" />
                <img src="/azure-project/Screenshot 2026-08-12 233814.png" alt="Connection to Microsoft Entra ID" className="doc-image" />
            </section>

            <section id="synchronization" className="doc-section">
                <h2>6. Entra Cloud Sync Finalization and Identity Synchronization</h2>
                <p>For the bridge between our local server and the cloud to work, we need to configure the provisioning agent that will connect both worlds.</p>
                <ul>
                    <li>First, we head to the Microsoft Azure portal, to the <strong>Cloud sync</strong> section, and download the local agent installer.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-08-12 233903.png" alt="Azure Portal to download agent" className="doc-image" />
                <ul>
                    <li>During the installation on our Windows Server, the wizard will ask us to connect our directory. Here we input our local domain administrator credentials so the agent has read permissions over the users we previously created with PowerShell.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-08-12 235722.png" alt="Agent connection to local Active Directory" className="doc-image" />
                <ul>
                    <li>Back in the Azure portal, we create the <strong>New cloud sync configuration</strong>. A critical detail in this step is making sure to check the <strong>"Enable password hash synchronization"</strong> box. This is what allows users to use the exact same password in both the local office and Microsoft 365 services.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-08-13 000555.png" alt="Enable password hash synchronization" className="doc-image" />
                <ul>
                    <li>To verify that all the systems and infrastructure work has paid off, we go to the <strong>Users</strong> panel in Entra ID. As we can observe, all local employees have magically appeared in the cloud, marked with a "Yes" in the On-premises sync column.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-08-13 001544.png" alt="Synchronized users in Entra ID" className="doc-image" />
            </section>

            <section id="iaas-bastion" className="doc-section">
                <h2>7. Azure IaaS Deployment and Secure Access (Zero Trust) with Bastion</h2>
                <p>To wrap up the project, I wanted to demonstrate how to manage pure cloud infrastructure (IaaS) applying strict security policies, avoiding the exposure of public ports.</p>
                <ul>
                    <li>I deployed a Virtual Machine with the <strong>Ubuntu Linux</strong> operating system (<code>v-laboratorio</code>) inside a Virtual Network (VNet) in Azure. I configured it <strong>without a public IP address</strong>, making it invisible to the internet and protecting it from brute force attacks on port 22 (SSH).</li>
                    <li>To be able to administer it, I provisioned the <strong>Azure Bastion</strong> service in a dedicated subnet. From the portal itself, this service allows us to input our virtual machine credentials.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-08-13 035320.png" alt="Connection to Bastion in Azure" className="doc-image" />
                <ul>
                    <li>Upon clicking connect, Bastion opens a full terminal session directly in a web browser tab. All traffic is encrypted via HTTPS (port 443), achieving a completely secure and shielded remote administration.</li>
                </ul>
                <img src="/azure-project/Screenshot 2026-08-13 035403.png" alt="Secure SSH terminal in browser" className="doc-image" />
            </section>
        </div>
    );
}

export default AzureProject;