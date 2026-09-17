// Services Data — used by /services/[slug]
// Maps slugs to detailed content for each service offering.

export const SERVICES = {
  ai_agents: {
    title: "AI Agents Development",
    slug: "ai_agents",
    glyph: "agent",
    description: "Systems that reason, plan, call tools, and complete multi-step work without hand-holding.",
    lead: "Moving beyond simple prompts to autonomous systems that act on your behalf.",
    sections: {
      breakdown: {
        title: "The Agentic Shift",
        text: "Most AI implementations are 'one-shot'—you ask, it answers. Agentic systems are different. They operate in loops: observing the state, planning a sequence of actions, executing them via tools, and refining the result based on feedback. This enables the automation of complex, non-linear workflows that previously required human oversight.",
        points: [
          "Multi-step reasoning & Planning",
          "Tool-use & External API orchestration",
          "Self-correction & Error recovery",
          "Long-term memory & State management"
        ]
      },
      features: [
        {
          title: "Autonomous Workflows",
          description: "Agents that can navigate your software stack to fulfill complex requests, from lead research to ticket resolution.",
          icon: "cpu"
        },
        {
          title: "Human-in-the-Loop",
          description: "Sophisticated checkpoints where agents pause for human approval, ensuring safety and accuracy in critical tasks.",
          icon: "user"
        },
        {
          title: "Custom Tooling",
          description: "We build the specific functions and APIs your agents need to actually 'do' work in your unique environment.",
          icon: "wrench"
        },
        {
          title: "Evaluation Frameworks",
          description: "Rigorous testing of agent trajectories to ensure reliability and predictability in production.",
          icon: "check"
        }
      ]
    }
  },
  automation: {
    title: "Process Automation",
    slug: "automation",
    glyph: "app",
    description: "End-to-end automation solutions that streamline operations and reduce manual work by up to 80%",
    lead: "Eliminating the friction of manual data entry and repetitive operational tasks.",
    sections: {
      breakdown: {
        title: "Deterministic meets Stochastic",
        text: "True automation isn't just about LLMs; it's about blending the creative power of AI with the reliability of deterministic code. We build 'hybrid pipelines' where AI handles the unstructured data (emails, docs, chats) and hard-coded logic handles the business rules and database updates.",
        points: [
          "Zero-touch data pipelines",
          "Complex event-driven triggers",
          "Legacy system bridging",
          "Operational bottleneck analysis"
        ]
      },
      features: [
        {
          title: "Workflow Mapping",
          description: "We audit your current manual processes to identify the highest-leverage points for automation.",
          icon: "map"
        },
        {
          title: "API Orchestration",
          description: "Connecting disparate SaaS tools into a single, cohesive automated stream using Zapier, Make, or custom middleware.",
          icon: "link"
        },
        {
          title: "Data Extraction",
          description: "Using LLMs to transform messy, unstructured inputs into clean, structured data for your CRM or ERP.",
          icon: "database"
        },
        {
          title: "Error Handling",
          description: "Robust monitoring systems that alert you only when an automation fails and requires human intervention.",
          icon: "alert"
        }
      ]
    }
  },
  i_softwares: {
    title: "Intelligent Softwares",
    slug: "i_softwares",
    glyph: "rag",
    description: "Smart softwares built to solve complex problems and deliver smarter digital experiences.",
    lead: "Building the next generation of software where AI is the core, not just a feature.",
    sections: {
      breakdown: {
        title: "AI-Native Architecture",
        text: "Adding a chatbot to a website isn't 'intelligent software'. We build applications from the ground up around AI capabilities. This means using vector databases for memory, semantic search for navigation, and LLMs for dynamic interface generation.",
        points: [
          "RAG (Retrieval Augmented Generation)",
          "Semantic search & Discovery",
          "Context-aware interfaces",
          "Dynamic content synthesis"
        ]
      },
      features: [
        {
          title: "Knowledge Bases",
          description: "Transforming your internal documentation into a living, queryable intelligence layer.",
          icon: "book"
        },
        {
          title: "Predictive UX",
          description: "Interfaces that anticipate user needs based on context and historical behavior.",
          icon: "eye"
        },
        {
          title: "Custom LLM Fine-tuning",
          description: "Optimizing models for your specific industry jargon and output requirements.",
          icon: "zap"
        },
        {
          title: "Multi-modal Input",
          description: "Software that understands text, images, and voice seamlessly in a single workflow.",
          icon: "mic"
        }
      ]
    }
  },
  integrations: {
    title: "API & Integration",
    slug: "integrations",
    glyph: "dev",
    description: "Seamless integration of AI capabilities into your existing systems and workflows",
    lead: "Connecting your current stack to the frontier of AI without breaking what already works.",
    sections: {
      breakdown: {
        title: "Bridging the Gap",
        text: "The biggest hurdle to AI adoption is the 'silo' problem. Your data is in one place, and the AI is in another. We build the secure, high-performance bridges that allow AI to read and write to your systems in real-time, maintaining strict security and data integrity.",
        points: [
          "Custom API development",
          "Middleware architecture",
          "Secure data tunneling",
          "Webhooks & Event streams"
        ]
      },
      features: [
        {
          title: "System Audits",
          description: "Analyzing your existing API surface to determine the best path for AI integration.",
          icon: "search"
        },
        {
          title: "Custom Adapters",
          description: "Building the 'glue code' that translates between LLM outputs and your system's required formats.",
          icon: "plug"
        },
        {
          title: "Security First",
          description: "Implementing OAuth, API keys, and rate limiting to ensure your AI integrations are secure.",
          icon: "shield"
        },
        {
          title: "Scalability Planning",
          description: "Ensuring your integrations can handle 10x growth without latency spikes or crashes.",
          icon: "trending-up"
        }
      ]
    }
  },
  consulting: {
    title: "AI Consulting",
    slug: "consulting",
    glyph: "biz",
    description: "Strategic guidance to identify AI opportunities and build your automation roadmap",
    lead: "Avoiding the AI hype and focusing on practical, ROI-driven implementation.",
    sections: {
      breakdown: {
        title: "Strategy over Hype",
        text: "Many companies rush into AI without a plan, resulting in expensive toys that don't solve business problems. I help you identify the 'AI-shaped' problems in your business—the ones where AI provides a 10x improvement over the status quo—and build a phased roadmap to solve them.",
        points: [
          "AI Opportunity Mapping",
          "ROI Projection & Analysis",
          "Vendor Selection & Evaluation",
          "Implementation Roadmapping"
        ]
      },
      features: [
        {
          title: "Feasibility Studies",
          description: "Rapid prototyping to prove that a proposed AI solution is actually possible before you invest heavily.",
          icon: "flask"
        },
        {
          title: "Tech Stack Selection",
          description: "Choosing the right models (GPT, Claude, Llama) and infrastructure for your specific use case.",
          icon: "layers"
        },
        {
          title: "Change Management",
          description: "Guidance on how to integrate AI into your team's workflow without creating friction.",
          icon: "users"
        },
        {
          title: "Risk Assessment",
          description: "Identifying potential pitfalls in AI adoption, from data privacy to model hallucinations.",
          icon: "alert-triangle"
        }
      ]
    }
  },
  marketing: {
    title: "Marketing Systems",
    slug: "marketing",
    glyph: "mkt",
    description: "AI-powered content, copy, and campaign systems that turn brand voice into compounding output.",
    lead: "Scaling your creative output without diluting your brand essence.",
    sections: {
      breakdown: {
        title: "The Content Engine",
        text: "Content marketing is a volume game, but quality is the only thing that wins. I build systems that capture your unique brand voice and 'DNA', allowing AI to generate high-fidelity drafts, social posts, and emails that actually sound like you, not a robot.",
        points: [
          "Brand Voice Cloning",
          "Automated Content Pipelines",
          "Multi-channel Distribution",
          "AI-driven Performance Analysis"
        ]
      },
      features: [
        {
          title: "Voice Modeling",
          description: "Creating a detailed digital profile of your brand voice to ensure consistency across all AI outputs.",
          icon: "mic"
        },
        {
          title: "Omnichannel Scaling",
          description: "Turn one long-form piece of content into 20 high-quality assets for X, LinkedIn, and Newsletters.",
          icon: "share"
        },
        {
          title: "Dynamic Personalization",
          description: "Systems that tailor your marketing messages to specific customer segments in real-time.",
          icon: "target"
        },
        {
          title: "Creative Feedback Loops",
          description: "Using AI to analyze which content is performing best and automatically adjusting the output style.",
          icon: "refresh-cw"
        }
      ]
    }
  }
};
