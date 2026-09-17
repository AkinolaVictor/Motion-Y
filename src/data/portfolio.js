// portfolio.js — data for the portfolio section.
// Categories: All, AI Agents, Automations, AI Softwares, Integrations, Consulting, Others

export const PORTFOLIO_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "ai-agents", label: "AI Agents" },
  { key: "automations", label: "Automations" },
  { key: "ai-softwares", label: "AI Softwares" },
  { key: "integrations", label: "Integrations" },
  { key: "consulting", label: "Consulting" },
  { key: "others", label: "Others" },
];

export const PORTFOLIO_PROJECTS = [
  {
    slug: "chivita-chatbot",
    company: "Chivita",
    title: "Omnichannel Support Bot",
    description: "AI chatbot for website and phone support, automating 70% of first-level customer inquiries.",
    category: "ai-softwares",
    logo: "chat",
    year: "2024",
    metrics: "70% automation rate",
    tags: ["LLM", "Voice AI", "Customer Support"],
    details: {
      challenge: "Chivita faced an overwhelming surge of repetitive customer inquiries across multiple channels, leading to extreme agent burnout and frustratingly long wait times. The lack of a centralized knowledge base meant that customers often received inconsistent answers depending on whether they called or emailed, severely damaging brand trust and operational efficiency during peak promotional seasons where query volume spiked by over three hundred percent.",
      solution: {
        paragraph: "We engineered a sophisticated RAG-powered intelligence layer that acted as the primary interface for all incoming customer queries. By indexing thousands of internal product manuals and support docs into a vector database, the system could synthesize accurate, brand-aligned responses in milliseconds. We integrated this layer into both terms of web-chat and telephony systems, ensuring a unified voice and a seamless transition to human agents for high-complexity issues.",
        list: [
          "Deployed a high-performance vector database to enable millisecond retrieval of relevant product documentation and support protocols.",
          "Engineered custom prompt chains to ensure the AI maintained a professional, empathetic, and brand-consistent tone across channels.",
          "Implemented an intelligent routing system that detects sentiment and escalates critical issues to human agents in real-time.",
          "Built a real-time sync pipeline that automatically updates the AI's knowledge base whenever product specs are modified.",
          "Integrated voice-to-text and text-to-voice layers to provide a natural conversational experience for telephony-based support queries."
        ]
      },
      result: [
        "Reduced the average initial response time from four hours to under two seconds across all primary support channels.",
        "Successfully automated seventy percent of first-level inquiries, allowing human agents to focus exclusively on high-value customer cases.",
        "Increased the overall customer satisfaction score by twenty-five percent through consistent and immediate resolution of common problems.",
        "Eliminated the inconsistency in support answers, ensuring a single source of truth for all customer-facing communications.",
        "Reduced the cost per support ticket by forty percent by minimizing the need for human intervention in routine tasks."
      ]
    }
  },
  {
    slug: "logi-flow",
    company: "LogiFlow",
    title: "Agentic Supply Chain",
    description: "Autonomous agents that manage inventory levels and trigger re-orders based on predictive demand.",
    category: "ai-agents",
    logo: "agent",
    year: "2025",
    metrics: "15% waste reduction",
    tags: ["Autonomous Agents", "Predictive AI", "Logistics"],
    details: {
      challenge: "LogiFlow struggled with extreme volatility in global supply chains, leading to frequent stock-outs of critical items and costly over-stocking of others. Their manual tracking system relied on outdated spreadsheets that lagged by forty-eight hours, making it impossible to react to real-time demand spikes or sudden supplier delays, which ultimately eroded their profit margins and damaged long-term client relationships.",
      solution: {
        paragraph: "We developed a decentralized multi-agent system where specialized AI agents managed different segments of the supply chain. These agents operated in continuous loops: observing real-time sales data, predicting future demand using time-series models, and autonomously communicating with supplier APIs to adjust order volumes. This transformed a reactive process into a predictive, autonomous operation with built-in human oversight for high-value procurement.",
        list: [
          "Built a predictive demand engine using transformer models to forecast inventory needs with ninety-five percent accuracy.",
          "Developed 'Negotiator Agents' capable of autonomously querying multiple supplier APIs to find the best price and lead time.",
          "Implemented an event-driven architecture that triggers immediate re-orders when inventory drops below a dynamically calculated safety threshold.",
          "Created a comprehensive observability dashboard allowing managers to audit agent trajectories and override autonomous decisions when necessary.",
          "Integrated real-time weather and geopolitical data feeds to proactively adjust supply chain routes and order volumes."
        ]
      },
      result: [
        "Optimized inventory turnover and reduced overall warehousing costs by fifteen percent through precision-driven autonomous ordering systems.",
        "Achieved zero stock-outs for the top fifty high-demand items over a six-month period of extreme market volatility.",
        "Reduced the average procurement cycle time by forty percent by eliminating manual approval bottlenecks and spreadsheet errors.",
        "Lowered operational overhead by automating eighty percent of the routine communication between warehouse managers and external suppliers.",
        "Increased overall supply chain resilience, allowing the company to pivot sourcing strategies in hours instead of weeks."
      ]
    }
  },
  {
    slug: "fintech-automate",
    company: "NeoBank",
    title: "KYC Automation Pipeline",
    description: "Automated identity verification and risk scoring using vision AI and document parsing.",
    category: "automations",
    logo: "app",
    year: "2024",
    metrics: "Onboarding in < 2 mins",
    tags: ["Computer Vision", "OCR", "Compliance"],
    details: {
      challenge: "NeoBank's manual KYC process was a major bottleneck, taking up to forty-eight hours to verify a single user. This friction led to a massive drop-off rate during the onboarding phase, as modern users expected instant account activation. Furthermore, the manual review process was plagued by human error and inconsistency, creating significant compliance risks and potential regulatory vulnerabilities.",
      solution: {
        paragraph: "We architected an end-to-end automated verification pipeline that leveraged state-of-the-art Computer Vision and OCR. The system automatically captures, crops, and analyzes government IDs, matching them against live selfie captures using facial biometric analysis. This was coupled with a real-time risk scoring engine that queried global sanctions lists and fraud databases to provide an instant 'Go/No-Go' decision for new applicants.",
        list: [
          "Deployed a custom-trained vision model to detect forged documents and identify manipulated images in uploaded identity files.",
          "Integrated high-speed API bridges to government databases for instant verification of ID numbers and expiration dates.",
          "Built an automated risk-scoring matrix that flags suspicious patterns for priority human review based on behavioral markers.",
          "Implemented an asynchronous processing queue to handle spikes in user signups without degrading the frontend experience.",
          "Created a secure, encrypted vault for storing biometric embeddings in compliance with global data privacy regulations."
        ]
      },
      result: [
        "Reduced the total onboarding time from an average of twenty-four hours to under two minutes per new user.",
        "Decreased the manual review workload for the compliance team by eighty-five percent through high-accuracy automated filtering.",
        "Increased the overall successful account opening rate by thirty percent by removing friction from the signup process.",
        "Eliminated human error in document verification, resulting in a zero-defect rate for identity checks during audits.",
        "Reduced the cost of acquiring a verified customer by forty percent by automating the identity verification workflow."
      ]
    }
  },
  {
    slug: "health-sync",
    company: "HealthSync",
    title: "EMR Integration Hub",
    description: "Seamless AI integration between legacy medical records and modern diagnostic tools.",
    category: "integrations",
    logo: "dev",
    year: "2025",
    metrics: "99.9% data accuracy",
    tags: ["API", "Healthcare AI", "Data Pipeline"],
    details: {
      challenge: "HealthSync dealt with fragmented patient data trapped in incompatible legacy electronic medical record (EMR) systems. Doctors were spending nearly a third of their time manually searching for historical records across different silos, which not only reduced patient throughput but also increased the risk of critical diagnostic errors due to missing or outdated information available at the point of care.",
      solution: {
        paragraph: "We developed a semantic middleware layer that functioned as a universal translator for medical data. By using LLMs to normalize disparate data formats into a unified, AI-readable schema, we created a secure integration hub. This hub bridged the gap between old SQL databases and modern vector stores, allowing clinicians to query patient histories using natural language rather than complex database filters.",
        list: [
          "Built HIPAA-compliant API bridges that securely tunnel data from legacy on-premise servers to a secure cloud environment.",
          "Implemented a semantic mapping engine that translates various medical codes into a single, standardized clinical terminology.",
          "Deployed a natural language interface allowing doctors to ask complex questions about patient history and get synthesized answers.",
          "Created a real-time data synchronization pipeline that ensures patient records are updated across all clinics instantly.",
          "Integrated a validation layer that flags contradictory medical data for manual clinical review to ensure patient safety."
        ]
      },
      result: [
        "Enabled real-time diagnostic insights for doctors across five different clinic locations through a single, unified data interface.",
        "Reduced the average time spent on administrative record searches by sixty percent, increasing daily patient capacity.",
        "Achieved a verified ninety-nine point nine percent data accuracy rate across merged records from multiple legacy systems.",
        "Reduced the occurrence of duplicate medical tests by twenty percent by providing a clear, unified patient history.",
        "Improved the speed of critical care decision-making by providing instant access to normalized patient data and history."
      ]
    }
  },
  {
    slug: "retail-strategy",
    company: "Global Retail",
    title: "AI Transformation Roadmap",
    description: "Strategic consulting to implement AI across marketing, sales, and operational workflows.",
    category: "consulting",
    logo: "biz",
    year: "2024",
    metrics: "20% OpEx reduction",
    tags: ["Strategy", "Roadmapping", "AI Audit"],
    details: {
      challenge: "Global Retail had invested heavily in fragmented AI tools but lacked a cohesive strategy, resulting in significant wasted expenditure and internal friction. Middle management resisted automation due to fears of job loss, and there were no clear KPIs to measure the ROI of their AI initiatives, leaving the company in a state of 'AI experimentation' without actual business value.",
      solution: {
        paragraph: "We conducted a comprehensive AI audit across all departments to identify high-leverage 'AI-shaped' problems. Instead of a tool-first approach, we developed a three-year strategic roadmap focused on business outcomes. This included the creation of an internal 'Center of Excellence' to train staff on AI augmentation, shifting the narrative from 'replacement' to 'empowerment' to reduce internal friction.",
        list: [
          "Performed a detailed gap analysis of existing toolsets to identify redundancies and eliminate unnecessary software subscriptions.",
          "Developed a phased implementation plan that prioritized low-hanging fruit with high ROI to prove value quickly.",
          "Created a set of standardized KPIs to measure the impact of AI on operational efficiency and revenue.",
          "Facilitated workshops with department heads to align AI goals with overall corporate business objectives and growth targets.",
          "Designed a governance framework to ensure ethical AI use and maintain data privacy across all implemented solutions."
        ]
      },
      result: [
        "Identified and eliminated redundant software tools, reducing overall operational expenditure by twenty percent in one year.",
        "Successfully deployed four high-impact AI pilots in the first six months, proving the roadmap's viability to stakeholders.",
        "Increased the internal AI adoption rate from twelve percent to sixty-five percent through targeted training and support.",
        "Established a clear, data-driven path for AI scaling, reducing the time to deploy new AI tools by half.",
        "Improved overall employee productivity by twenty percent through the automation of routine administrative and reporting tasks."
      ]
    }
  },
  {
    slug: "creative-engine",
    company: "AdVenture",
    title: "Brand Voice Generator",
    description: "AI system that converts a single brand guide into 1,000s of personalized ad variations.",
    category: "others",
    logo: "mkt",
    year: "2025",
    metrics: "10x content speed",
    tags: ["GenAI", "Marketing", "Content Ops"],
    details: {
      challenge: "AdVenture struggled to scale personalized content for fifty different target personas without diluting their core brand voice. The manual process of writing unique ad copy for every segment was prohibitively slow and expensive, and quality varied wildly between different writers, leading to inconsistent campaign performance and delayed launch cycles for critical product releases.",
      solution: {
        paragraph: "We built a custom generation engine that treated the brand guide as a set of hard constraints. Using a technique called 'Constrained Few-Shot Prompting', the AI was trained on the brand's best-performing historical content to clone its unique DNA. This was integrated into a production pipeline where a single core message could be automatically expanded into thousands of persona-specific variations.",
        list: [
          "Developed a brand-voice embedding system that ensures all generated content adheres to strict tonal and stylistic guidelines.",
          "Implemented a human-in-the-loop feedback system where editor corrections automatically refine the model's future output.",
          "Built an automated distribution layer that pushes generated content directly to Facebook and Google ad managers.",
          "Integrated a real-time performance loop that adjusts copy based on actual click-through rates from live campaigns.",
          "Created a multi-modal pipeline to generate matching visual prompts for images that align with the generated copy."
        ]
      },
      result: [
        "Increased the total volume of high-quality ad output by ten times while maintaining absolute brand consistency.",
        "Reduced the campaign launch cycle from two weeks to under forty-eight hours for all targeted personas.",
        "Improved the average click-through rate by eighteen percent through hyper-personalization of the marketing messaging.",
        "Decreased the cost of content production by sixty percent by automating the first-draft generation process.",
        "Enabled the agency to scale from ten to fifty active clients without increasing their creative headcount."
      ]
    }
  },
  {
    slug: "secure-auth",
    company: "SafePass",
    title: "Biometric AI Security",
    description: "Intelligent authentication system using behavioral patterns to detect fraud in real-time.",
    category: "ai-softwares",
    logo: "shield",
    year: "2025",
    metrics: "Zero false negatives",
    tags: ["Cybersecurity", "Behavioral AI", "Fraud Detection"],
    details: {
      challenge: "SafePass found that traditional passwords and even multi-factor authentication were being bypassed by sophisticated phishing and session-hijacking attacks. The current security measures were either too weak to stop professional attackers or too intrusive for legitimate users, creating a constant tension between security and user experience that led to increased customer churn.",
      solution: {
        paragraph: "We implemented a passive behavioral AI layer that monitors how users interact with their devices. Instead of relying on a single password, the system analyzes typing cadence, mouse movement patterns, and navigation habits to create a unique behavioral biometric profile. This profile is used to continuously verify the user's identity in the background without requiring any active input.",
        list: [
          "Developed a low-latency inference engine that analyzes behavioral markers in real-time without impacting app performance.",
          "Built a risk-scoring matrix that triggers step-up authentication only when a significant behavioral anomaly is detected.",
          "Implemented a secure enclave for storing biometric embeddings to prevent theft or reverse-engineering of profiles.",
          "Integrated the system with existing OAuth flows to provide a seamless 'zero-friction' login experience for users.",
          "Created an admin dashboard for security teams to monitor fraud attempts and refine behavioral detection rules."
        ]
      },
      result: [
        "Blocked ninety-nine point nine percent of unauthorized access attempts without adding any friction to the user.",
        "Reduced fraud-related financial losses by two million dollars in the first twelve months of deployment.",
        "Improved the average user login speed by thirty percent for verified users through passive authentication.",
        "Achieved zero false negatives in identity verification during a rigorous six-month internal security audit.",
        "Increased overall user retention by twelve percent by removing the annoyance of frequent manual MFA prompts."
      ]
    }
  },
  {
    slug: "agro-bot",
    company: "AgroSmart",
    title: "Crop Health Agent",
    description: "Field agents that analyze satellite imagery to trigger precise irrigation and fertilization.",
    category: "ai-agents",
    logo: "leaf",
    year: "2024",
    metrics: "30% water saving",
    tags: ["Satellite AI", "AgriTech", "Precision Farming"],
    details: {
      challenge: "AgroSmart's traditional approach to farming relied on uniform irrigation and fertilization across entire fields, which wasted massive amounts of water and led to uneven crop growth. Detecting pest outbreaks was a manual, labor-intensive process that often happened too late to prevent significant yield loss, resulting in unpredictable harvests and high operational costs.",
      solution: {
        paragraph: "We built a multi-modal agentic system that fused high-resolution satellite imagery with real-time ground sensor data. The AI agent acted as a virtual agronomist, analyzing spectral signatures to detect early signs of stress or disease. Once a problem was identified, the agent autonomously triggered precision irrigation valves and fertilization drones to treat only the affected areas.",
        list: [
          "Deployed a computer vision model trained on thousands of satellite images to detect early-stage crop stress.",
          "Implemented an autonomous control loop that interfaces directly with IoT-enabled irrigation and fertilization hardware.",
          "Built a real-time alert system that notifies farmers of precise 'hotspots' via a mobile dashboard.",
          "Integrated a weather-prediction layer to optimize the timing of water and nutrient application for maximum absorption.",
          "Created a historical yield analysis tool that uses AI to recommend better crop rotations for next season."
        ]
      },
      result: [
        "Reduced overall water usage by thirty percent while simultaneously increasing the average yield per acre.",
        "Detected critical pest outbreaks ten days earlier than manual inspection, saving twenty percent of the harvest.",
        "Lowered chemical fertilizer costs by twenty percent through precision application based on actual soil needs.",
        "Reduced the manual labor required for field monitoring by eighty percent through autonomous satellite analysis.",
        "Increased the overall profit margin per acre by fifteen percent through optimized input costs and higher yields."
      ]
    }
  }
];
