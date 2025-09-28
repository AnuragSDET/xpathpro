const curriculumData = {
  categories: [
    {
      name: "UI/Web Based Automation",
      description: "Learn web automation testing with modern frameworks",
      order: 1,
      icon: "code",
      color: "blue",
      featured: true,
      courses: [
        {
          title: "Java Programming",
          description: "Master Java fundamentals for automation testing",
          order: 1,
          difficulty: "beginner",
          duration: "40",
          prerequisites: ["Basic programming knowledge", "Computer fundamentals"],
          learningObjectives: ["Understand Java syntax and variables", "Master OOP concepts", "Handle exceptions properly", "Use collections framework effectively"],
          overview: ["Comprehensive Java programming course covering all fundamentals needed for test automation", "Hands-on coding exercises and projects"],
          tags: ["java", "programming", "fundamentals", "oop"],
          featured: true,
          lessons: [
            "Introduction to Java",
            "Variables and Data Types",
            "Control Structures",
            "Object-Oriented Programming",
            "Exception Handling",
            "Collections Framework"
          ]
        },
        {
          title: "Selenium WebDriver",
          description: "Complete Selenium automation framework",
          order: 2,
          difficulty: "intermediate",
          duration: "35",
          prerequisites: "Java Programming knowledge",
          learningObjectives: "Master WebDriver API, element locators, synchronization, and Page Object Model",
          overview: "Learn to automate web applications using Selenium WebDriver with best practices",
          tags: ["selenium", "webdriver", "automation", "testing"],
          lessons: [
            "WebDriver Setup",
            "Locating Elements",
            "WebDriver Commands",
            "Handling Forms",
            "Synchronization",
            "Page Object Model"
          ]
        },
        {
          title: "TestNG Framework",
          description: "Advanced testing framework for Java",
          order: 3,
          difficulty: "intermediate",
          duration: "25",
          prerequisites: "Java and Selenium knowledge",
          learningObjectives: "Master TestNG annotations, data providers, parallel execution, and reporting",
          overview: "Advanced testing framework for organizing and executing automated tests",
          tags: ["testng", "framework", "testing", "annotations"],
          lessons: [
            "TestNG Annotations",
            "Test Configuration",
            "Data Providers",
            "Parallel Execution",
            "Reporting",
            "Integration with Maven"
          ]
        },
        {
          title: "Maven Build Tool",
          description: "Project management and build automation",
          order: 4,
          difficulty: "beginner",
          duration: "15",
          prerequisites: "Basic Java knowledge",
          learningObjectives: "Understand Maven project structure, dependency management, and build lifecycle",
          overview: "Learn to manage Java projects and dependencies using Maven build tool",
          tags: ["maven", "build", "dependency", "management"],
          lessons: [
            "Maven Installation",
            "Project Structure",
            "Dependencies Management",
            "Build Lifecycle",
            "Plugins Configuration"
          ]
        },
        {
          title: "Git Version Control",
          description: "Source code management with Git",
          order: 5,
          difficulty: "beginner",
          duration: "20",
          prerequisites: "Basic command line knowledge",
          learningObjectives: "Master Git commands, branching, merging, and collaboration workflows",
          overview: "Essential version control skills for managing code and collaborating with teams",
          tags: ["git", "version-control", "collaboration", "github"],
          lessons: [
            "Git Basics",
            "Repository Management",
            "Branching and Merging",
            "Remote Repositories",
            "Collaboration Workflows"
          ]
        },
        {
          title: "Jenkins CI/CD",
          description: "Continuous Integration and Deployment",
          order: 6,
          difficulty: "intermediate",
          duration: "30",
          prerequisites: "Git and Maven knowledge",
          learningObjectives: "Setup CI/CD pipelines, automate builds, and integrate with version control",
          overview: "Learn to automate build, test, and deployment processes using Jenkins",
          tags: ["jenkins", "ci-cd", "automation", "devops"],
          lessons: [
            "Jenkins Setup",
            "Job Configuration",
            "Build Triggers",
            "Pipeline as Code",
            "Integration with Git"
          ]
        }
      ]
    },
    {
      name: "API Automation",
      description: "Master API testing and automation",
      order: 2,
      icon: "server",
      color: "green",
      courses: [
        {
          title: "Java Programming",
          description: "Master Java fundamentals for automation testing",
          order: 1,
          shared: true
        },
        {
          title: "REST API Fundamentals",
          description: "Understanding RESTful web services",
          order: 2,
          lessons: [
            "HTTP Methods",
            "Status Codes",
            "Request/Response Structure",
            "Authentication Methods",
            "API Documentation"
          ]
        },
        {
          title: "Postman Testing",
          description: "API testing with Postman",
          order: 3,
          lessons: [
            "Postman Interface",
            "Creating Requests",
            "Test Scripts",
            "Environment Variables",
            "Collection Runner",
            "Newman CLI"
          ]
        },
        {
          title: "RestAssured Framework",
          description: "Java library for API automation",
          order: 4,
          lessons: [
            "RestAssured Setup",
            "Request Specification",
            "Response Validation",
            "JSON Path",
            "Authentication",
            "Data Driven Testing"
          ]
        },
        {
          title: "Maven Build Tool",
          description: "Project management and build automation",
          order: 5,
          shared: true
        },
        {
          title: "Git Version Control",
          description: "Source code management with Git",
          order: 6,
          shared: true
        },
        {
          title: "Jenkins CI/CD",
          description: "Continuous Integration and Deployment",
          order: 7,
          shared: true
        }
      ]
    },
    {
      name: "Mobile Automation",
      description: "Mobile app testing automation",
      order: 3,
      icon: "test-tube",
      color: "purple",
      courses: [
        {
          title: "Java Programming",
          description: "Master Java fundamentals for automation testing",
          order: 1,
          shared: true
        },
        {
          title: "Appium Framework",
          description: "Cross-platform mobile automation",
          order: 2,
          lessons: [
            "Appium Architecture",
            "Setup and Configuration",
            "Mobile Locators",
            "Gestures and Actions",
            "Hybrid App Testing",
            "Cloud Testing"
          ]
        },
        {
          title: "Android Testing",
          description: "Native Android app automation",
          order: 3,
          lessons: [
            "Android SDK Setup",
            "ADB Commands",
            "UI Automator",
            "Espresso Framework",
            "Performance Testing"
          ]
        },
        {
          title: "iOS Testing",
          description: "Native iOS app automation",
          order: 4,
          lessons: [
            "Xcode Setup",
            "iOS Simulator",
            "XCUITest Framework",
            "Real Device Testing",
            "App Store Guidelines"
          ]
        },
        {
          title: "Maven Build Tool",
          description: "Project management and build automation",
          order: 5,
          shared: true
        },
        {
          title: "Git Version Control",
          description: "Source code management with Git",
          order: 6,
          shared: true
        }
      ]
    },
    {
      name: "Database Testing",
      description: "Database validation and testing",
      order: 4,
      icon: "server",
      color: "orange",
      courses: [
        {
          title: "SQL Fundamentals",
          description: "Structured Query Language basics",
          order: 1,
          lessons: [
            "Database Concepts",
            "SELECT Statements",
            "Joins and Relationships",
            "Data Manipulation",
            "Stored Procedures",
            "Performance Optimization"
          ]
        },
        {
          title: "JDBC Connectivity",
          description: "Java Database Connectivity",
          order: 2,
          lessons: [
            "JDBC Drivers",
            "Connection Management",
            "Executing Queries",
            "Result Set Processing",
            "Transaction Management"
          ]
        },
        {
          title: "NoSQL Databases",
          description: "Non-relational database testing",
          order: 3,
          lessons: [
            "MongoDB Basics",
            "Document Operations",
            "Aggregation Framework",
            "Performance Testing",
            "Data Validation"
          ]
        }
      ]
    },
    {
      name: "Performance Testing",
      description: "Load and performance testing",
      order: 5,
      icon: "bug",
      color: "red",
      courses: [
        {
          title: "JMeter Framework",
          description: "Open source performance testing tool",
          order: 1,
          lessons: [
            "JMeter Architecture",
            "Test Plan Creation",
            "Load Testing",
            "Stress Testing",
            "Performance Monitoring",
            "Report Analysis"
          ]
        },
        {
          title: "LoadRunner",
          description: "Enterprise performance testing",
          order: 2,
          lessons: [
            "LoadRunner Components",
            "Script Recording",
            "Parameterization",
            "Correlation",
            "Load Generation",
            "Analysis and Reporting"
          ]
        }
      ]
    },
    {
      name: "Security Testing",
      description: "Application security testing",
      order: 6,
      icon: "shield",
      color: "teal",
      courses: [
        {
          title: "OWASP Top 10",
          description: "Web application security risks",
          order: 1,
          lessons: [
            "Injection Attacks",
            "Authentication Flaws",
            "Sensitive Data Exposure",
            "XML External Entities",
            "Access Control Issues",
            "Security Misconfiguration"
          ]
        },
        {
          title: "Burp Suite",
          description: "Web application security testing",
          order: 2,
          lessons: [
            "Burp Suite Setup",
            "Proxy Configuration",
            "Scanner Usage",
            "Intruder Tool",
            "Repeater Functionality",
            "Report Generation"
          ]
        }
      ]
    }
  ]
};

export default curriculumData;