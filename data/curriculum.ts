const curriculumData = {
  categories: [
    {
      name: "UI/Web Based Automation",
      description: "Learn web automation testing with modern frameworks",
      courses: [
        {
          title: "Java Programming",
          description: "Master Java fundamentals for automation testing",
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
      courses: [
        {
          title: "Java Programming",
          description: "Master Java fundamentals for automation testing",
          shared: true
        },
        {
          title: "REST API Fundamentals",
          description: "Understanding RESTful web services",
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
          shared: true
        },
        {
          title: "Git Version Control",
          description: "Source code management with Git",
          shared: true
        },
        {
          title: "Jenkins CI/CD",
          description: "Continuous Integration and Deployment",
          shared: true
        }
      ]
    },
    {
      name: "Mobile Automation",
      description: "Mobile app testing automation",
      courses: [
        {
          title: "Java Programming",
          description: "Master Java fundamentals for automation testing",
          shared: true
        },
        {
          title: "Appium Framework",
          description: "Cross-platform mobile automation",
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
          shared: true
        },
        {
          title: "Git Version Control",
          description: "Source code management with Git",
          shared: true
        }
      ]
    },
    {
      name: "Database Testing",
      description: "Database validation and testing",
      courses: [
        {
          title: "SQL Fundamentals",
          description: "Structured Query Language basics",
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
      courses: [
        {
          title: "JMeter Framework",
          description: "Open source performance testing tool",
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
      courses: [
        {
          title: "OWASP Top 10",
          description: "Web application security risks",
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