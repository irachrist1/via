document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('modal-container');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.getElementById('modal-body');
    
    // Function to open modal with content
    window.openModal = function(content) {
        modalBody.innerHTML = content;
        modal.style.display = 'block';
        
        // Force a reflow before adding the active class for smoother animation
        modal.offsetWidth;
        
        modal.classList.add('active');
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add focus trap for accessibility
        trapFocus(modal);
    };
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
        closeModalWithAnimation();
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalWithAnimation();
        }
    });
    
    // Close modal with animation
    function closeModalWithAnimation() {
        modal.classList.remove('active');
        
        // Wait for animation to complete before hiding
        setTimeout(function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            
            // Clear modal content after closing for better performance
            setTimeout(() => {
                modalBody.innerHTML = '';
            }, 100);
        }, 300);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalWithAnimation();
        }
    });
    
    // Trap focus inside modal for accessibility
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="checkbox"], select');
        
        if (focusableElements.length) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            // Set initial focus
            setTimeout(() => {
                firstElement.focus();
            }, 100);
            
            // Trap focus in modal
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }
    }
    
    // Accordion functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('accordion-header') || 
            e.target.parentElement.classList.contains('accordion-header')) {
            
            const header = e.target.classList.contains('accordion-header') ? 
                          e.target : e.target.parentElement;
            const content = header.nextElementSibling;
            
            // Toggle active class
            content.classList.toggle('active');
        }
    });
    
    // Initialize the dashboard with data
    initializeDashboard();
});

function initializeDashboard() {
    // Populate feature comparison section
    populateFeatureComparison();
    
    // Populate recommendations section
    populateRecommendations();
    
    // Populate compliance section
    populateCompliance();
    
    // Populate framework section
    populateFramework();
    
    // Populate budget section
    populateBudget();
}

function populateFeatureComparison() {
    const section = document.getElementById('feature-comparison');
    
    // Sample data - replace with your actual data
    const featureData = [
        { feature: "User-friendly interface", foundant: true, fluxx: true, blackbaud: true, goodGrants: true },
        { feature: "Customizable application forms", foundant: true, fluxx: true, blackbaud: true, goodGrants: true },
        { feature: "Multi-stage review process", foundant: true, fluxx: true, blackbaud: false, goodGrants: true },
        { feature: "AI-powered routing", foundant: false, fluxx: true, blackbaud: false, goodGrants: false },
        { feature: "Automated compliance checks", foundant: true, fluxx: true, blackbaud: true, goodGrants: false },
        { feature: "DAF support", foundant: true, fluxx: false, blackbaud: true, goodGrants: false },
        { feature: "Cross-border grant capability", foundant: false, fluxx: true, blackbaud: true, goodGrants: true },
        { feature: "Integrated payment processing", foundant: true, fluxx: true, blackbaud: true, goodGrants: false },
        { feature: "Comprehensive reporting", foundant: true, fluxx: true, blackbaud: true, goodGrants: true },
        { feature: "Mobile accessibility", foundant: true, fluxx: true, blackbaud: true, goodGrants: true }
    ];
    
    // Create table
    let tableHTML = `
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Foundant GLM</th>
                    <th>Fluxx</th>
                    <th>Blackbaud</th>
                    <th>Good Grants</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    featureData.forEach(item => {
        tableHTML += `
            <tr>
                <td>${item.feature}</td>
                <td>${item.foundant ? '<span class="check-yes">✓</span>' : '<span class="check-no">✗</span>'}</td>
                <td>${item.fluxx ? '<span class="check-yes">✓</span>' : '<span class="check-no">✗</span>'}</td>
                <td>${item.blackbaud ? '<span class="check-yes">✓</span>' : '<span class="check-no">✗</span>'}</td>
                <td>${item.goodGrants ? '<span class="check-yes">✓</span>' : '<span class="check-no">✗</span>'}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
        <button onclick="openModal(generateFeatureComparisonDetails())">View Detailed Comparison</button>
    `;
    
    section.innerHTML += tableHTML;
}

function populateRecommendations() {
    const section = document.getElementById('recommendations');
    
    // Sample recommendation data
    const recommendationsHTML = `
        <div class="card-container">
            <div class="card">
                <h3>Foundant GLM</h3>
                <p><strong>Best For:</strong> Small to mid-sized foundations with straightforward grantmaking processes</p>
                <p><strong>Key Strengths:</strong> User-friendly interface, excellent customer support, DAF capabilities</p>
                <p><strong>Limitations:</strong> Limited cross-border functionality, less advanced AI features</p>
                <div class="card-button-container">
                    <button onclick="openModal(generateRecommendationDetails('foundant'))">View Full Analysis</button>
                </div>
            </div>
            
            <div class="card">
                <h3>Fluxx</h3>
                <p><strong>Best For:</strong> Large foundations with complex workflows and international grantmaking</p>
                <p><strong>Key Strengths:</strong> Highly customizable, advanced AI routing, robust reporting</p>
                <p><strong>Limitations:</strong> Steeper learning curve, higher implementation costs</p>
                <div class="card-button-container">
                    <button onclick="openModal(generateRecommendationDetails('fluxx'))">View Full Analysis</button>
                </div>
            </div>
            
            <div class="card">
                <h3>Good Grants</h3>
                <p><strong>Best For:</strong> Organizations focused on competitive grant programs and scholarships</p>
                <p><strong>Key Strengths:</strong> Excellent review capabilities, intuitive interface, affordable</p>
                <p><strong>Limitations:</strong> Limited payment processing, fewer compliance features</p>
                <div class="card-button-container">
                    <button onclick="openModal(generateRecommendationDetails('goodgrants'))">View Full Analysis</button>
                </div>
            </div>
        </div>
        
        <div class="section-spacer"></div>
        
        <h3>Implementation Strategy</h3>
        <div class="implementation-card">
            <div class="implementation-timeline">
                <img src="https://via.placeholder.com/800x300/f8f9fa/2c3e50?text=Implementation+Timeline+Visualization" alt="Implementation Timeline" class="timeline-image">
                <div class="timeline-text">
                    <h4>Phased Approach:</h4>
                    <ol>
                        <li><strong>Phase 1 (Months 1-3):</strong> System selection, requirements gathering, and contract negotiation</li>
                        <li><strong>Phase 2 (Months 4-6):</strong> Initial configuration, data migration, and staff training</li>
                        <li><strong>Phase 3 (Months 7-9):</strong> Pilot program with select grants, testing and refinement</li>
                        <li><strong>Phase 4 (Months 10-12):</strong> Full deployment, integration with other systems, and optimization</li>
                    </ol>
                    <div class="card-button-container">
                        <button onclick="openModal(generateImplementationDetails())">View Detailed Implementation Plan</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    section.innerHTML += recommendationsHTML;
}

function populateCompliance() {
    const section = document.getElementById('compliance');
    
    // Compliance table
    const complianceHTML = `
        <h3>Critical Compliance Features</h3>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Compliance Feature</th>
                    <th>Foundant GLM</th>
                    <th>Fluxx</th>
                    <th>Blackbaud</th>
                    <th>Good Grants</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>RISA Compliance</td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-partial">Partial</span></td>
                </tr>
                <tr>
                    <td>Cross-Border Compliance</td>
                    <td><span class="check-partial">Partial</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-partial">Partial</span></td>
                </tr>
                <tr>
                    <td>Audit Trail</td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                </tr>
                <tr>
                    <td>OFAC Screening</td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-no">✗</span></td>
                </tr>
                <tr>
                    <td>GDPR Compliance</td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                </tr>
            </tbody>
        </table>
        
        <h3>Integration Capacity Scorecard</h3>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Integration</th>
                    <th>Foundant GLM</th>
                    <th>Fluxx</th>
                    <th>Blackbaud</th>
                    <th>Good Grants</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Microsoft 365</td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                </tr>
                <tr>
                    <td>Asana</td>
                    <td><span class="check-no">✗</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-partial">API Only</span></td>
                    <td><span class="check-no">✗</span></td>
                </tr>
                <tr>
                    <td>Workday</td>
                    <td><span class="check-partial">Limited</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-no">✗</span></td>
                </tr>
                <tr>
                    <td>Salesforce</td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-partial">Limited</span></td>
                </tr>
                <tr>
                    <td>QuickBooks</td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-partial">Limited</span></td>
                    <td><span class="check-yes">✓</span></td>
                    <td><span class="check-no">✗</span></td>
                </tr>
            </tbody>
        </table>
        
        <div class="chart-container">
            <canvas id="integrationChart"></canvas>
        </div>
        <script>
            // Create radar chart for integration capabilities
            const ctx = document.getElementById('integrationChart').getContext('2d');
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Microsoft 365', 'Asana', 'Workday', 'Salesforce', 'QuickBooks'],
                    datasets: [
                        {
                            label: 'Foundant GLM',
                            data: [100, 0, 50, 100, 100],
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgb(54, 162, 235)',
                            pointBackgroundColor: 'rgb(54, 162, 235)'
                        },
                        {
                            label: 'Fluxx',
                            data: [100, 100, 100, 100, 50],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            pointBackgroundColor: 'rgb(255, 99, 132)'
                        },
                        {
                            label: 'Blackbaud',
                            data: [100, 50, 100, 100, 100],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgb(75, 192, 192)',
                            pointBackgroundColor: 'rgb(75, 192, 192)'
                        },
                        {
                            label: 'Good Grants',
                            data: [100, 0, 0, 50, 0],
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            borderColor: 'rgb(255, 206, 86)',
                            pointBackgroundColor: 'rgb(255, 206, 86)'
                        }
                    ]
                },
                options: {
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        </script>
    `;
    
    section.innerHTML += complianceHTML;
}

function populateFramework() {
    const section = document.getElementById('framework');
    
    const frameworkHTML = `
        <div class="framework-overview">
            <h3>VIA Foundation Technology and Operational Framework</h3>
            <p>This comprehensive framework outlines the technological infrastructure, grant management systems, data security protocols, and operational efficiency recommendations designed to support the VIA Foundation's mission and strategic objectives.</p>
            
            <div class="button-group">
                <button onclick="openModal(generateSystemsOverview())">Systems Overview</button>
                <button onclick="openModal(generateDetailedSystemAnalysis())">Detailed System Analysis</button>
                <button onclick="openModal(generateHardwareRecommendations())">Hardware Recommendations</button>
                <button onclick="openModal(generateSecurityStandards())">Security Standards</button>
                <button onclick="openModal(generateSLARequirements())">SLA Requirements</button>
                <button onclick="openModal(generateImplementationStrategy())">Implementation Strategy</button>
                <button onclick="openModal(generateBudgetOverview())">Budget Overview</button>
                <button onclick="openModal(generateRiskManagement())">Risk Management</button>
            </div>
        </div>
        
        <div class="accordion">
            <div class="accordion-header">
                1. Systems Overview <span>+</span>
            </div>
            <div class="accordion-content">
                <h4>Core Systems Matrix</h4>
                <div class="table-responsive">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>System Category</th>
                                <th>Recommended Solution</th>
                                <th>Key Features</th>
                                <th>Pros</th>
                                <th>Cons</th>
                                <th>Implementation Timeline</th>
                                <th>Users</th>
                                <th>Base Annual Cost</th>
                                <th>Security Standards</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cloud Infrastructure</td>
                                <td>Microsoft Azure</td>
                                <td>Scalable storage, virtual machines, identity management, backup services</td>
                                <td>Robust security, scalability, integration with Microsoft 365</td>
                                <td>Cost management requires attention, learning curve</td>
                                <td>Phase 1 (1-3 months)</td>
                                <td>All staff (infrastructure)</td>
                                <td>$15,000-$25,000</td>
                                <td>SOC 2 Type II, ISO 27001, GDPR compliant</td>
                            </tr>
                            <tr>
                                <td>Productivity Suite</td>
                                <td>Microsoft 365 Business Premium</td>
                                <td>Email, document management, Teams, SharePoint, OneDrive, security features</td>
                                <td>Comprehensive solution, strong integration, familiar interface</td>
                                <td>Feature complexity can be overwhelming</td>
                                <td>Phase 1 (1-2 months)</td>
                                <td>All staff (50)</td>
                                <td>$22 per user/month</td>
                                <td>SOC 2 Type II, ISO 27001, GDPR compliant</td>
                            </tr>
                            <tr>
                                <td>Grant Management</td>
                                <td>Fluxx</td>
                                <td>Application management, review workflow, reporting, grantee portal</td>
                                <td>Highly configurable, robust reporting, excellent for complex processes</td>
                                <td>Steeper learning curve, higher implementation costs</td>
                                <td>Phase 2-3 (4-9 months)</td>
                                <td>Program staff (25)</td>
                                <td>$40,000-$70,000</td>
                                <td>SOC 2 Type II, GDPR compliant</td>
                            </tr>
                            <tr>
                                <td>Database Management</td>
                                <td>Airtable Enterprise</td>
                                <td>Custom databases, automation, API access, collaboration</td>
                                <td>User-friendly, flexible, rapid deployment</td>
                                <td>Limited for very complex data relationships</td>
                                <td>Phase 2 (3-6 months)</td>
                                <td>Program and operations staff (30)</td>
                                <td>$45 per user/month</td>
                                <td>SOC 2 Type II, GDPR compliant</td>
                            </tr>
                            <tr>
                                <td>Financial Management</td>
                                <td>QuickBooks Enterprise</td>
                                <td>Fund accounting, grant payments, financial reporting</td>
                                <td>Industry standard, strong reporting, user-friendly</td>
                                <td>Limited customization for complex grant accounting</td>
                                <td>Phase 2 (3-6 months)</td>
                                <td>Finance staff (5)</td>
                                <td>$1,740 per year</td>
                                <td>SOC 2 Type II</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onclick="openModal(generateSystemsOverview())">View Complete Systems Overview</button>
            </div>
        </div>
        
        <div class="accordion">
            <div class="accordion-header">
                2. Detailed System Analysis <span>+</span>
            </div>
            <div class="accordion-content">
                <h4>2.1 Data Management Strategy</h4>
                <p>A comprehensive approach to data collection, storage, and protection:</p>
                <ul>
                    <li><strong>Data Collection:</strong> Standardized forms and processes</li>
                    <li><strong>Data Storage:</strong> Cloud-based with appropriate redundancy</li>
                    <li><strong>Data Protection:</strong> Encryption, role-based access, regular backups</li>
                </ul>
                
                <h4>2.2 IT Policies</h4>
                <p>Key policies include:</p>
                <ul>
                    <li><strong>Security Standards:</strong> MFA, regular audits, encryption</li>
                    <li><strong>User Access:</strong> Role-based permissions, access reviews</li>
                    <li><strong>Risk Management:</strong> Regular assessments, incident response</li>
                </ul>
                
                <h4>2.3 Grant Management System (Fluxx)</h4>
                <div class="table-responsive">
                    <table class="comparison-table">
                        <tr>
                            <th>Aspect</th>
                            <th>Details</th>
                        </tr>
                        <tr>
                            <td>Main Features</td>
                            <td>Customizable workflows, robust reporting, grantee portal</td>
                        </tr>
                        <tr>
                            <td>Pricing Structure</td>
                            <td>Annual subscription based on foundation size</td>
                        </tr>
                        <tr>
                            <td>Pros</td>
                            <td>Highly configurable, excellent for complex processes</td>
                        </tr>
                        <tr>
                            <td>Cons</td>
                            <td>Steeper learning curve, higher implementation costs</td>
                        </tr>
                        <tr>
                            <td>Integration Capabilities</td>
                            <td>Strong API, pre-built connectors for major systems</td>
                        </tr>
                    </table>
                </div>
                
                <h4>2.4 Database Management (Airtable Enterprise)</h4>
                <div class="table-responsive">
                    <table class="comparison-table">
                        <tr>
                            <th>Aspect</th>
                            <th>Details</th>
                        </tr>
                        <tr>
                            <td>Main Features</td>
                            <td>Custom databases, automation, collaboration tools</td>
                        </tr>
                        <tr>
                            <td>Pricing Structure</td>
                            <td>Per-user monthly subscription</td>
                        </tr>
                        <tr>
                            <td>Pros</td>
                            <td>User-friendly, flexible, rapid deployment</td>
                        </tr>
                        <tr>
                            <td>Cons</td>
                            <td>Limited for very complex data relationships</td>
                        </tr>
                        <tr>
                            <td>Integration Capabilities</td>
                            <td>API access, Zapier integration, webhooks</td>
                        </tr>
                    </table>
                </div>
                
                <button onclick="openModal(generateDetailedSystemAnalysis())">View Complete System Analysis</button>
            </div>
        </div>
        
        <div class="accordion">
            <div class="accordion-header">
                3. Hardware Recommendations <span>+</span>
            </div>
            <div class="accordion-content">
                <h4>Minimum Staff Workstation Specifications</h4>
                <ul>
                    <li><strong>Processor:</strong> Intel Core i5 (10th gen or newer) or equivalent</li>
                    <li><strong>RAM:</strong> 16GB minimum</li>
                    <li><strong>Storage:</strong> 256GB SSD minimum</li>
                    <li><strong>Display:</strong> 24" Full HD monitor</li>
                    <li><strong>Operating System:</strong> Windows 10/11 Professional or macOS Monterey+</li>
                </ul>
                
                <h4>Recommended Additional Hardware</h4>
                <ul>
                    <li><strong>Secondary Monitor:</strong> 24" Full HD for productivity</li>
                    <li><strong>Docking Station:</strong> For laptop users</li>
                    <li><strong>Webcam:</strong> 1080p for virtual meetings</li>
                    <li><strong>Headset:</strong> Noise-cancelling for clear communication</li>
                </ul>
                
                <button onclick="openModal(generateHardwareRecommendations())">View Complete Hardware Recommendations</button>
            </div>
        </div>
        
        <div class="accordion">
            <div class="accordion-header">
                4. Security Standards and Compliance <span>+</span>
            </div>
            <div class="accordion-content">
                <h4>Required Security Measures</h4>
                <ul>
                    <li><strong>Authentication:</strong> Multi-factor authentication for all systems</li>
                    <li><strong>Encryption:</strong> Data encryption at rest and in transit</li>
                    <li><strong>Access Control:</strong> Role-based access with least privilege principle</li>
                    <li><strong>Monitoring:</strong> Security event logging and monitoring</li>
                    <li><strong>Updates:</strong> Regular security patches and updates</li>
                </ul>
                
                <h4>Compliance Requirements</h4>
                <ul>
                    <li><strong>GDPR:</strong> For handling EU citizen data</li>
                    <li><strong>CCPA:</strong> For California residents' data</li>
                    <li><strong>PCI DSS:</strong> If processing credit card payments</li>
                    <li><strong>Industry Standards:</strong> SOC 2 Type II compliance for cloud services</li>
                </ul>
                
                <button onclick="openModal(generateSecurityStandards())">View Complete Security Standards</button>
            </div>
        </div>
        
        <div class="accordion">
            <div class="accordion-header">
                5. Service Level Agreements (SLA) Requirements <span>+</span>
            </div>
            <div class="accordion-content">
                <h4>Minimum SLA Requirements</h4>
                <div class="table-responsive">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Minimum Uptime</th>
                                <th>Maximum Resolution Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Grant Management System</td>
                                <td>99.9% (8.76 hours downtime/year)</td>
                                <td>Critical: 4 hours<br>High: 8 hours<br>Medium: 24 hours</td>
                            </tr>
                            <tr>
                                <td>Cloud Infrastructure</td>
                                <td>99.95% (4.38 hours downtime/year)</td>
                                <td>Critical: 2 hours<br>High: 4 hours<br>Medium: 12 hours</td>
                            </tr>
                            <tr>
                                <td>Email & Productivity</td>
                                <td>99.9% (8.76 hours downtime/year)</td>
                                <td>Critical: 4 hours<br>High: 8 hours<br>Medium: 24 hours</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <h4>SLA Monitoring and Enforcement</h4>
                <ul>
                    <li>Regular service reviews with vendors</li>
                    <li>Automated uptime monitoring</li>
                    <li>Documented escalation procedures</li>
                    <li>Compensation clauses for SLA violations</li>
                </ul>
                
                <button onclick="openModal(generateSLARequirements())">View Complete SLA Requirements</button>
            </div>
        </div>
        
        <div class="accordion">
            <div class="accordion-header">
                6. Implementation Strategy <span>+</span>
            </div>
            <div class="accordion-content">
                <h4>Phased Implementation Plan</h4>
                
                <h5>Phase 1: Foundation (Months 1-3)</h5>
                <ul>
                    <li>Cloud infrastructure setup</li>
                    <li>Microsoft 365 deployment</li>
                    <li>Security policies implementation</li>
                    <li>Hardware procurement</li>
                </ul>
                
                <h5>Phase 2: Core Systems (Months 4-6)</h5>
                <ul>
                    <li>Grant management system selection and initial setup</li>
                    <li>Database management implementation</li>
                    <li>Financial system integration</li>
                    <li>Initial staff training</li>
                </ul>
                
                <h5>Phase 3: Integration (Months 7-9)</h5>
                <ul>
                    <li>System integrations</li>
                    <li>Workflow automation</li>
                    <li>Advanced training</li>
                    <li>Data migration completion</li>
                </ul>
                
                <h5>Phase 4: Optimization (Months 10-12)</h5>
                <ul>
                    <li>Performance optimization</li>
                    <li>Advanced reporting setup</li>
                    <li>Process refinement</li>
                    <li>Final training and documentation</li>
                </ul>
                
                <button onclick="openModal(generateImplementationStrategy())">View Complete Implementation Strategy</button>
            </div>
        </div>
        
        <div class="accordion">
            <div class="accordion-header">
                7. Budget Overview <span>+</span>
            </div>
            <div class="accordion-content">
                <h4>Technology Budget Overview</h4>
                <div class="table-responsive">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Year 1 Cost</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cloud Infrastructure</td>
                                <td>$20,000</td>
                                <td>Azure services, storage, compute</td>
                            </tr>
                            <tr>
                                <td>Productivity Suite</td>
                                <td>$13,200</td>
                                <td>Based on 50 users at $22/month</td>
                            </tr>
                            <tr>
                                <td>Grant Management System</td>
                                <td>$60,000</td>
                                <td>Includes implementation services</td>
                            </tr>
                            <tr>
                                <td>Database Management</td>
                                <td>$16,200</td>
                                <td>Based on 30 users at $45/month</td>
                            </tr>
                            <tr>
                                <td>Financial Management</td>
                                <td>$1,740</td>
                                <td>Annual subscription</td>
                            </tr>
                            <tr>
                                <td>Hardware</td>
                                <td>$25,000</td>
                                <td>Workstations, peripherals</td>
                            </tr>
                            <tr>
                                <td>Implementation Services</td>
                                <td>$40,000</td>
                                <td>Consulting, configuration, training</td>
                            </tr>
                            <tr>
                                <td>Security & Compliance</td>
                                <td>$15,000</td>
                                <td>Security tools, audits, training</td>
                            </tr>
                            <tr>
                                <td>Contingency (10%)</td>
                                <td>$19,114</td>
                                <td>For unexpected costs</td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>$210,254</strong></td>
                                <td>Year 1 total investment</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <button onclick="openModal(generateBudgetOverview())">View Complete Budget Overview</button>
            </div>
        </div>
        
        <div class="accordion">
            <div class="accordion-header">
                8. Risk Management <span>+</span>
            </div>
            <div class="accordion-content">
                <h4>Identified Risks and Mitigation Strategies</h4>
                
                <h5>Data Security Risks</h5>
                <ul>
                    <li><strong>Risk:</strong> Unauthorized data access<br>
                        <strong>Mitigation:</strong> Role-based access control, encryption, security audits</li>
                    <li><strong>Risk:</strong> Data loss<br>
                        <strong>Mitigation:</strong> Regular backups, geo-redundant storage, disaster recovery plan</li>
                </ul>
                
                <h5>System Integration Risks</h5>
                <ul>
                    <li><strong>Risk:</strong> Integration failure between systems<br>
                        <strong>Mitigation:</strong> Thorough testing, phased approach, vendor guarantees</li>
                    <li><strong>Risk:</strong> Data synchronization issues<br>
                        <strong>Mitigation:</strong> Automated monitoring, clear data ownership policies</li>
                </ul>
                
                <h5>User Adoption Risks</h5>
                <ul>
                    <li><strong>Risk:</strong> Staff resistance to new systems<br>
                        <strong>Mitigation:</strong> Comprehensive training, super-user program, clear communication</li>
                    <li><strong>Risk:</strong> Workflow disruption<br>
                        <strong>Mitigation:</strong> Phased implementation, adequate testing, feedback mechanisms</li>
                </ul>
                
                <button onclick="openModal(generateRiskManagement())">View Complete Risk Management Plan</button>
            </div>
        </div>
        
        <h3>System Architecture Overview</h3>
        <div class="system-architecture">
            <img src="img/architecture.png" alt="System Architecture Diagram" onerror="this.onerror=null; this.src=''; this.alt='Architecture diagram not available'">
            <!-- Fallback if image doesn't load -->
            <div class="architecture-text">
                <p>The VIA Foundation technology framework consists of interconnected systems with the Grant Management System at its core, integrated with:</p>
                <ul>
                    <li>Cloud Infrastructure (Azure)</li>
                    <li>Microsoft 365 Productivity Suite</li>
                    <li>Financial Management Systems</li>
                    <li>Database Management (Airtable)</li>
                    <li>Data Analytics and Reporting</li>
                </ul>
                <button onclick="openModal(generateArchitectureDetails())">View Detailed Architecture</button>
            </div>
        </div>
    `;
    
    section.innerHTML += frameworkHTML;
}

function populateBudget() {
    const section = document.getElementById('budget');
    
    const budgetHTML = `
        <h3>Implementation Budget Overview</h3>
        <div class="chart-container">
            <canvas id="budgetChart"></canvas>
        </div>
        
        <div class="budget-details">
            <h4>Estimated Total Budget: $150,000 - $250,000</h4>
            <p>Budget breakdown based on percentage allocation:</p>
            <ul>
                <li><strong>Software Licensing (35%):</strong> $52,500 - $87,500</li>
                <li><strong>Implementation Services (25%):</strong> $37,500 - $62,500</li>
                <li><strong>Data Migration (15%):</strong> $22,500 - $37,500</li>
                <li><strong>Training (10%):</strong> $15,000 - $25,000</li>
                <li><strong>Customization (10%):</strong> $15,000 - $25,000</li>
                <li><strong>Contingency (5%):</strong> $7,500 - $12,500</li>
            </ul>
        </div>
        
        <h3>Risk Management</h3>
        <div class="accordion">
            <div class="accordion-header">
                <span>Implementation Risks</span>
                <span class="toggle-icon">+</span>
            </div>
            <div class="accordion-content">
                <p>Key implementation risks and mitigation strategies:</p>
                <ul>
                    <li><strong>Data Migration Issues:</strong> Conduct thorough data audit before migration, create backup of all data, perform test migrations</li>
                    <li><strong>Staff Adoption Challenges:</strong> Involve key users in selection process, provide comprehensive training, identify champions</li>
                    <li><strong>Budget Overruns:</strong> Include contingency in budget, clearly define scope, implement change management process</li>
                    <li><strong>Timeline Delays:</strong> Build buffer into timeline, identify dependencies early, regular progress reviews</li>
                </ul>
            </div>
        </div>
        
        <div class="accordion">
            <div class="accordion-header">
                <span>Operational Risks</span>
                <span class="toggle-icon">+</span>
            </div>
            <div class="accordion-content">
                <p>Ongoing operational risks to monitor:</p>
                <ul>
                    <li><strong>System Downtime:</strong> Establish SLAs with vendor, have backup processes in place, regular system maintenance</li>
                    <li><strong>Security Breaches:</strong> Regular security audits, staff training on security best practices, data encryption</li>
                    <li><strong>Vendor Stability:</strong> Assess vendor financial health, ensure data portability, maintain relationship with alternative vendors</li>
                </ul>
            </div>
        </div>
        
        <button onclick="openModal(generateBudgetDetails())">View Detailed Budget</button>
        <button onclick="openModal(generateRiskManagement())">View Complete Risk Management Plan</button>
    `;
    
    section.innerHTML += budgetHTML;
    
    // Create budget chart after the HTML has been added to the DOM
    createBudgetChart();
}

// Separate function to create the budget chart
function createBudgetChart() {
    // Make sure the canvas element exists in the DOM
    const budgetCanvas = document.getElementById('budgetChart');
    if (!budgetCanvas) return;
    
    const budgetCtx = budgetCanvas.getContext('2d');
    new Chart(budgetCtx, {
        type: 'doughnut',
        data: {
            labels: [
                'Software Licensing', 
                'Implementation Services', 
                'Data Migration', 
                'Training', 
                'Customization',
                'Contingency'
            ],
            datasets: [{
                data: [35, 25, 15, 10, 10, 5],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#e74c3c',
                    '#f39c12',
                    '#9b59b6',
                    '#95a5a6'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// Modal content generation functions
function generateFeatureComparisonDetails() {
    return `
        <h2>Detailed Feature Comparison</h2>
        <p class="modal-intro">This expanded view provides a comprehensive comparison of all features across the evaluated grant management systems. Each system has been assessed based on core functionality, user experience, and specialized capabilities.</p>
        
        <div class="section-divider"></div>
        
        <h3>Core Features</h3>
        <p>The following table outlines the essential features that form the foundation of each grant management system:</p>
        
        <div class="table-responsive">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>Foundant GLM</th>
                        <th>Fluxx</th>
                        <th>Blackbaud</th>
                        <th>Good Grants</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>User-friendly interface</td>
                        <td><span class="check-yes">✓</span> (4.5/5)</td>
                        <td><span class="check-yes">✓</span> (4/5)</td>
                        <td><span class="check-yes">✓</span> (3.5/5)</td>
                        <td><span class="check-yes">✓</span> (4.5/5)</td>
                    </tr>
                    <tr>
                        <td>Customizable application forms</td>
                        <td><span class="check-yes">✓</span> (High)</td>
                        <td><span class="check-yes">✓</span> (Very High)</td>
                        <td><span class="check-yes">✓</span> (Medium)</td>
                        <td><span class="check-yes">✓</span> (High)</td>
                    </tr>
                    <!-- Additional rows would go here -->
                </tbody>
            </table>
        </div>
        
        <div class="section-divider"></div>
        
        <h3>Advanced Features</h3>
        <p>Beyond the core functionality, these advanced features provide additional capabilities that may be crucial for specific organizational needs:</p>
        
        <div class="feature-grid">
            <div class="feature-card">
                <h4>Workflow Automation</h4>
                <ul>
                    <li><strong>Foundant GLM:</strong> Basic automation with customizable approval chains</li>
                    <li><strong>Fluxx:</strong> Advanced automation with visual workflow builder</li>
                    <li><strong>Blackbaud:</strong> Moderate automation capabilities</li>
                    <li><strong>Good Grants:</strong> Customizable workflows with conditional logic</li>
                </ul>
            </div>
            
            <div class="feature-card">
                <h4>Reporting Capabilities</h4>
                <ul>
                    <li><strong>Foundant GLM:</strong> Comprehensive built-in reports with export options</li>
                    <li><strong>Fluxx:</strong> Advanced analytics with customizable dashboards</li>
                    <li><strong>Blackbaud:</strong> Extensive reporting with integration to other Blackbaud products</li>
                    <li><strong>Good Grants:</strong> Flexible reporting with visual data presentation</li>
                </ul>
            </div>
        </div>
        
        <div class="section-divider"></div>
        
        <h3>Integration Capabilities</h3>
        <p>The ability to connect with other systems is crucial for a seamless technology ecosystem:</p>
        
        <blockquote>
            Integration capabilities significantly impact the overall efficiency of your grant management process, especially when working with existing financial systems and CRMs.
        </blockquote>
        
        <ul>
            <li><strong>API Availability:</strong> All systems offer APIs, but Fluxx and Blackbaud provide the most comprehensive documentation and support.</li>
            <li><strong>Pre-built Connectors:</strong> Blackbaud leads with the most pre-built integrations, followed by Fluxx.</li>
            <li><strong>Custom Integration Support:</strong> All vendors offer custom integration services, with varying levels of complexity and cost.</li>
        </ul>
        
        <div class="section-divider"></div>
        
        <h3>Conclusion</h3>
        <p>Based on the comprehensive feature analysis, each system offers distinct advantages:</p>
        
        <ol>
            <li><strong>Foundant GLM</strong> provides the best balance of usability and core functionality for small to medium foundations.</li>
            <li><strong>Fluxx</strong> offers the most customization and advanced features for larger organizations with complex workflows.</li>
            <li><strong>Blackbaud</strong> excels in ecosystem integration for organizations already using other Blackbaud products.</li>
            <li><strong>Good Grants</strong> provides an excellent user experience with strong review capabilities for competitive grant programs.</li>
        </ol>
        
        <p>The optimal choice depends on your organization's specific requirements, existing technology ecosystem, and long-term strategic goals.</p>
    `;
}

function generateRecommendationDetails(system) {
    let content = '';
    
    if (system === 'foundant') {
        content = `
            <h2>Foundant GLM - Detailed Analysis</h2>
            
            <h3>Overview</h3>
            <p>Foundant GLM (Grant Lifecycle Manager) is a comprehensive grants management solution designed specifically for foundations and giving programs. It offers a streamlined approach to the entire grant lifecycle, from application to reporting.</p>
            
            <h3>Strengths</h3>
            <ul>
                <li><strong>Intuitive Interface:</strong> Consistently rated as one of the most user-friendly systems in the market</li>
                <li><strong>Customer Support:</strong> Exceptional support team with deep knowledge of philanthropy</li>
                <li><strong>DAF Support:</strong> Strong capabilities for donor-advised fund management</li>
                <li><strong>Community:</strong> Active user community and regular knowledge sharing</li>
                <li><strong>Cost-Effective:</strong> Good value for small to mid-sized foundations</li>
            </ul>
            
            <h3>Limitations</h3>
            <ul>
                <li><strong>Cross-Border Limitations:</strong> Less robust for international grantmaking</li>
                <li><strong>Advanced Workflow:</strong> Limited capabilities for complex, multi-stage workflows</li>
                <li><strong>AI Features:</strong> Behind competitors in AI and machine learning capabilities</li>
                <li><strong>Customization Ceiling:</strong> Less flexible for highly specialized processes</li>
            </ul>
            
            <h3>Ideal Use Case</h3>
            <p>Foundant GLM is ideal for the VIA Foundation if:</p>
            <ul>
                <li>User-friendliness is a top priority</li>
                <li>Grantmaking processes are relatively straightforward</li>
                <li>Budget constraints are significant</li>
                <li>DAF management is a key requirement</li>
                <li>International grantmaking is minimal</li>
            </ul>
            
            <h3>Implementation Considerations</h3>
            <p>Typical implementation timeline: 3-4 months</p>
            <p>Key implementation steps:</p>
            <ol>
                <li>Process mapping and configuration planning</li>
                <li>System setup and form design</li>
                <li>Data migration from existing systems</li>
                <li>User training (admin and staff)</li>
                <li>Pilot testing with select grants</li>
                <li>Full launch and optimization</li>
            </ol>
        `;
    } else if (system === 'fluxx') {
        content = `
            <h2>Fluxx - Detailed Analysis</h2>
            
            <h3>Overview</h3>
            <p>Fluxx is a highly configurable grants management platform used by many of the world's largest foundations. It offers extensive customization options and advanced workflow capabilities.</p>
            
            <h3>Strengths</h3>
            <ul>
                <li><strong>Customization:</strong> Unparalleled ability to tailor the system to complex processes</li>
                <li><strong>Workflow Automation:</strong> Sophisticated routing and approval workflows</li>
                <li><strong>AI Capabilities:</strong> Leading the industry in AI-powered grant routing and analysis</li>
                <li><strong>International Support:</strong> Robust features for cross-border grantmaking</li>
                <li><strong>Scalability:</strong> Can handle very large grant volumes and complex organizations</li>
            </ul>
            
            <h3>Limitations</h3>
            <ul>
                <li><strong>Learning Curve:</strong> Steeper learning curve for users and administrators</li>
                <li><strong>Implementation Time:</strong> Longer implementation timeline (6-12 months typical)</li>
                <li><strong>Cost:</strong> Higher initial and ongoing costs</li>
                <li><strong>Complexity:</strong> May be overly complex for simpler grantmaking needs</li>
            </ul>
            
            <h3>Ideal Use Case</h3>
            <p>Fluxx is ideal for the VIA Foundation if:</p>
            <ul>
                <li>Grantmaking processes are complex with multiple stages</li>
                <li>International grantmaking is a significant focus</li>
                <li>Advanced workflow automation is needed</li>
                <li>The foundation plans to scale significantly</li>
                <li>Budget allows for higher implementation and licensing costs</li>
            </ul>
            
            <h3>Implementation Considerations</h3>
            <p>Typical implementation timeline: 6-9 months</p>
            <p>Key implementation steps:</p>
            <ol>
                <li>Detailed process analysis and system design</li>
                <li>Phased configuration approach</li>
                <li>Extensive testing of workflows</li>
                <li>Comprehensive training program</li>
                <li>Staged rollout by department or grant program</li>
                <li>Post-implementation optimization</li>
            </ol>
        `;
    } else if (system === 'goodgrants') {
        content = `
            <h2>Good Grants - Detailed Analysis</h2>
            
            <h3>Overview</h3>
            <p>Good Grants is a specialized platform focused on streamlining the application and review process for grants, scholarships, and awards. It offers a clean, intuitive interface with excellent review capabilities.</p>
            
            <h3>Strengths</h3>
            <ul>
                <li><strong>Review Process:</strong> Outstanding tools for managing application reviews</li>
                <li><strong>User Experience:</strong> Clean, modern interface that's easy to navigate</li>
                <li><strong>Quick Implementation:</strong> Faster setup time than most competitors</li>
                <li><strong>Affordability:</strong> Lower cost structure than enterprise solutions</li>
                <li><strong>Scholarship Support:</strong> Excellent for educational award programs</li>
            </ul>
            
            <h3>Limitations</h3>
            <ul>
                <li><strong>Payment Processing:</strong> Limited capabilities for grant disbursement</li>
                <li><strong>Compliance Features:</strong> Fewer built-in compliance tools</li>
                <li><strong>Integration Options:</strong> More limited integration ecosystem</li>
                <li><strong>Reporting Depth:</strong> Less robust reporting than enterprise alternatives</li>
            </ul>
            
            <h3>Ideal Use Case</h3>
            <p>Good Grants is ideal for the VIA Foundation if:</p>
            <ul>
                <li>The review process is a critical focus</li>
                <li>Budget constraints are significant</li>
                <li>Implementation timeline needs to be accelerated</li>
                <li>Scholarship or award programs are a key component</li>
                <li>Payment processing can be handled through other systems</li>
            </ul>
            
            <h3>Implementation Considerations</h3>
            <p>Typical implementation timeline: 2-3 months</p>
            <p>Key implementation steps:</p>
            <ol>
                <li>Application form design</li>
                <li>Review process configuration</li>
                <li>User account setup</li>
                <li>Basic training (typically shorter than competitors)</li>
                <li>Launch and refinement</li>
            </ol>
        `;
    }
    
    return content;
}

function generateImplementationDetails() {
    return `
        <h2>Detailed Implementation Plan</h2>
        
        <h3>Phase 1: Planning & Selection (Months 1-3)</h3>
        <ul>
            <li><strong>Month 1:</strong> Requirements gathering, stakeholder interviews, process mapping</li>
            <li><strong>Month 2:</strong> Vendor demonstrations, technical evaluations, reference checks</li>
            <li><strong>Month 3:</strong> Final selection, contract negotiation, implementation team formation</li>
        </ul>
        
        <h3>Phase 2: Initial Setup (Months 4-6)</h3>
        <ul>
            <li><strong>Month 4:</strong> System configuration planning, data migration strategy</li>
            <li><strong>Month 5:</strong> Core configuration, form design, workflow setup</li>
            <li><strong>Month 6:</strong> Initial data migration, administrator training</li>
        </ul>
        
        <h3>Phase 3: Testing & Refinement (Months 7-9)</h3>
        <ul>
            <li><strong>Month 7:</strong> User acceptance testing, process validation</li>
            <li><strong>Month 8:</strong> Staff training, pilot program with select grants</li>
            <li><strong>Month 9:</strong> Refinement based on pilot feedback, integration testing</li>
        </ul>
        
        <h3>Phase 4: Full Deployment (Months 10-12)</h3>
        <ul>
            <li><strong>Month 10:</strong> Full system launch, user support</li>
            <li><strong>Month 11:</strong> Integration with other systems, reporting setup</li>
            <li><strong>Month 12:</strong> Optimization, advanced feature implementation</li>
        </ul>
        
        <h3>Key Milestones</h3>
        <ol>
            <li>System selection approval</li>
            <li>Contract signing</li>
            <li>Configuration completion</li>
            <li>Data migration completion</li>
            <li>User training completion</li>
            <li>Pilot program launch</li>
            <li>Full system launch</li>
            <li>Integration completion</li>
            <li>Post-implementation review</li>
        </ol>
        
        <h3>Critical Success Factors</h3>
        <ul>
            <li>Executive sponsorship and visible support</li>
            <li>Adequate resources (budget, staff time)</li>
            <li>Clear requirements and success criteria</li>
            <li>Effective change management</li>
            <li>Comprehensive training program</li>
            <li>Phased approach with defined milestones</li>
        </ul>
    `;
}

function generateArchitectureDetails() {
    return `
        <h2>Detailed System Architecture</h2>
        
        <h3>Core Systems</h3>
        <ul>
            <li><strong>Grant Management System:</strong> Central hub for all grant-related activities</li>
            <li><strong>Cloud Infrastructure:</strong> Azure hosting with redundancy and security</li>
            <li><strong>Microsoft 365:</strong> Productivity and collaboration suite</li>
            <li><strong>Financial Management:</strong> Accounting and payment processing</li>
            <li><strong>CRM:</strong> Stakeholder relationship management</li>
        </ul>
        
        <h3>Integration Points</h3>
        <p>The following diagram illustrates the key integration points between systems:</p>
        
        <pre>
        +----------------+      +----------------+      +----------------+
        |                |      |                |      |                |
        |  Microsoft 365 |<---->| Grant Management|<---->|   Financial    |
        |                |      |     System     |      |    System      |
        +----------------+      +----------------+      +----------------+
                |                       ^                       ^
                |                       |                       |
                v                       |                       |
        +----------------+              |                       |
        |                |              |                       |
        |    SharePoint  |<-------------+                       |
        |  Document Mgmt |                                      |
        +----------------+                                      |
                                                               |
        +----------------+      +----------------+             |
        |                |      |                |             |
        |   CRM System   |<---->|  Data Analytics|<------------+
        |                |      |                |
        +----------------+      +----------------+
        </pre>
        
        <h3>Data Flow</h3>
        <ol>
            <li>Grant applications submitted through online portal</li>
            <li>Applications routed through review workflow</li>
            <li>Approved grants generate financial transactions</li>
            <li>Documents stored in SharePoint with metadata</li>
            <li>Reporting data aggregated from multiple systems</li>
            <li>Stakeholder communications tracked in CRM</li>
        </ol>
        
        <h3>Security Architecture</h3>
        <ul>
            <li><strong>Authentication:</strong> Single sign-on with MFA</li>
            <li><strong>Authorization:</strong> Role-based access control</li>
            <li><strong>Data Protection:</strong> Encryption at rest and in transit</li>
            <li><strong>Monitoring:</strong> Security information and event management (SIEM)</li>
            <li><strong>Updates:</strong> Regular security patches and updates</li>
        </ul>
        
        <h3>Disaster Recovery</h3>
        <ul>
            <li>Geo-redundant backups</li>
            <li>Recovery time objective (RTO): 4 hours</li>
            <li>Recovery point objective (RPO): 15 minutes</li>
            <li>Annual DR testing</li>
        </ul>
    `;
}

function generateBudgetDetails() {
    return `
        <h2>Detailed Budget Breakdown</h2>
        
        <h3>Software Licensing (35%: $52,500 - $87,500)</h3>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Estimated Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Core GMS License</td>
                    <td>Annual subscription for selected platform</td>
                    <td>$35,000 - $60,000</td>
                </tr>
                <tr>
                    <td>Additional Modules</td>
                    <td>Reporting, analytics, portal customization</td>
                    <td>$10,000 - $15,000</td>
                </tr>
                <tr>
                    <td>User Licenses</td>
                    <td>Based on 20-30 staff users</td>
                    <td>$7,500 - $12,500</td>
                </tr>
            </tbody>
        </table>
        
        <h3>Implementation Services (25%: $37,500 - $62,500)</h3>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Estimated Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Project Management</td>
                    <td>Vendor and internal PM resources</td>
                    <td>$10,000 - $15,000</td>
                </tr>
                <tr>
                    <td>System Configuration</td>
                    <td>Forms, workflows, user setup</td>
                    <td>$15,000 - $25,000</td>
                </tr>
                <tr>
                    <td>Integration Services</td>
                    <td>Connecting to other systems</td>
                    <td>$12,500 - $22,500</td>
                </tr>
            </tbody>
        </table>
        
        <h3>Data Migration (15%: $22,500 - $37,500)</h3>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Estimated Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Data Cleansing</td>
                    <td>Preparation of existing data</td>
                    <td>$7,500 - $12,500</td>
                </tr>
                <tr>
                    <td>Migration Services</td>
                    <td>Transfer of historical grants data</td>
                    <td>$10,000 - $17,500</td>
                </tr>
                <tr>
                    <td>Validation & Testing</td>
                    <td>Ensuring data accuracy</td>
                    <td>$5,000 - $7,500</td>
                </tr>
            </tbody>
        </table>
        
        <h3>Training (10%: $15,000 - $25,000)</h3>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Estimated Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Admin Training</td>
                    <td>System administrators (3-5 people)</td>
                    <td>$5,000 - $7,500</td>
                </tr>
                <tr>
                    <td>Staff Training</td>
                    <td>End users (15-25 people)</td>
                    <td>$7,500 - $12,500</td>
                </tr>
                <tr>
                    <td>Training Materials</td>
                    <td>Documentation, videos, guides</td>
                    <td>$2,500 - $5,000</td>
                </tr>
            </tbody>
        </table>
        
        <h3>Customization (10%: $15,000 - $25,000)</h3>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Estimated Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Custom Reports</td>
                    <td>Specialized reporting requirements</td>
                    <td>$5,000 - $10,000</td>
                </tr>
                <tr>
                    <td>Workflow Customization</td>
                    <td>Organization-specific processes</td>
                    <td>$7,500 - $10,000</td>
                </tr>
                <tr>
                    <td>UI Customization</td>
                    <td>Branding and interface adjustments</td>
                    <td>$2,500 - $5,000</td>
                </tr>
            </tbody>
        </table>
        
        <h3>Contingency (5%: $7,500 - $12,500)</h3>
        <p>Reserved for unexpected costs, scope changes, or additional requirements identified during implementation.</p>
        
        <h3>Annual Recurring Costs (Post-Implementation)</h3>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Estimated Annual Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Software Subscription</td>
                    <td>$40,000 - $70,000</td>
                </tr>
                <tr>
                    <td>Support & Maintenance</td>
                    <td>$10,000 - $15,000</td>
                </tr>
                <tr>
                    <td>Ongoing Training</td>
                    <td>$5,000 - $7,500</td>
                </tr>
                <tr>
                    <td><strong>Total Annual Cost</strong></td>
                    <td><strong>$55,000 - $92,500</strong></td>
                </tr>
            </tbody>
        </table>
    `;
}

// Modal content generation functions for Framework section
function generateSystemsOverview() {
    return `
        <h2>Complete Systems Overview</h2>
        <p class="modal-intro">This comprehensive overview outlines the recommended systems architecture for the VIA Foundation's technology infrastructure, including core components, integration points, and implementation considerations.</p>
        
        <div class="section-divider"></div>
        
        <h3>Core Systems Matrix</h3>
        <p>The following table presents a detailed comparison of recommended systems across key categories:</p>
        
        <div class="table-responsive">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>System Category</th>
                        <th>Recommended Solution</th>
                        <th>Key Features</th>
                        <th>Pros</th>
                        <th>Cons</th>
                        <th>Implementation Timeline</th>
                        <th>Users</th>
                        <th>Base Annual Cost</th>
                        <th>Security Standards</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cloud Infrastructure</td>
                        <td>Microsoft Azure</td>
                        <td>Scalable storage, virtual machines, identity management, backup services</td>
                        <td>Robust security, scalability, integration with Microsoft 365</td>
                        <td>Cost management requires attention, learning curve</td>
                        <td>Phase 1 (1-3 months)</td>
                        <td>All staff (infrastructure)</td>
                        <td>$15,000-$25,000</td>
                        <td>SOC 2 Type II, ISO 27001, GDPR compliant</td>
                    </tr>
                    <tr>
                        <td>Productivity Suite</td>
                        <td>Microsoft 365 Business Premium</td>
                        <td>Email, document management, Teams, SharePoint, OneDrive, security features</td>
                        <td>Comprehensive solution, strong integration, familiar interface</td>
                        <td>Feature complexity can be overwhelming</td>
                        <td>Phase 1 (1-2 months)</td>
                        <td>All staff</td>
                        <td>$22 per user/month</td>
                        <td>SOC 2 Type II, ISO 27001, GDPR compliant</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="section-divider"></div>
        
        <h3>Systems Architecture Overview</h3>
        <p>The recommended architecture establishes a secure, scalable foundation with the following key components:</p>
        
        <div class="architecture-diagram">
            <img src="https://via.placeholder.com/800x400" alt="Systems Architecture Diagram">
            <p class="image-caption">Figure 1: High-level systems architecture showing integration points between core systems</p>
        </div>
        
        <h4>Key Integration Points</h4>
        <ul>
            <li><strong>Identity Management:</strong> Azure Active Directory provides centralized authentication across all systems</li>
            <li><strong>Data Flow:</strong> Automated synchronization between grant management and financial systems</li>
            <li><strong>Document Management:</strong> Centralized storage in SharePoint with appropriate security controls</li>
            <li><strong>Reporting:</strong> Power BI connects to multiple data sources for comprehensive analytics</li>
        </ul>
        
        <div class="section-divider"></div>
        
        <h3>Implementation Considerations</h3>
        <p>A phased implementation approach is recommended to minimize disruption and ensure successful adoption:</p>
        
        <ol>
            <li><strong>Phase 1: Foundation</strong> - Establish core infrastructure and productivity tools</li>
            <li><strong>Phase 2: Grant Management</strong> - Implement and configure the primary grant management system</li>
            <li><strong>Phase 3: Integration</strong> - Connect systems and establish data flows</li>
            <li><strong>Phase 4: Advanced Features</strong> - Deploy additional capabilities and optimizations</li>
        </ol>
        
        <blockquote>
            User training and change management are critical success factors for any systems implementation. Allocate sufficient resources to ensure staff are comfortable and proficient with new tools.
        </blockquote>
        
        <div class="section-divider"></div>
        
        <h3>Conclusion</h3>
        <p>The proposed systems architecture provides a robust, secure, and scalable foundation for the VIA Foundation's operations. By implementing these recommendations, the foundation will benefit from:</p>
        
        <ul>
            <li>Improved efficiency through automation and integration</li>
            <li>Enhanced security and compliance capabilities</li>
            <li>Better data visibility and reporting</li>
            <li>Scalable infrastructure to support future growth</li>
            <li>Reduced manual effort and potential for human error</li>
        </ul>
        
        <p>Regular reviews and adjustments to the architecture will ensure it continues to meet the foundation's evolving needs.</p>
    `;
}

function generateDetailedSystemAnalysis() {
    return `
        <h2>Detailed System Analysis and Recommendations</h2>
        
        <h3>2.1 Data Management Strategy</h3>
        <p>A comprehensive approach to data collection, storage, and protection is essential for the VIA Foundation's operations:</p>
        
        <h4>Data Collection</h4>
        <ul>
            <li><strong>Standardized Forms:</strong> Implement consistent data collection forms across all systems</li>
            <li><strong>Data Validation:</strong> Enforce data quality at the point of entry</li>
            <li><strong>Metadata Management:</strong> Establish clear metadata standards for all collected information</li>
            <li><strong>Data Classification:</strong> Categorize data based on sensitivity and compliance requirements</li>
        </ul>
        
        <h4>Data Storage</h4>
        <ul>
            <li><strong>Cloud-Based Storage:</strong> Utilize Azure Blob Storage for documents and unstructured data</li>
            <li><strong>Database Storage:</strong> Structured data in appropriate database systems (SQL, NoSQL)</li>
            <li><strong>Redundancy:</strong> Implement geo-redundant storage for critical data</li>
            <li><strong>Archiving:</strong> Establish data lifecycle policies with appropriate archiving</li>
        </ul>
        
        <h4>Data Protection</h4>
        <ul>
            <li><strong>Encryption:</strong> Encrypt all sensitive data at rest and in transit</li>
            <li><strong>Access Control:</strong> Implement role-based access with least privilege principle</li>
            <li><strong>Backup Strategy:</strong> Daily incremental and weekly full backups with 30-day retention</li>
            <li><strong>Disaster Recovery:</strong> Establish recovery point objective (RPO) of 24 hours and recovery time objective (RTO) of 4 hours</li>
        </ul>
        
        <h3>2.2 IT Policies</h3>
        
        <h4>Security Standards</h4>
        <ul>
            <li><strong>Authentication:</strong> Multi-factor authentication required for all systems</li>
            <li><strong>Auditing:</strong> Regular security audits and vulnerability assessments</li>
            <li><strong>Encryption:</strong> AES-256 encryption for data at rest, TLS 1.2+ for data in transit</li>
            <li><strong>Patch Management:</strong> Monthly security patches for all systems</li>
        </ul>
        
        <h4>User Access Protocols</h4>
        <ul>
            <li><strong>Provisioning:</strong> Standardized user provisioning and deprovisioning process</li>
            <li><strong>Access Reviews:</strong> Quarterly access reviews for all systems</li>
            <li><strong>Privileged Access:</strong> Just-in-time privileged access with approval workflow</li>
            <li><strong>Password Policy:</strong> Complex passwords, 90-day rotation, password manager</li>
        </ul>
        
        <h4>Risk Management</h4>
        <ul>
            <li><strong>Risk Assessment:</strong> Annual comprehensive risk assessment</li>
            <li><strong>Incident Response:</strong> Documented incident response plan with regular testing</li>
            <li><strong>Business Continuity:</strong> Documented business continuity and disaster recovery plans</li>
            <li><strong>Vendor Risk:</strong> Vendor security assessment process for all technology providers</li>
        </ul>
        
        <h3>2.3 Grant Management System (Fluxx)</h3>
        <div class="table-responsive">
            <table class="comparison-table">
                <tr>
                    <th>Aspect</th>
                    <th>Details</th>
                </tr>
                <tr>
                    <td>Main Features</td>
                    <td>
                        <ul>
                            <li>Customizable grant application forms</li>
                            <li>Multi-stage review workflows</li>
                            <li>Robust reporting and analytics</li>
                            <li>Grantee portal for application submission and reporting</li>
                            <li>Document management</li>
                            <li>Payment tracking and scheduling</li>
                            <li>Automated notifications and reminders</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Pricing Structure</td>
                    <td>
                        <ul>
                            <li>Annual subscription based on foundation size and grant volume</li>
                            <li>Implementation services charged separately</li>
                            <li>Additional modules available at extra cost</li>
                            <li>Typical range: $40,000-$70,000 annually for mid-sized foundation</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Pros</td>
                    <td>
                        <ul>
                            <li>Highly configurable to match complex processes</li>
                            <li>Excellent for foundations with multiple programs</li>
                            <li>Strong reporting capabilities</li>
                            <li>Robust API for integrations</li>
                            <li>Regular updates and enhancements</li>
                            <li>Strong user community and knowledge sharing</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Cons</td>
                    <td>
                        <ul>
                            <li>Steeper learning curve than some alternatives</li>
                            <li>Higher implementation costs and timeline</li>
                            <li>Configuration complexity requires dedicated admin</li>
                            <li>May be more robust than needed for simple grantmaking</li>
                            <li>User interface can be overwhelming for occasional users</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Integration Capabilities</td>
                    <td>
                        <ul>
                            <li>Comprehensive REST API</li>
                            <li>Pre-built connectors for common systems (Salesforce, QuickBooks)</li>
                            <li>Support for SSO via SAML, OAuth</li>
                            <li>Custom webhook support</li>
                            <li>Data export in multiple formats</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Learning Curve</td>
                    <td>
                        <ul>
                            <li>Moderate to high for administrators</li>
                            <li>Moderate for regular users</li>
                            <li>Low to moderate for applicants/grantees</li>
                            <li>Comprehensive training recommended for all staff</li>
                            <li>Dedicated system administrator advisable</li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
        
        <h3>2.4 Database Management (Airtable Enterprise)</h3>
        <div class="table-responsive">
            <table class="comparison-table">
                <tr>
                    <th>Aspect</th>
                    <th>Details</th>
                </tr>
                <tr>
                    <td>Main Features</td>
                    <td>
                        <ul>
                            <li>Flexible database creation and management</li>
                            <li>Intuitive spreadsheet-like interface</li>
                            <li>Rich field types (attachments, long text, links)</li>
                            <li>Views (Grid, Calendar, Kanban, Gallery, Form)</li>
                            <li>Automation capabilities</li>
                            <li>Collaboration features</li>
                            <li>Revision history</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Pricing Structure</td>
                    <td>
                        <ul>
                            <li>Per-user monthly subscription ($45/user/month for Enterprise)</li>
                            <li>Annual billing discount available</li>
                            <li>Enterprise features include advanced security, admin controls</li>
                            <li>No separate implementation costs, but consulting may be needed</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Pros</td>
                    <td>
                        <ul>
                            <li>Extremely user-friendly interface</li>
                            <li>Rapid deployment and configuration</li>
                            <li>Flexible for changing requirements</li>
                            <li>Low code/no code automation</li>
                            <li>Strong collaboration features</li>
                            <li>Regular feature updates</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Cons</td>
                    <td>
                        <ul>
                            <li>Limited for very complex data relationships</li>
                            <li>Record limits may require careful planning</li>
                            <li>Less robust for transaction-heavy applications</li>
                            <li>Mobile experience more limited than desktop</li>
                            <li>Advanced reporting requires third-party tools</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Integration Capabilities</td>
                    <td>
                        <ul>
                            <li>REST API access</li>
                            <li>Native Zapier integration</li>
                            <li>Webhook support</li>
                            <li>CSV/Excel import/export</li>
                            <li>Integration with Microsoft 365 (limited)</li>
                            <li>Third-party sync tools available</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Learning Curve</td>
                    <td>
                        <ul>
                            <li>Low for basic usage</li>
                            <li>Moderate for advanced features and formulas</li>
                            <li>Minimal training required for most users</li>
                            <li>Self-service learning resources available</li>
                            <li>Admin training recommended for base design</li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    `;
}

function generateHardwareRecommendations() {
    return `
        <h2>Hardware Recommendations</h2>
        
        <h3>Minimum Staff Workstation Specifications</h3>
        <div class="table-responsive">
            <table class="comparison-table">
                <tr>
                    <th>Component</th>
                    <th>Minimum Specification</th>
                    <th>Recommended Specification</th>
                </tr>
                <tr>
                    <td>Processor</td>
                    <td>Intel Core i5 (10th gen or newer) or equivalent</td>
                    <td>Intel Core i7 (11th gen or newer) or equivalent</td>
                </tr>
                <tr>
                    <td>RAM</td>
                    <td>16GB</td>
                    <td>32GB</td>
                </tr>
                <tr>
                    <td>Storage</td>
                    <td>256GB SSD</td>
                    <td>512GB SSD</td>
                </tr>
                <tr>
                    <td>Display</td>
                    <td>24" Full HD (1920x1080)</td>
                    <td>27" QHD (2560x1440)</td>
                </tr>
                <tr>
                    <td>Graphics</td>
                    <td>Integrated graphics</td>
                    <td>Dedicated graphics (for design/video staff)</td>
                </tr>
                <tr>
                    <td>Operating System</td>
                    <td>Windows 10/11 Professional or macOS Monterey+</td>
                    <td>Windows 11 Professional or macOS Ventura+</td>
                </tr>
                <tr>
                    <td>Networking</td>
                    <td>Wi-Fi 6, Gigabit Ethernet</td>
                    <td>Wi-Fi 6E, Gigabit Ethernet</td>
                </tr>
            </table>
        </div>
        
        <h3>Recommended Additional Hardware</h3>
        <ul>
            <li><strong>Secondary Monitor:</strong> 24" Full HD monitor for increased productivity</li>
            <li><strong>Docking Station:</strong> USB-C/Thunderbolt docking station for laptop users</li>
            <li><strong>Webcam:</strong> 1080p webcam for virtual meetings (if not built into laptop)</li>
            <li><strong>Headset:</strong> Noise-cancelling headset with microphone for clear communication</li>
            <li><strong>External Keyboard and Mouse:</strong> Ergonomic options for staff comfort</li>
            <li><strong>UPS:</strong> Uninterruptible power supply for critical workstations</li>
        </ul>
        
        <h3>Mobile Device Recommendations</h3>
        <div class="table-responsive">
            <table class="comparison-table">
                <tr>
                    <th>Device Type</th>
                    <th>Recommended Specifications</th>
                    <th>Estimated Cost</th>
                </tr>
                <tr>
                    <td>Laptops</td>
                    <td>
                        <ul>
                            <li>Business-grade laptops (Dell Latitude, Lenovo ThinkPad, HP EliteBook, MacBook Pro)</li>
                            <li>Specifications as per workstation recommendations</li>
                            <li>Minimum 3-year warranty</li>
                        </ul>
                    </td>
                    <td>$1,200 - $2,500 per device</td>
                </tr>
                <tr>
                    <td>Tablets</td>
                    <td>
                        <ul>
                            <li>iPad Pro/Air or Microsoft Surface Pro</li>
                            <li>Minimum 128GB storage</li>
                            <li>Cellular connectivity option for field staff</li>
                        </ul>
                    </td>
                    <td>$600 - $1,200 per device</td>
                </tr>
                <tr>
                    <td>Smartphones</td>
                    <td>
                        <ul>
                            <li>iPhone 13/14 or Samsung Galaxy S22/S23</li>
                            <li>Minimum 128GB storage</li>
                            <li>Enterprise management compatibility</li>
                        </ul>
                    </td>
                    <td>$700 - $1,100 per device</td>
                </tr>
            </table>
        </div>
        
        <h3>Refresh Cycle Recommendations</h3>
        <ul>
            <li><strong>Laptops/Desktops:</strong> 3-4 year refresh cycle</li>
            <li><strong>Monitors:</strong> 5-6 year refresh cycle</li>
            <li><strong>Mobile Devices:</strong> 2-3 year refresh cycle</li>
            <li><strong>Peripherals:</strong> As needed based on wear and usage</li>
        </ul>
        
        <h3>Procurement Strategy</h3>
        <p>Recommended approach to hardware procurement:</p>
        <ul>
            <li>Standardize on 2-3 models per device category for easier support</li>
            <li>Implement a phased procurement plan aligned with the implementation strategy</li>
            <li>Consider leasing options for faster refresh cycles and predictable budgeting</li>
            <li>Prioritize business-grade devices with appropriate warranty and support</li>
            <li>Establish a spare equipment pool (5-10% of total) for quick replacements</li>
        </ul>
    `;
}

function generateSecurityStandards() {
    return `
        <h2>Security Standards and Compliance</h2>
        
        <h3>Required Security Measures</h3>
        
        <h4>Authentication and Access Control</h4>
        <ul>
            <li><strong>Multi-Factor Authentication (MFA):</strong> Required for all systems and users</li>
            <li><strong>Single Sign-On (SSO):</strong> Implement across all supported applications</li>
            <li><strong>Role-Based Access Control:</strong> Implement least privilege principle</li>
            <li><strong>Privileged Access Management:</strong> Just-in-time access for administrative functions</li>
            <li><strong>Password Policy:</strong> Minimum 12 characters, complexity requirements, 90-day rotation</li>
        </ul>
        
        <h4>Data Protection</h4>
        <ul>
            <li><strong>Encryption at Rest:</strong> AES-256 encryption for all sensitive data</li>
            <li><strong>Encryption in Transit:</strong> TLS 1.2+ for all data transmissions</li>
            <li><strong>Data Classification:</strong> Implement data classification scheme (Public, Internal, Confidential, Restricted)</li>
            <li><strong>Data Loss Prevention:</strong> Implement controls to prevent unauthorized data exfiltration</li>
            <li><strong>Secure Disposal:</strong> Secure data wiping procedures for decommissioned equipment</li>
        </ul>
        
        <h4>Network Security</h4>
        <ul>
            <li><strong>Firewall Protection:</strong> Next-generation firewall with intrusion prevention</li>
            <li><strong>Network Segmentation:</strong> Separate networks for different security zones</li>
            <li><strong>VPN Access:</strong> Secure remote access via VPN with MFA</li>
            <li><strong>Wireless Security:</strong> WPA3 encryption, separate guest network</li>
            <li><strong>Monitoring:</strong> Network traffic monitoring and anomaly detection</li>
        </ul>
        
        <h4>Endpoint Security</h4>
        <ul>
            <li><strong>Endpoint Protection:</strong> Advanced anti-malware with behavioral analysis</li>
            <li><strong>Patch Management:</strong> Automated patching for operating systems and applications</li>
            <li><strong>Disk Encryption:</strong> Full-disk encryption for all endpoints</li>
            <li><strong>Mobile Device Management:</strong> MDM solution for all organization-owned devices</li>
            <li><strong>Application Control:</strong> Whitelist approach for application execution</li>
        </ul>
        
        <h3>Compliance Requirements</h3>
        
        <h4>General Data Protection Regulation (GDPR)</h4>
        <ul>
            <li><strong>Data Subject Rights:</strong> Processes to handle access, rectification, erasure requests</li>
            <li><strong>Consent Management:</strong> Clear consent mechanisms for data collection</li>
            <li><strong>Data Processing Records:</strong> Maintain records of all data processing activities</li>
            <li><strong>Data Protection Impact Assessments:</strong> Conduct for high-risk processing</li>
            <li><strong>Breach Notification:</strong> Process to notify authorities within 72 hours</li>
        </ul>
        
        <h4>California Consumer Privacy Act (CCPA)</h4>
        <ul>
            <li><strong>Consumer Rights:</strong> Processes to handle access and deletion requests</li>
            <li><strong>Privacy Notices:</strong> Clear notices about data collection and use</li>
            <li><strong>Opt-Out Mechanisms:</strong> Allow consumers to opt out of data sales</li>
            <li><strong>Service Provider Agreements:</strong> Ensure proper data handling by vendors</li>
        </ul>
        
        <h4>Payment Card Industry Data Security Standard (PCI DSS)</h4>
        <ul>
            <li><strong>Cardholder Data Protection:</strong> Secure storage and transmission</li>
            <li><strong>Vulnerability Management:</strong> Regular scanning and testing</li>
            <li><strong>Access Control:</strong> Strict access controls to cardholder data</li>
            <li><strong>Network Monitoring:</strong> Continuous monitoring and logging</li>
            <li><strong>Security Policy:</strong> Documented security policy for payment processing</li>
        </ul>
        
        <h4>Industry Standards</h4>
        <ul>
            <li><strong>SOC 2 Type II:</strong> Required for all cloud service providers</li>
            <li><strong>NIST Cybersecurity Framework:</strong> Basis for security program</li>
            <li><strong>ISO 27001:</strong> Preferred for key service providers</li>
            <li><strong>HIPAA:</strong> If handling health information</li>
        </ul>
        
        <h3>Security Governance</h3>
        
        <h4>Policies and Procedures</h4>
        <ul>
            <li><strong>Information Security Policy:</strong> Overarching security policy</li>
            <li><strong>Acceptable Use Policy:</strong> Guidelines for appropriate system use</li>
            <li><strong>Incident Response Plan:</strong> Procedures for security incidents</li>
            <li><strong>Business Continuity Plan:</strong> Procedures for disaster recovery</li>
            <li><strong>Change Management Policy:</strong> Process for system changes</li>
        </ul>
        
        <h4>Security Assessments</h4>
        <ul>
            <li><strong>Vulnerability Assessments:</strong> Monthly automated scans</li>
            <li><strong>Penetration Testing:</strong> Annual third-party testing</li>
            <li><strong>Security Audits:</strong> Annual comprehensive security audit</li>
            <li><strong>Vendor Security Assessments:</strong> Before engagement and annually</li>
        </ul>
    `;
}

function generateSLARequirements() {
    return `
        <h2>Service Level Agreements (SLA) Requirements</h2>
        
        <h3>Minimum SLA Requirements by Service</h3>
        <div class="table-responsive">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Minimum Uptime</th>
                        <th>Maximum Resolution Time</th>
                        <th>Support Hours</th>
                        <th>Performance Metrics</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Grant Management System</td>
                        <td>99.9% (8.76 hours downtime/year)</td>
                        <td>
                            <ul>
                                <li>Critical: 4 hours</li>
                                <li>High: 8 hours</li>
                                <li>Medium: 24 hours</li>
                                <li>Low: 72 hours</li>
                            </ul>
                        </td>
                        <td>24/7 for critical issues<br>Business hours for others</td>
                        <td>
                            <ul>
                                <li>Page load: < 3 seconds</li>
                                <li>Report generation: < 30 seconds</li>
                                <li>Search response: < 5 seconds</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>Cloud Infrastructure</td>
                        <td>99.95% (4.38 hours downtime/year)</td>
                        <td>
                            <ul>
                                <li>Critical: 2 hours</li>
                                <li>High: 4 hours</li>
                                <li>Medium: 12 hours</li>
                                <li>Low: 48 hours</li>
                            </ul>
                        </td>
                        <td>24/7 for all severity levels</td>
                        <td>
                            <ul>
                                <li>Storage access: < 100ms</li>
                                <li>VM provisioning: < 10 minutes</li>
                                <li>Network latency: < 50ms</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>Email & Productivity</td>
                        <td>99.9% (8.76 hours downtime/year)</td>
                        <td>
                            <ul>
                                <li>Critical: 4 hours</li>
                                <li>High: 8 hours</li>
                                <li>Medium: 24 hours</li>
                                <li>Low: 72 hours</li>
                            </ul>
                        </td>
                        <td>24/7 for critical issues<br>Business hours for others</td>
                        <td>
                            <ul>
                                <li>Email delivery: < 5 minutes</li>
                                <li>Document sync: < 5 minutes</li>
                                <li>Application load: < 3 seconds</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>Database Management</td>
                        <td>99.9% (8.76 hours downtime/year)</td>
                        <td>
                            <ul>
                                <li>Critical: 4 hours</li>
                                <li>High: 8 hours</li>
                                <li>Medium: 24 hours</li>
                                <li>Low: 72 hours</li>
                            </ul>
                        </td>
                        <td>Business hours with after-hours for critical</td>
                        <td>
                            <ul>
                                <li>Query response: < 3 seconds</li>
                                <li>Data sync: < 15 minutes</li>
                                <li>API response: < 1 second</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>Financial Management</td>
                        <td>99.9% (8.76 hours downtime/year)</td>
                        <td>
                            <ul>
                                <li>Critical: 4 hours</li>
                                <li>High: 8 hours</li>
                                <li>Medium: 24 hours</li>
                                <li>Low: 72 hours</li>
                            </ul>
                        </td>
                        <td>Business hours with after-hours for critical</td>
                        <td>
                            <ul>
                                <li>Transaction processing: < 1 minute</li>
                                <li>Report generation: < 1 minute</li>
                                <li>System response: < 3 seconds</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <h3>SLA Monitoring and Enforcement</h3>
        
        <h4>Monitoring Mechanisms</h4>
        <ul>
            <li><strong>Automated Monitoring:</strong> Implement monitoring tools to track uptime, performance, and response times</li>
            <li><strong>Status Dashboards:</strong> Access to vendor status dashboards for real-time service status</li>
            <li><strong>Incident Notifications:</strong> Immediate notifications for service disruptions</li>
            <li><strong>Performance Reporting:</strong> Monthly reports on SLA compliance</li>
        </ul>
        
        <h4>Enforcement Mechanisms</h4>
        <ul>
            <li><strong>Service Credits:</strong> Financial credits for SLA violations (typically 10-30% of monthly fee)</li>
            <li><strong>Escalation Procedures:</strong> Documented escalation path for unresolved issues</li>
            <li><strong>Termination Rights:</strong> Right to terminate for persistent SLA failures</li>
            <li><strong>Regular Service Reviews:</strong> Quarterly service review meetings with vendors</li>
        </ul>
        
        <h4>SLA Documentation Requirements</h4>
        <ul>
            <li><strong>Clear Definitions:</strong> Precise definitions of service levels and how they're measured</li>
            <li><strong>Measurement Methodology:</strong> Detailed explanation of how metrics are calculated</li>
            <li><strong>Exclusions:</strong> Clear definition of what constitutes excluded downtime (e.g., scheduled maintenance)</li>
            <li><strong>Reporting Cadence:</strong> Frequency and format of SLA reporting</li>
            <li><strong>Remediation Process:</strong> Process for addressing SLA violations</li>
        </ul>
        
        <h3>Disaster Recovery Requirements</h3>
        
        <h4>Recovery Objectives</h4>
        <ul>
            <li><strong>Recovery Time Objective (RTO):</strong> Maximum acceptable time to restore service</li>
            <ul>
                <li>Critical systems: 4 hours</li>
                <li>Important systems: 12 hours</li>
                <li>Non-critical systems: 24 hours</li>
            </ul>
            <li><strong>Recovery Point Objective (RPO):</strong> Maximum acceptable data loss</li>
            <ul>
                <li>Critical systems: 15 minutes</li>
                <li>Important systems: 4 hours</li>
                <li>Non-critical systems: 24 hours</li>
            </ul>
        </ul>
        
        <h4>Disaster Recovery Testing</h4>
        <ul>
            <li><strong>Testing Frequency:</strong> Annual full DR test, quarterly tabletop exercises</li>
            <li><strong>Test Documentation:</strong> Detailed documentation of test results and remediation</li>
            <li><strong>Vendor Participation:</strong> Key vendors must participate in DR testing</li>
        </ul>
    `;
}

function generateImplementationStrategy() {
    return `
        <h2>Complete Implementation Strategy</h2>
        
        <h3>Phased Implementation Plan</h3>
        
        <h4>Phase 1: Foundation (Months 1-3)</h4>
        <ul>
            <li>Cloud infrastructure setup</li>
            <li>Microsoft 365 deployment</li>
            <li>Security policies implementation</li>
            <li>Hardware procurement</li>
        </ul>
        
        <h4>Phase 2: Core Systems (Months 4-6)</h4>
        <ul>
            <li>Grant management system selection and initial setup</li>
            <li>Database management implementation</li>
            <li>Financial system integration</li>
            <li>Initial staff training</li>
        </ul>
        
        <h4>Phase 3: Integration (Months 7-9)</h4>
        <ul>
            <li>System integrations</li>
            <li>Workflow automation</li>
            <li>Advanced training</li>
            <li>Data migration completion</li>
        </ul>
        
        <h4>Phase 4: Optimization (Months 10-12)</h4>
        <ul>
            <li>Performance optimization</li>
            <li>Advanced reporting setup</li>
            <li>Process refinement</li>
            <li>Final training and documentation</li>
        </ul>
    `;
}

function generateBudgetOverview() {
    return `
        <h2>Complete Budget Overview</h2>
        
        <h3>Technology Budget Overview</h3>
        <div class="table-responsive">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Year 1 Cost</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cloud Infrastructure</td>
                        <td>$20,000</td>
                        <td>Azure services, storage, compute</td>
                    </tr>
                    <tr>
                        <td>Productivity Suite</td>
                        <td>$13,200</td>
                        <td>Based on 50 users at $22/month</td>
                    </tr>
                    <tr>
                        <td>Grant Management System</td>
                        <td>$60,000</td>
                        <td>Includes implementation services</td>
                    </tr>
                    <tr>
                        <td>Database Management</td>
                        <td>$16,200</td>
                        <td>Based on 30 users at $45/month</td>
                    </tr>
                    <tr>
                        <td>Financial Management</td>
                        <td>$1,740</td>
                        <td>Annual subscription</td>
                    </tr>
                    <tr>
                        <td>Hardware</td>
                        <td>$25,000</td>
                        <td>Workstations, peripherals</td>
                    </tr>
                    <tr>
                        <td>Implementation Services</td>
                        <td>$40,000</td>
                        <td>Consulting, configuration, training</td>
                    </tr>
                    <tr>
                        <td>Security & Compliance</td>
                        <td>$15,000</td>
                        <td>Security tools, audits, training</td>
                    </tr>
                    <tr>
                        <td>Contingency (10%)</td>
                        <td>$19,114</td>
                        <td>For unexpected costs</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>$210,254</strong></td>
                        <td>Year 1 total investment</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function generateRiskManagement() {
    return `
        <h2>Complete Risk Management Plan</h2>
        
        <h3>Identified Risks and Mitigation Strategies</h3>
        
        <h4>Data Security Risks</h4>
        <ul>
            <li><strong>Risk:</strong> Unauthorized data access<br>
                <strong>Mitigation:</strong> Role-based access control, encryption, security audits</li>
            <li><strong>Risk:</strong> Data loss<br>
                <strong>Mitigation:</strong> Regular backups, geo-redundant storage, disaster recovery plan</li>
        </ul>
        
        <h4>System Integration Risks</h4>
        <ul>
            <li><strong>Risk:</strong> Integration failure between systems<br>
                <strong>Mitigation:</strong> Thorough testing, phased approach, vendor guarantees</li>
            <li><strong>Risk:</strong> Data synchronization issues<br>
                <strong>Mitigation:</strong> Automated monitoring, clear data ownership policies</li>
        </ul>
        
        <h4>User Adoption Risks</h4>
        <ul>
            <li><strong>Risk:</strong> Staff resistance to new systems<br>
                <strong>Mitigation:</strong> Comprehensive training, super-user program, clear communication</li>
            <li><strong>Risk:</strong> Workflow disruption<br>
                <strong>Mitigation:</strong> Phased implementation, adequate testing, feedback mechanisms</li>
        </ul>
    `;
} 