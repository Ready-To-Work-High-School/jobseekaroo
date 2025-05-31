
import { JobSimulation, SimulationTask } from '@/types/jobSimulation';

export const jobSimulations: JobSimulation[] = [
  {
    id: "retail-customer-service",
    title: "Retail Customer Service Representative",
    description: "Experience real retail scenarios including customer interactions, product knowledge, and problem-solving in a busy retail environment.",
    category: "retail",
    difficulty: "Beginner",
    duration: "45 minutes",
    requirements: ["Basic communication skills", "Patience and empathy", "Problem-solving mindset"],
    skills_gained: ["Customer service excellence", "Conflict resolution", "Product knowledge", "Point-of-sale systems", "Time management"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "food-service-operations",
    title: "Food Service Operations Assistant",
    description: "Learn food service fundamentals including order taking, food safety, customer service, and teamwork in a fast-paced restaurant environment.",
    category: "hospitality",
    difficulty: "Beginner",
    duration: "50 minutes",
    requirements: ["Attention to detail", "Ability to work under pressure", "Basic math skills"],
    skills_gained: ["Food safety protocols", "Order management", "Customer service", "Teamwork", "Cash handling"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "office-administration",
    title: "Office Administration Assistant",
    description: "Master essential office skills including scheduling, document management, professional communication, and administrative support tasks.",
    category: "office",
    difficulty: "Beginner",
    duration: "55 minutes",
    requirements: ["Basic computer skills", "Organization skills", "Professional communication"],
    skills_gained: ["Email management", "Scheduling", "Document processing", "Phone etiquette", "Data entry"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "warehouse-operations",
    title: "Warehouse Operations Associate",
    description: "Experience warehouse fundamentals including inventory management, order fulfillment, safety protocols, and teamwork in a logistics environment.",
    category: "logistics",
    difficulty: "Beginner",
    duration: "40 minutes",
    requirements: ["Physical ability", "Attention to detail", "Safety awareness"],
    skills_gained: ["Inventory management", "Order picking", "Safety protocols", "Equipment operation", "Quality control"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "healthcare-support",
    title: "Healthcare Support Assistant",
    description: "Learn healthcare support roles including patient interaction, medical terminology, record keeping, and professional healthcare communication.",
    category: "healthcare",
    difficulty: "Intermediate",
    duration: "60 minutes",
    requirements: ["Interest in healthcare", "Attention to detail", "Compassion and empathy"],
    skills_gained: ["Patient communication", "Medical terminology", "Record keeping", "Healthcare protocols", "Professional ethics"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "digital-marketing-assistant",
    title: "Digital Marketing Assistant",
    description: "Explore digital marketing basics including social media management, content creation, analytics, and online customer engagement strategies.",
    category: "marketing",
    difficulty: "Intermediate",
    duration: "65 minutes",
    requirements: ["Social media familiarity", "Creativity", "Basic computer skills"],
    skills_gained: ["Social media management", "Content creation", "Analytics interpretation", "Customer engagement", "Digital communication"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const simulationTasks: { [key: string]: SimulationTask[] } = {
  "retail-customer-service": [
    {
      id: "retail-task-1",
      simulation_id: "retail-customer-service",
      title: "Customer Greeting and Store Knowledge",
      description: "Learn proper greeting techniques and basic store layout knowledge.",
      order_number: 1,
      content: {
        type: "interactive",
        scenario: "You're starting your shift at a busy retail store. Your first customer approaches looking confused.",
        task: "Practice greeting customers professionally and helping them navigate the store.",
        details: "A warm greeting sets the tone for the entire shopping experience. Learn to approach customers within 30 seconds, make eye contact, and offer assistance. You'll also learn basic store layout to help customers find what they need quickly."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "retail-task-2",
      simulation_id: "retail-customer-service",
      title: "Product Recommendations and Upselling",
      description: "Learn to make genuine product recommendations based on customer needs.",
      order_number: 2,
      content: {
        type: "interactive",
        scenario: "A customer is looking for a winter jacket but seems unsure about sizes and features.",
        task: "Help the customer find the right product while suggesting complementary items.",
        details: "Effective upselling isn't about pushing expensive items - it's about understanding customer needs and offering genuine value. Learn to ask the right questions, listen actively, and make recommendations that truly help the customer."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "retail-task-3",
      simulation_id: "retail-customer-service",
      title: "Handling Difficult Customers",
      description: "Practice de-escalation techniques and professional problem-solving.",
      order_number: 3,
      content: {
        type: "interactive",
        scenario: "A customer is upset about a return policy and is raising their voice in front of other customers.",
        task: "De-escalate the situation while maintaining store policy and customer satisfaction.",
        details: "Difficult situations are opportunities to demonstrate exceptional service. Learn the LAST method: Listen actively, Apologize for their frustration, Solve the problem within policy, and Thank them for their patience. Always remain calm and professional."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  "food-service-operations": [
    {
      id: "food-task-1",
      simulation_id: "food-service-operations",
      title: "Food Safety and Hygiene Protocols",
      description: "Master essential food safety practices and personal hygiene standards.",
      order_number: 1,
      content: {
        type: "educational",
        scenario: "Starting your shift in a busy restaurant kitchen and front-of-house area.",
        task: "Learn and apply critical food safety protocols including handwashing, temperature control, and cross-contamination prevention.",
        details: "Food safety is non-negotiable in food service. Learn proper handwashing techniques (20 seconds with soap), temperature danger zones (40-140°F), and how to prevent cross-contamination. Understand when to change gloves and how to handle food safely."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "food-task-2",
      simulation_id: "food-service-operations",
      title: "Order Taking and POS System",
      description: "Practice accurate order taking and point-of-sale system operation.",
      order_number: 2,
      content: {
        type: "interactive",
        scenario: "Rush hour at the restaurant with a line of hungry customers waiting to order.",
        task: "Take orders accurately, handle special requests, and process payments efficiently.",
        details: "Accuracy and speed are crucial during busy periods. Learn to listen carefully, repeat orders back to customers, handle modifications, and operate the POS system efficiently. Practice upselling drinks and sides naturally."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "food-task-3",
      simulation_id: "food-service-operations",
      title: "Teamwork and Communication",
      description: "Experience effective kitchen and front-of-house teamwork.",
      order_number: 3,
      content: {
        type: "interactive",
        scenario: "Working with kitchen staff to ensure orders are prepared correctly and delivered promptly.",
        task: "Coordinate with team members to maintain smooth operations during peak hours.",
        details: "Restaurant success depends on seamless teamwork. Learn kitchen terminology, how to communicate order modifications clearly, and how to support teammates during busy periods. Understand the importance of clear, respectful communication."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  "office-administration": [
    {
      id: "office-task-1",
      simulation_id: "office-administration",
      title: "Professional Email Communication",
      description: "Master professional email etiquette and communication standards.",
      order_number: 1,
      content: {
        type: "practical",
        scenario: "Managing the office inbox and responding to various business inquiries.",
        task: "Write professional emails, schedule meetings, and handle routine correspondence.",
        details: "Professional email communication is essential in modern business. Learn proper subject lines, greeting and closing formats, tone of voice, and how to structure clear, concise messages. Practice scheduling meetings and coordinating with multiple parties."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "office-task-2",
      simulation_id: "office-administration",
      title: "Document Management and Data Entry",
      description: "Learn efficient document organization and accurate data entry practices.",
      order_number: 2,
      content: {
        type: "practical",
        scenario: "Organizing client files and updating database records with new information.",
        task: "Create filing systems, input data accurately, and maintain organized records.",
        details: "Accurate record-keeping is crucial for business operations. Learn to create logical filing systems, both digital and physical, input data with 100% accuracy, and maintain confidentiality. Practice using common office software and database systems."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "office-task-3",
      simulation_id: "office-administration",
      title: "Phone Etiquette and Reception Duties",
      description: "Practice professional phone handling and front desk reception skills.",
      order_number: 3,
      content: {
        type: "interactive",
        scenario: "Managing the front desk, answering phones, and greeting visitors.",
        task: "Handle multiple phone lines, transfer calls professionally, and manage visitor check-ins.",
        details: "As the first point of contact, your phone and reception skills represent the entire company. Learn proper phone greetings, hold procedures, message taking, and how to direct visitors professionally. Practice multitasking while maintaining a professional demeanor."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  "warehouse-operations": [
    {
      id: "warehouse-task-1",
      simulation_id: "warehouse-operations",
      title: "Safety Protocols and Equipment Training",
      description: "Master warehouse safety procedures and basic equipment operation.",
      order_number: 1,
      content: {
        type: "educational",
        scenario: "Starting your first day in a busy warehouse environment.",
        task: "Learn safety protocols, proper lifting techniques, and basic equipment operation.",
        details: "Safety is the top priority in warehouse operations. Learn proper lifting techniques (bend with your knees, not your back), personal protective equipment requirements, emergency procedures, and basic operation of hand trucks, scanners, and other warehouse equipment."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "warehouse-task-2",
      simulation_id: "warehouse-operations",
      title: "Inventory Management and Order Picking",
      description: "Practice accurate inventory tracking and efficient order fulfillment.",
      order_number: 2,
      content: {
        type: "practical",
        scenario: "Fulfilling customer orders using the warehouse management system.",
        task: "Pick orders accurately, update inventory counts, and prepare shipments.",
        details: "Accuracy in order picking directly affects customer satisfaction. Learn to read pick lists, navigate warehouse layouts efficiently, use barcode scanners, verify quantities, and update inventory systems. Practice organizing picked items for efficient packing."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "warehouse-task-3",
      simulation_id: "warehouse-operations",
      title: "Quality Control and Shipping Preparation",
      description: "Learn quality control procedures and shipping preparation standards.",
      order_number: 3,
      content: {
        type: "practical",
        scenario: "Preparing orders for shipment and conducting quality checks.",
        task: "Inspect products for damage, pack orders securely, and prepare shipping labels.",
        details: "Quality control ensures customers receive products in perfect condition. Learn to inspect items for damage, pack orders to prevent damage during shipping, create accurate shipping labels, and maintain quality standards throughout the fulfillment process."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  "healthcare-support": [
    {
      id: "healthcare-task-1",
      simulation_id: "healthcare-support",
      title: "Patient Communication and Privacy",
      description: "Learn professional patient interaction and HIPAA privacy requirements.",
      order_number: 1,
      content: {
        type: "educational",
        scenario: "Working in a medical office as a healthcare support assistant.",
        task: "Practice professional patient communication while maintaining strict privacy standards.",
        details: "Healthcare communication requires special sensitivity and strict privacy adherence. Learn HIPAA requirements, professional communication with patients and families, how to handle sensitive information, and maintain dignity and respect in all interactions."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "healthcare-task-2",
      simulation_id: "healthcare-support",
      title: "Medical Terminology and Record Keeping",
      description: "Master basic medical terminology and accurate record maintenance.",
      order_number: 2,
      content: {
        type: "educational",
        scenario: "Updating patient records and communicating with healthcare providers.",
        task: "Learn essential medical terms and practice accurate documentation.",
        details: "Accurate medical records are critical for patient care. Learn common medical terminology, proper documentation procedures, how to organize patient information, and the importance of accuracy in healthcare record-keeping."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "healthcare-task-3",
      simulation_id: "healthcare-support",
      title: "Administrative Support and Scheduling",
      description: "Practice healthcare administrative tasks and appointment management.",
      order_number: 3,
      content: {
        type: "practical",
        scenario: "Managing appointment scheduling and insurance verification.",
        task: "Schedule appointments, verify insurance, and coordinate with medical staff.",
        details: "Healthcare administration keeps medical practices running smoothly. Learn appointment scheduling systems, insurance verification procedures, how to coordinate with medical staff, and manage patient flow efficiently."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  "digital-marketing-assistant": [
    {
      id: "marketing-task-1",
      simulation_id: "digital-marketing-assistant",
      title: "Social Media Content Creation",
      description: "Learn to create engaging social media content and maintain brand voice.",
      order_number: 1,
      content: {
        type: "creative",
        scenario: "Managing social media accounts for a small business.",
        task: "Create engaging posts, maintain brand consistency, and schedule content.",
        details: "Social media is often the first interaction customers have with a brand. Learn to create engaging content that reflects brand voice, use appropriate hashtags, schedule posts for optimal engagement, and maintain consistent messaging across platforms."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "marketing-task-2",
      simulation_id: "digital-marketing-assistant",
      title: "Analytics and Performance Tracking",
      description: "Practice interpreting social media analytics and reporting on performance.",
      order_number: 2,
      content: {
        type: "analytical",
        scenario: "Reviewing weekly social media performance and creating reports.",
        task: "Analyze engagement metrics, identify trends, and create performance reports.",
        details: "Data drives successful marketing campaigns. Learn to read analytics dashboards, identify key performance indicators (engagement rate, reach, clicks), spot trends in audience behavior, and create clear reports that inform marketing decisions."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "marketing-task-3",
      simulation_id: "digital-marketing-assistant",
      title: "Customer Engagement and Community Management",
      description: "Practice responding to customer inquiries and building online community.",
      order_number: 3,
      content: {
        type: "interactive",
        scenario: "Managing customer interactions across social media platforms.",
        task: "Respond to comments and messages professionally while building brand loyalty.",
        details: "Community management builds lasting customer relationships. Learn to respond to comments promptly and professionally, handle complaints diplomatically, encourage positive engagement, and create a welcoming online community around the brand."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};
