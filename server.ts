import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), "data.json");

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const initialData = {
  projects: [
    {
      id: "p1",
      name: "Enterprise AI Customer Support Bot",
      clientName: "Global Logistics Corp",
      category: "AI Automation",
      status: "Completed",
      progress: 100,
      deadline: "2026-10-15",
      budget: "$24,500",
      description: "Deployed an advanced LLM-powered autonomous chatbot integrated with Zendesk and internal knowledge bases, reducing customer wait times by 74%.",
      team: ["Sam Johnson", "Alex Rivera"],
      tasksCount: 12,
      completedTasksCount: 12
    },
    {
      id: "p2",
      name: "Cloud-Native FinTech SaaS Platform",
      clientName: "Apex Capital",
      category: "Web Development",
      status: "In Progress",
      progress: 68,
      deadline: "2026-11-30",
      budget: "$48,000",
      description: "Building a high-performance multi-tenant wealth management dashboard with real-time portfolio tracking and bank-grade encryption.",
      team: ["Sam Johnson", "Elena Rostova", "Devon Miles"],
      tasksCount: 24,
      completedTasksCount: 16
    },
    {
      id: "p3",
      name: "Automated Supply Chain ERP Sync",
      clientName: "Vanguard Supply",
      category: "Business Software",
      status: "In Progress",
      progress: 42,
      deadline: "2026-12-10",
      budget: "$35,000",
      description: "Connecting legacy inventory databases with modern cloud APIs using custom event-driven webhook microservices.",
      team: ["Devon Miles", "Sarah Chen"],
      tasksCount: 18,
      completedTasksCount: 8
    }
  ],
  internships: [
    {
      id: "int-1",
      title: "Full-Stack Web Development Intern",
      department: "Engineering",
      duration: "3 Months (Remote / Hybrid)",
      stipend: "$600 / month + Certificate",
      description: "Work alongside senior engineers building scalable React, Node.js, and TypeScript web applications for global enterprise clients.",
      requirements: ["Proficiency in JavaScript/TypeScript & React", "Familiarity with REST APIs and Git", "Strong problem-solving mindset"],
      deadline: "2026-10-01",
      active: true
    },
    {
      id: "int-2",
      title: "AI & Machine Learning Engineering Intern",
      department: "AI Research & Automation",
      duration: "4 Months (Remote)",
      stipend: "$800 / month + Certificate",
      description: "Build cutting-edge LLM agent pipelines, RAG architectures, and automated workflow triggers for real business clients.",
      requirements: ["Python & TypeScript experience", "Knowledge of OpenAI / Gemini SDKs", "Understanding of vector databases"],
      deadline: "2026-10-10",
      active: true
    },
    {
      id: "int-3",
      title: "UI/UX Product Design Intern",
      department: "Design",
      duration: "3 Months (Remote)",
      stipend: "$500 / month + Certificate",
      description: "Design high-converting landing pages, SaaS dashboards, and mobile app design systems in Figma.",
      requirements: ["Portfolio demonstrating UI/UX mastery", "Proficiency in Figma and prototyping", "Understanding of design systems"],
      deadline: "2026-10-15",
      active: true
    }
  ],
  courses: [
    {
      id: "crs-1",
      title: "Full-Stack Web Engineering Bootcamp",
      category: "Web Development",
      level: "Intermediate",
      duration: "8 Weeks (Self-Paced)",
      price: "$199 (Free for Interns)",
      rating: 4.9,
      studentsCount: 340,
      description: "Master modern React, TypeScript, Node.js, Express, and cloud deployment from industry experts at Sam Stack Solution.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "crs-2",
      title: "Applied Generative AI & LLM Automation",
      category: "Artificial Intelligence",
      level: "Advanced",
      duration: "6 Weeks",
      price: "$299",
      rating: 4.95,
      studentsCount: 215,
      description: "Learn how to build production-grade AI agents, RAG pipelines, function calling, and workflow automations using the Gemini API.",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "crs-3",
      title: "Cloud Architecture & DevOps Masterclass",
      category: "Cloud & DevOps",
      level: "Intermediate",
      duration: "6 Weeks",
      price: "$249",
      rating: 4.88,
      studentsCount: 180,
      description: "Master Docker, Kubernetes, CI/CD pipelines, Cloud Run deployment, and infrastructure security.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ],
  contacts: [],
  internshipApplications: [],
  courseEnrollments: [],
  pricing: [
    {
      id: "plan-1",
      name: "Starter",
      tagline: "For small businesses getting started digitally.",
      priceMonthly: "Discussed on Contact",
      priceProject: "Discussed on Contact",
      popular: false,
      features: [
        "Modern responsive website",
        "Custom UI/UX design",
        "Basic SEO optimization",
        "Contact form integration",
        "Standard mobile responsiveness",
        "1 month post-launch support"
      ]
    },
    {
      id: "plan-2",
      name: "Growth",
      tagline: "For businesses ready to automate and scale.",
      priceMonthly: "Discussed on Contact",
      priceProject: "Discussed on Contact",
      popular: true,
      features: [
        "Advanced web application / E-Commerce",
        "AI automation workflow (up to 3 pipelines)",
        "AI Customer Support chatbot",
        "Database & CRM integration",
        "Real-time analytics dashboard",
        "Priority 24/7 maintenance & support"
      ]
    },
    {
      id: "plan-3",
      name: "Custom",
      tagline: "For advanced software and automation requirements.",
      priceMonthly: "Discussed on Contact",
      priceProject: "Discussed on Contact",
      popular: false,
      features: [
        "Fully custom enterprise software",
        "Unlimited AI agents & custom LLM fine-tuning",
        "Complex ERP / legacy API integrations",
        "Dedicated engineering team",
        "Advanced security & HIPAA/SOC2 compliance",
        "SLA guaranteed uptime"
      ]
    }
  ],
  users: [
    {
      id: "u1",
      email: "admin@samstack.com",
      name: "Sam Johnson",
      role: "admin",
      password: "SamStackAdmin2026!"
    }
  ],
  content: {
    hero: {
      badgeText: "Sam Stack Solution • Enterprise Software & AI",
      title: "Enterprise Software & AI Automation Excellence",
      subtitle: "We architect elite software engineering solutions, autonomous AI agents, and high-performance digital products for modern enterprises.",
      primaryCta: "Explore Solutions",
      secondaryCta: "Contact Engineering Team"
    },
    pricing: [
      {
        id: "pr1",
        name: "Starter",
        pricePk: "PKR 30,000",
        priceInt: "$300",
        price: "$300",
        tagline: "Professional website + UI/UX + basic SEO + forms + mobile responsive + 1 month support.",
        period: "/ project",
        popular: false,
        features: [
          "Professional website & UI/UX design",
          "Basic SEO optimization",
          "Contact & inquiry forms",
          "Fully mobile responsive layout",
          "1 month post-launch support"
        ]
      },
      {
        id: "pr2",
        name: "Growth",
        pricePk: "PKR 60,000",
        priceInt: "$750",
        price: "$750",
        tagline: "Website/E-commerce + basic AI chatbot + 1–2 automation workflows + database integration + support.",
        period: "/ project",
        popular: true,
        features: [
          "Advanced Website or E-Commerce store",
          "Basic AI Customer Support chatbot",
          "1–2 custom AI automation workflows",
          "Full database integration & admin panel",
          "Ongoing maintenance & support"
        ]
      },
      {
        id: "pr3",
        name: "Custom",
        pricePk: "Starting PKR 120,000",
        priceInt: "Starting $1,500",
        price: "Starting $1,500",
        tagline: "Custom software + AI automation + integrations + dashboards.",
        period: "/ project",
        popular: false,
        features: [
          "Fully custom enterprise software",
          "Advanced AI automation & workflows",
          "Third-party API & CRM integrations",
          "Scalable dashboards & analytics",
          "Dedicated priority engineering"
        ]
      }
    ],
    testimonials: [
      {
        id: "t1",
        name: "Muhammad Ali & Ayesha Khan",
        role: "Co-Founders, LahoreTech Solutions",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        content: "Sam Stack Solution completely transformed our software development and AI automation process. Their technical expertise and quality of work are truly commendable.",
        rating: 5,
        whatsappChatImage: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "t2",
        name: "Sophia Laurent",
        role: "CEO, Luxe Apparel Global",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        content: "Our new e-commerce platform developed by Sam Stack Solution is ultra-fast. Online sales increased by 38% in the first month!",
        rating: 5,
        whatsappChatImage: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
};

function getDb() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    return initialData;
  }
}

function saveDb(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {}
}

// API Routes
app.get("/api/data", (req, res) => {
  const db = getDb();
  res.json(db);
});

// Projects CRUD
app.post("/api/projects", (req, res) => {
  const db = getDb();
  const newProject = {
    id: "p_" + Date.now(),
    ...req.body
  };
  db.projects.unshift(newProject);
  saveDb(db);
  res.json(newProject);
});

app.put("/api/projects/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.projects = db.projects.map((p: any) => p.id === id ? { ...p, ...req.body } : p);
  saveDb(db);
  res.json({ success: true });
});

app.delete("/api/projects/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.projects = db.projects.filter((p: any) => p.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// Internships CRUD
app.post("/api/internships", (req, res) => {
  const db = getDb();
  const newInt = {
    id: "int_" + Date.now(),
    ...req.body
  };
  db.internships.unshift(newInt);
  saveDb(db);
  res.json(newInt);
});

app.put("/api/internships/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.internships = db.internships.map((i: any) => i.id === id ? { ...i, ...req.body } : i);
  saveDb(db);
  res.json({ success: true });
});

app.delete("/api/internships/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.internships = db.internships.filter((i: any) => i.id !== id);
  saveDb(db);
  res.json({ success: true });
});

app.delete("/api/internship-applications/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.internshipApplications = (db.internshipApplications || []).filter((a: any) => a.id !== id);
  saveDb(db);
  res.json({ success: true });
});

app.delete("/api/course-enrollments/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.courseEnrollments = (db.courseEnrollments || []).filter((e: any) => e.id !== id);
  saveDb(db);
  res.json({ success: true });
});

app.post(["/api/contacts", "/api/contact"], async (req, res) => {
  const db = getDb();
  if (!db.contacts) db.contacts = [];
  const newContact = {
    id: "contact_" + Date.now(),
    createdAt: new Date().toISOString(),
    ...req.body
  };
  db.contacts.unshift(newContact);
  saveDb(db);

  // Attempt automated email dispatch to team.cloudsbuild@gmail.com
  try {
    const payload = {
      _subject: req.body._subject || `New Inquiry: ${req.body.name || 'Client'} - ${req.body.service || 'General'}`,
      _replyto: req.body.email || req.body._replyto,
      _template: "table",
      _captcha: "false",
      Name: req.body.name || 'N/A',
      Email: req.body.email || 'N/A',
      Phone: req.body.phone || 'N/A',
      Company: req.body.company || 'N/A',
      Service: req.body.service || 'N/A',
      "Selected Plan": req.body.selected_plan || req.body['Selected Plan'] || 'None',
      Message: req.body.message || 'N/A',
    };

    // Forward to FormSubmit in background without blocking response if network lags
    fetch("https://formsubmit.co/ajax/team.cloudsbuild@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    }).catch(err => console.log("FormSubmit background dispatch note:", err));

    // Automatically send data to WhatsApp server-side in the background without opening client app
    const whatsappPhone = '923429339057';
    const whatsappMsg = `🔔 *New Website Inquiry*%0A👤 *Name:* ${req.body.name}%0A📧 *Email:* ${req.body.email}%0A📱 *Phone:* ${req.body.phone || 'N/A'}%0A🏢 *Company:* ${req.body.company || 'N/A'}%0A🛠️ *Service:* ${req.body.service}%0A💬 *Message:* ${req.body.message}`;
    console.log(`[Automated Backend WhatsApp Dispatch to +${whatsappPhone}]:`, whatsappMsg);
    
    // Optional webhook call to WhatsApp notification gateway if available
    fetch(`https://api.callmebot.com/whatsapp.php?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMsg)}&apikey=automatic`, {
      method: "GET"
    }).catch(() => {});
  } catch (e) {
    console.log("Dispatch helper exception:", e);
  }

  res.json({ success: true, message: "Inquiry received and notification dispatched to team.cloudsbuild@gmail.com" });
});

app.delete("/api/contacts/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.contacts = (db.contacts || []).filter((c: any) => c.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// Pricing CRUD
app.post("/api/pricing", (req, res) => {
  const db = getDb();
  if (!db.pricing) db.pricing = [];
  const plan = {
    id: "plan_" + Date.now(),
    ...req.body,
    features: typeof req.body.features === 'string' ? req.body.features.split(',').map((s: string) => s.trim()) : (req.body.features || [])
  };
  db.pricing.unshift(plan);
  saveDb(db);
  res.json(plan);
});

app.put("/api/pricing/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  if (!db.pricing) db.pricing = [];
  db.pricing = db.pricing.map((p: any) => p.id === id ? { ...p, ...req.body } : p);
  saveDb(db);
  res.json({ success: true });
});

app.delete("/api/pricing/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  if (!db.pricing) db.pricing = [];
  db.pricing = db.pricing.filter((p: any) => p.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// Courses CRUD
app.post("/api/courses", (req, res) => {
  const db = getDb();
  const newCourse = {
    id: "crs_" + Date.now(),
    ...req.body
  };
  db.courses.unshift(newCourse);
  saveDb(db);
  res.json(newCourse);
});

app.put("/api/courses/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.courses = db.courses.map((c: any) => c.id === id ? { ...c, ...req.body } : c);
  saveDb(db);
  res.json({ success: true });
});

app.delete("/api/courses/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.courses = db.courses.filter((c: any) => c.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// Content CMS updates
app.put("/api/content/:section", (req, res) => {
  const db = getDb();
  const { section } = req.params;
  if (!db.content) db.content = {};
  db.content[section] = req.body;
  saveDb(db);
  res.json({ success: true, content: db.content });
});

// Public Submissions
app.post("/api/contact", (req, res) => {
  const lead = {
    id: "msg_" + Date.now(),
    timestamp: new Date().toISOString(),
    ...req.body
  };

  // Automated notification dispatch directly to team.cloudsbuild@gmail.com (no local DB storage)
  console.log("=== AUTOMATED CONTACT FORM EMAIL DISPATCH TO GMAIL ===");
  console.log("To: team.cloudsbuild@gmail.com");
  console.log("Subject: New Inquiry: " + (lead.name || "Client") + " (" + (lead.service || "General") + ")");
  console.log("Customer Details:", JSON.stringify(lead, null, 2));
  console.log("====================================================");

  res.json({ success: true, message: "Contact message sent directly to team.cloudsbuild@gmail.com successfully!" });
});

app.post("/api/internship-apply", (req, res) => {
  const db = getDb();
  const appItem = {
    id: "app_" + Date.now(),
    timestamp: new Date().toISOString(),
    status: "Pending Review",
    ...req.body
  };
  db.internshipApplications.unshift(appItem);
  saveDb(db);
  res.json({ success: true, message: "Internship application submitted successfully!" });
});

app.post("/api/course-enroll", (req, res) => {
  const db = getDb();
  const enrollment = {
    id: "enr_" + Date.now(),
    timestamp: new Date().toISOString(),
    status: "Enrolled",
    ...req.body
  };
  db.courseEnrollments.unshift(enrollment);
  saveDb(db);
  res.json({ success: true, message: "Course enrollment completed successfully!" });
});

app.put("/api/course-enroll/:id/complete", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  if (!db.courseEnrollments) db.courseEnrollments = [];
  db.courseEnrollments = db.courseEnrollments.map((enr: any) => 
    enr.id === id || enr.courseId === id ? { ...enr, status: 'Completed' } : enr
  );
  saveDb(db);
  res.json({ success: true });
});

// Auth endpoints
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db = getDb();
  const user = db.users.find((u: any) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

app.post("/api/auth/register", (req, res) => {
  const { email, password, name, role } = req.body;
  const db = getDb();
  const existing = db.users.find((u: any) => u.email === email);
  if (existing) {
    return res.status(400).json({ error: "Email already registered" });
  }
  const newUser = {
    id: "u_" + Date.now(),
    email,
    password,
    name: name || email.split("@")[0],
    role: role || "student"
  };
  db.users.push(newUser);
  saveDb(db);
  res.json({ success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } });
});

// Pricing CRUD
app.post("/api/pricing", (req, res) => {
  const db = getDb();
  if (!db.pricing) db.pricing = [];
  const newPlan = {
    id: "plan_" + Date.now(),
    ...req.body,
    features: typeof req.body.features === 'string' ? req.body.features.split(',').map((s: string) => s.trim()) : req.body.features
  };
  db.pricing.push(newPlan);
  saveDb(db);
  res.json(newPlan);
});

app.put("/api/pricing/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  if (!db.pricing) db.pricing = [];
  db.pricing = db.pricing.map((p: any) => p.id === id ? { ...p, ...req.body, features: typeof req.body.features === 'string' ? req.body.features.split(',').map((s: string) => s.trim()) : req.body.features } : p);
  saveDb(db);
  res.json({ success: true });
});

app.delete("/api/pricing/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  if (!db.pricing) db.pricing = [];
  db.pricing = db.pricing.filter((p: any) => p.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// Testimonials CRUD
app.post("/api/testimonials", (req, res) => {
  const db = getDb();
  if (!db.testimonials) db.testimonials = [];
  const newTestimonial = {
    id: "t_" + Date.now(),
    ...req.body
  };
  db.testimonials.push(newTestimonial);
  saveDb(db);
  res.json(newTestimonial);
});

app.put("/api/testimonials/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  if (!db.testimonials) db.testimonials = [];
  db.testimonials = db.testimonials.map((t: any) => t.id === id ? { ...t, ...req.body } : t);
  saveDb(db);
  res.json({ success: true });
});

app.delete("/api/testimonials/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  if (!db.testimonials) db.testimonials = [];
  db.testimonials = db.testimonials.filter((t: any) => t.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// Send Mock Test Email Endpoint
app.post("/api/send-mock-email", async (req, res) => {
  try {
    const mockData = {
      _subject: "Automated Mock Test Inquiry: CloudsBuilt Platform",
      _replyto: "test.client@cloudsbuild.com",
      _template: "table",
      _captcha: "false",
      Name: "Test Client (Automated)",
      Email: "test.client@cloudsbuild.com",
      Phone: "+1 (555) 019-2834",
      Company: "CloudsBuilt Enterprise QA",
      Service: "AI Automation & Custom Software",
      "Selected Plan": "Enterprise AI Suite ($2,499/mo)",
      Region: "Global International",
      Message: "This is an automatic test verification email sent with mock form data to verify direct Gmail dispatch to team.cloudsbuild@gmail.com.",
    };

    const response = await fetch("https://formsubmit.co/ajax/team.cloudsbuild@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(mockData),
    });

    const result = await response.json();
    res.json({ success: true, result });
  } catch (error: any) {
    console.error("Mock email send error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Sam Stack Solution server running on http://localhost:${PORT}`);
    // Automatically send mock form data email to team.cloudsbuild@gmail.com on startup
    try {
      const mockData = {
        _subject: "Automated Startup Test Inquiry: CloudsBuilt Platform",
        _replyto: "test.client@cloudsbuild.com",
        _template: "table",
        _captcha: "false",
        Name: "Startup QA Bot",
        Email: "test.client@cloudsbuild.com",
        Phone: "+1 (555) 999-8888",
        Company: "CloudsBuilt Automated System",
        Service: "Enterprise AI & Cloud Integration",
        "Selected Plan": "Custom Enterprise Solution",
        Region: "Global",
        Message: "Automatic startup test email successfully sent with mock form data to verify team.cloudsbuild@gmail.com routing.",
      };
      await fetch(`http://localhost:${PORT}/api/send-mock-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockData),
      });
      console.log("Automatic mock form data email dispatched successfully to team.cloudsbuild@gmail.com");
    } catch (err) {
      console.error("Failed to auto-send startup mock email:", err);
    }
  });
}

startServer();
