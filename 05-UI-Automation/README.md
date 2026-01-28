# UIAutomationTests - Selenium WebDriver Test Suite

A professional Selenium WebDriver test automation framework for end-to-end UI testing. Built with Java, TestNG, and Maven, this project validates critical user workflows with prioritized test execution.

## Project Overview

**UIAutomationTests** is a test automation framework designed to validate web application functionality using Selenium WebDriver. The project includes comprehensive e-commerce testing scenarios (Sauce Labs demo) with structured test organization, proper dependency management, and best practices for automated testing.

## Project Structure

```
UIAutomationTests/
├── .idea/                      # IntelliJ IDEA configuration
├── .mvn/                       # Maven wrapper configuration
├── src/
│   ├── main/
│   │   ├── java/              # Main application source code (if applicable)
│   │	└── resources/         # Main resources (properties, configs)
│   └── test/
│       ├── java/              # Test source code
│       │   └── SauceDemoTests.java  # Main test class
│       └── resources/         # Test resources (test data, configs)
├── target/                     # Compiled output and test reports
├── .gitignore                 # Git ignore rules
├── README.md                  # Project documentation
├── pom.xml                    # Maven configuration and dependencies
└── External Libraries         # Resolved Maven dependencies
```

## Technology Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| **Java** | JDK 25 | Programming language |
| **Selenium WebDriver** | 4.39.0 | Browser automation |
| **TestNG** | 7.11.0 | Test framework & assertions |
| **Maven** | 4.0.0 | Build & dependency management |
| **Firefox** | Latest | Browser driver (GeckoDriver) |

## Maven Configuration (pom.xml)

### Project Metadata
```
Group ID: org.example
Artifact ID: UiAutomationTests
Version: 1.0-SNAPSHOT
```

### Build Properties
- **Source Compiler**: Java 25
- **Target Compiler**: Java 25
- **Source Encoding**: UTF-8

### Dependencies

#### 1. Selenium Java (4.39.0)
```xml
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.39.0</version>
</dependency>
```
- **Purpose**: Provides WebDriver API for browser automation
- **Scope**: Compile (available for both main and test code)
- **Includes**: WebDriver bindings, browser support, and utilities

#### 2. TestNG (7.11.0)
```xml
<dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.11.0</version>
    <scope>test</scope>
</dependency>
```
- **Purpose**: Testing framework with annotations and assertions
- **Scope**: Test-only (available only during test execution)
- **Features**: Priority-based test execution, data-driven testing, parallel execution

## File Organization Details

### Source Directory: `src/main/java`
Contains main application code (if creating a library or framework). Currently may be empty as this is a test-focused project.

### Test Directory: `src/test/java`
**Primary test class**: `SauceDemoTests.java`
- Contains 8 end-to-end test methods with prioritized execution
- Tests login, shopping, sorting, checkout, and logout workflows
- Uses Selenium WebDriver with Firefox browser

### Resources Directories
- `src/main/resources/`: Configuration files, properties, test data (main application)
- `src/test/resources/`: Test configuration, TestNG XML suites, test data files

### Build Output: `target/`
Generated after Maven build:
- `target/classes/`: Compiled main classes
- `target/test-classes/`: Compiled test classes
- `target/surefire-reports/`: Test execution reports
- `target/site/`: Test coverage and build reports

## Setup & Installation

### Prerequisites
1. **Java Development Kit (JDK) 25+**
   ```bash
   java -version
   ```

2. **Maven 3.8+**
   ```bash
   mvn -version
   ```

3. **Firefox Browser** (Latest version)

4. **GeckoDriver** (automatically managed by Selenium 4.39.0)

### Installation Steps

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd UIAutomationTests
   ```

2. **Install dependencies**
   ```bash
   mvn clean install
   ```

3. **Verify setup**
   ```bash
   mvn test -DsuiteXmlFile=testng.xml -Dtest=SauceDemoTests#LoginTest
   ```

## Running Tests

### Run All Tests
```bash
mvn test
```

### Run Specific Test Class
```bash
mvn test -Dtest=SauceDemoTests
```

### Run Specific Test Method
```bash
mvn test -Dtest=SauceDemoTests#LoginTest
```

### Run Tests by Priority
```bash
mvn test -Dtest=SauceDemoTests -DsuiteXmlFile=testng.xml
```

### Run with Maven Wrapper (no Maven installation needed)
```bash
./mvnw test          # macOS/Linux
mvnw.cmd test        # Windows
```

## Test Suite Documentation

### Available Tests (in execution order)

| Priority | Test Method | Scope |
|----------|-------------|-------|
| 1 | `LoginTest` | Authentication & session management |
| 2 | `AddOneItemToCart` | Single item cart operations |
| 3 | `ResetAppState` | Application state reset |
| 4 | `SortProductsByPrice` | Product sorting validation |
| 5 | `SelectMultipleProducts` | Multi-item cart operations |
| 6 | `checkout_goToOverview` | Checkout information entry |
| 7 | `VerifyTotalPrice` | Price calculation & order completion |
| 8 | `BackToHomePageAndLogout` | Logout & session termination |

**Test Credentials**
- Username: `standard_user`
- Password: `secret_sauce`

**Application URL**: `https://www.saucedemo.com/`

## Configuration Details

### WebDriver Configuration
- **Browser**: Firefox
- **Window State**: Maximized
- **Implicit Wait**: 3 seconds
- **Location**: `SauceDemoTests.setUp()` method

### Test Execution Flow
Tests execute sequentially in priority order (1→8) to maintain workflow dependencies:
1. User logs in
2. Adds items to cart
3. Resets state
4. Tests sorting functionality
5. Adds multiple items
6. Completes checkout
7. Verifies final total
8. Logs out

## Maven Build Lifecycle

### Clean Phase
```bash
mvn clean
```
Removes `target/` directory and compiled artifacts

### Compile Phase
```bash
mvn compile
```
Compiles source code into bytecode

### Test Phase
```bash
mvn test
```
Executes all tests and generates reports

### Package Phase
```bash
mvn package
```
Creates JAR file in `target/` directory

### Install Phase
```bash
mvn install
```
Installs packaged artifact to local Maven repository

### Complete Build Cycle
```bash
mvn clean install
```

## IDE Integration

### IntelliJ IDEA
- `.idea/` folder contains IDE-specific configurations
- Project structure automatically recognized
- Right-click test → **Run** to execute individual tests
- Maven tool window for build management

### Eclipse
1. File → Import → Maven → Existing Maven Projects
2. Select project root directory
3. Eclipse will recognize `pom.xml` automatically

### VS Code
1. Install "Extension Pack for Java" and "Maven for Java"
2. File → Open Folder → Select project root
3. VS Code reads `pom.xml` automatically

## Dependencies Explanation

### Why These Versions?

**Selenium 4.39.0**
- Latest stable version (as of project creation)
- Includes W3C WebDriver protocol support
- Improved error handling and logging
- Better performance than 3.x series

**TestNG 7.11.0**
- Modern assertion framework
- Priority-based test execution (used in this project)
- Enhanced XML configuration support
- Better parallel execution capabilities

**Java 25**
- Latest LTS features available
- Modern language constructs
- Performance improvements
- Enhanced garbage collection

## Project Dependencies (Resolved)

When you run `mvn install`, Maven automatically resolves:

**Selenium Java 4.39.0** brings:
- WebDriver API
- Browser drivers (Chrome, Firefox, Edge, Safari)
- Chrome DevTools Protocol support
- Selenium Grid support

**TestNG 7.11.0** brings:
- Testing annotations (@Test, @BeforeTest, @AfterTest)
- Assertion library
- XML test suite configuration
- Test reporting

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Tests not running** | Run `mvn clean install` to download dependencies |
| **Firefox not found** | Install Firefox or update PATH environment variable |
| **Java version mismatch** | Verify JDK 25+ is installed and set in JAVA_HOME |
| **Port already in use** | Check if another instance is running; kill process or change port |
| **Element not found** | Increase implicit wait in `setUp()` or use explicit waits |
| **Maven command not found** | Install Maven or use `./mvnw` (Maven wrapper) |

## Best Practices Implemented

1. ✅ **Dependency Management**: Centralized in `pom.xml`
2. ✅ **Build Automation**: Maven handles compilation, testing, packaging
3. ✅ **Test Organization**: Standard Maven source structure
4. ✅ **Framework Separation**: Test code in separate `src/test/` directory
5. ✅ **Version Control**: `.gitignore` excludes build artifacts
6. ✅ **Scope Management**: TestNG scoped to test-only execution

## Project Evolution

### Current State (1.0-SNAPSHOT)
- Basic test automation with Selenium & TestNG
- Single test class with 8 test methods
- Maven-based dependency management
- Manual test execution

### Recommended Enhancements
- **Page Object Model (POM)**: Separate page classes for maintainability
- **Test Data Externalization**: Move credentials to properties files
- **Logging Framework**: Add Log4j or SLF4j
- **CI/CD Integration**: GitHub Actions, Jenkins pipeline
- **Test Reports**: TestNG HTML reports, Allure reporting
- **Parallel Execution**: Configure Maven Surefire for parallel tests
- **Cross-browser Testing**: Add Chrome, Edge, Safari drivers
- **Explicit Waits**: Replace implicit waits with WebDriverWait
- **Screenshot Capture**: Implement failure screenshots
- **API Testing**: Integrate RestAssured for API validation

## Common Maven Commands

```bash
# Clean build artifacts
mvn clean

# Download dependencies
mvn dependency:resolve

# Run all tests
mvn test

# Generate test reports
mvn test site

# Skip tests during build
mvn clean install -DskipTests

# Run single test
mvn test -Dtest=SauceDemoTests#LoginTest

# Update dependencies
mvn dependency:update-snapshots

# Display dependency tree
mvn dependency:tree

# Build JAR file
mvn package

# Install to local repository
mvn install
```

## Version Control

The `.gitignore` file prevents committing:
- `/target/` - Compiled files and build output
- `/.idea/` - IDE configurations (in some setups)
- `.class` files - Compiled Java bytecode
- `.jar` files - Packaged artifacts

## Additional Resources

- **Selenium Documentation**: https://www.selenium.dev/documentation/
- **TestNG Documentation**: https://testng.org/doc/
- **Maven Documentation**: https://maven.apache.org/guides/
- **Sauce Labs Demo App**: https://www.saucedemo.com/

## Author & Contact

- **Project Name**: UIAutomationTests
- **Framework**: Selenium WebDriver + TestNG
- **Test Application**: Sauce Labs Demo (saucedemo.com)
- **Purpose**: UI Automation & End-to-End Testing

## License

This project is provided for educational and QA automation training purposes.

---

**Last Updated**: January 2026
**Project Status**: Active Development
