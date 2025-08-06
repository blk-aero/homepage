# **BLK Aero Website Revamp**

This document serves as the central source of truth for the BLK Aero website redevelopment project. It outlines the project's goals, technical specifications, and implementation plan.

## **1. Project Overview**

The primary goal of this project is to redesign and redevelop the existing HUGO-based website to significantly improve search engine optimization (SEO), increase lead generation through online advertising (specifically Google Search), and provide an excellent user experience tailored for the Brazilian market.

## **2. Development**

To run the project in a local development environment, use the provided Docker configuration:

docker compose \-f docker-compose.dev.yml up

The server will be available at http://localhost:1313 with live reload enabled.

## **3. Project Requirements**

This section captures the requirements for the website using the EARS (Easy Approach to Requirements Syntax) notation.

### **3.1. General Requirements**

* **GR1:** **The system shall** use the HUGO static site generator with the "hugo-fresh" theme as a base.
* **GR2:** **The system shall** be styled with the Lato font.
* **GR3:** **The system shall** use a color palette based on \#22271e, \#e6fafb, \#515b3a, \#6aa468, \#39ff14, \#adff9d, \#c2b8ff, \#a9c9ff, \#ffddb4, \#a2f7ff, optimized for web contrast and accessibility.
* **GR4:** **The system shall** use a Major Third (1.25) type scale for all typography.
* **GR5:** **The system shall** achieve the following mobile Lighthouse scores: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90\.

### **3.2. Homepage Requirements (Priority 1\)**

* **F-HP-1:** **WHEN** a user clicks the WhatsApp button, **THEN** the system shall open a new chat with the business number in the WhatsApp application.
* **UI-HP-1 (Hero):** **The system shall** display a hero section with a headline that communicates how BLK Aero helps clients make better decisions, reduce costs, and ensure compliance.
* **UI-HP-2 (Hero):** **The system shall** feature a prominent WhatsApp button as the primary call-to-action.
* **A-HP-1:** **WHEN** a user clicks the WhatsApp button, **THEN** the system shall send a whatsapp\_click event to Google Analytics.

### **3.3. Page per Client Requirements (Priority 2\)**

* **F-PC-1:** **WHEN** a user clicks the primary WhatsApp button on a client page, **THEN** the system shall open a new chat with the business number in the WhatsApp application.
* **UI-PC-1 (Headline):** **The system shall** display a main headline that clearly states the service and the specific client type (e.g., "Topografia para Construtoras").
* **A-PC-1:** **WHEN** a user clicks the WhatsApp button on a client page, **THEN** the system shall send a whatsapp\_click event to Google Analytics with a parameter indicating the client page type.

### **3.4. Page per City Requirements (Priority 3\)**

* **F-PCY-1:** **The system shall** programmatically generate a unique page for each city listed in a CSV data file.
* **UI-PCY-1 (Headline):** **The system shall** display a main headline in the format of Nome da Cidade \- UF.
* **UI-PCY-2 (URL):** **The system shall** generate a URL slug in kebab-case from the city name and state.
* **SEO-PCY-1:** **The system shall** include schema.org/LocalBusiness structured data on each city page.

## **4. Technical Design & Architecture**

This section outlines the technical implementation plan.

### **4.1. Core Architecture**

* **Framework:** HUGO static site generator.
* **Theme:** hugo-fresh (customizations will be managed in the root directory).
* **Deployment:** GitHub Pages via GitHub Actions.

### **4.2. Styling and Theming (SASS)**

* **Strategy:** Custom styles will be managed in assets/scss/ to override the theme's defaults without modifying the theme itself.
  * assets/scss/\_variables.scss: Custom color palette, fonts, etc.
  * assets/scss/main.scss: Main SASS file that imports variables and then the theme's core styles.

### **4.3. Content Architecture & Generation**

* **Page per Client:** Content will be managed in a single data file at data/clients.yaml. A layout at layouts/cliente/single.html will range over this data to generate the pages.
* **Page per City:** Content and schema data will be managed in data/cidades.csv. A layout at layouts/cidade/single.html will generate the pages. A partial at layouts/partials/schema.html will generate the LocalBusiness JSON-LD script for each page.

### **4.4. Analytics**

* A partial at layouts/partials/gtm.html will hold the Google Tag Manager snippets and will be included in the baseof.html template.

## **5. Tasks**

This section breaks down the project into trackable tasks.

### **Epic 1: Project Setup & Core Configuration**

* \[ \] **Task 1.1: Setup SASS Override Structure:** Create and configure \_variables.scss and main.scss.
* \[ \] **Task 1.2: Configure Google Tag Manager (GTM):** Create and integrate the gtm.html partial.
* \[ \] **Task 1.3: Create Data Files:** Create data/clients.yaml and data/cidades.csv with sample data.

### **Epic 2: Homepage Implementation (Priority 1\)**

* \[ \] **Task 2.1: Develop Homepage Layout:** Modify layouts/index.html to match the new design.
* \[ \] **Task 2.2: Implement Homepage Content:** Update hugo.yaml with final copy.
* \[ \] **Task 2.3: Implement Homepage Analytics:** Configure GTM to track homepage events.

### **Epic 3: Page per Client Implementation (Priority 2\)**

* \[ \] **Task 3.1: Develop Client Page Layout:** Create the layouts/cliente/single.html template.
* \[ \] **Task 3.2: Populate Client Content:** Fill out the data/clients.yaml file.
* \[ \] **Task 3.3: Implement Client Page Analytics:** Configure GTM to track client page events.

### **Epic 4: Page per City Implementation (Priority 3\)**

* \[ \] **Task 4.1: Develop City Page Layout:** Create the layouts/cidade/single.html template.
* \[ \] **Task 4.2: Implement Schema.org Partial:** Create layouts/partials/schema.html for LocalBusiness data.
* \[ \] **Task 4.3: Implement City Page Analytics:** Configure GTM to track city page events.
