# ICT Governance Dashboard Website

Transform the Selecao Bootstrap template into a national ICT Governance Dashboard showing public ICT statistics, cybersecurity alerts, agency profiles, and project tracking.

## Proposed Changes

The site uses the existing Selecao template structure (Bootstrap 5.3.3, AOS, Animate.css, Swiper, Bootstrap Icons) and adds Chart.js (CDN) for data visualization. No emojis anywhere.

### Homepage

#### [MODIFY] [index.html](file:///c:/Users/admin/Downloads/Selecao1/Selecao/index.html)

Complete overhaul of [index.html](file:///c:/Users/admin/Downloads/Selecao1/Selecao/index.html) to serve as the ICT Governance Dashboard homepage:

- **Header/Nav**: Replace nav with `Home | Agencies | Alerts | Projects | Contact` linking to separate HTML pages
- **Hero Section**: Replace carousel with ICT-themed hero introducing the National ICT Governance Dashboard
- **Stats Section**: 4 animated stat counters (Total Cybercrime Cases YTD, Active ICT Projects, Free Wi-Fi Access Points, Privacy Complaints Filed)
- **Dashboard Section**: Embed Chart.js bar chart for cybercrime cases by type and a doughnut chart for project status distribution
- **Status Indicators**: Cards showing system status (Stable/Critical) with color-coded badges
- **Quick Links**: Clickable cards linking to Agency profiles and other sections
- **Footer**: Update branding to "ICT Governance Dashboard" with relevant social links

---

### Dashboard Metrics Page

#### [NEW] [dashboard.html](file:///c:/Users/admin/Downloads/Selecao1/Selecao/dashboard.html)

Built from [starter-page.html](file:///c:/Users/admin/Downloads/Selecao1/Selecao/starter-page.html) pattern with breadcrumbs:

- **Filter Controls**: Dropdown selects to filter by Agency or Region, with a reset button
- **Bar Chart**: Cybercrime cases by type (Phishing, Identity Theft, Online Fraud, Hacking, Data Breach)
- **Pie Chart**: Cases distribution by agency (DICT, DOJ, NBI, NPC)
- **Project Progress Section**: Visual progress indicators per project with animated bars
- **Privacy Complaints Chart**: Line or bar chart for monthly statistics
- **Interactive Elements**: Tooltips on charts, hover state cards, filter/sort that re-renders charts via JS

---

### Agencies Page

#### [NEW] [agencies.html](file:///c:/Users/admin/Downloads/Selecao1/Selecao/agencies.html)

Overview page with expandable cards for all 4 agencies:

- **DICT** - Department of Information and Communications Technology
  - Introduction, responsibilities, logo meaning, quick stats card
- **DOJ Cybercrime Office** - Department of Justice Office of Cybercrime
  - Introduction, responsibilities, logo meaning, quick stats card
- **NBI Cybercrime Division** - National Bureau of Investigation
  - Introduction, responsibilities, logo meaning, quick stats card
- **NPC** - National Privacy Commission
  - Introduction, responsibilities, logo meaning, quick stats card

Each card includes: Bootstrap icon representing the agency, brief intro, bullet-point responsibilities, logo description section, and a progress bar showing operational metrics.

---

### Alerts Page

#### [NEW] [alerts.html](file:///c:/Users/admin/Downloads/Selecao1/Selecao/alerts.html)

Public advisories and guidance page:

- **Current Alerts Banner**: Active cybersecurity threat alerts with severity badges
- **Report Identity Theft**: Step-by-step guide with numbered list and contact info
- **Report Hacking**: Instructions with agency contacts
- **Detect Fake Websites**: Visual checklist with icons for each warning sign
- **Detect Investment Scams**: Red flags and reporting channels
- **Quick Reference Accordion**: FAQ-style collapsible sections using Bootstrap accordion

---

### Projects Page

#### [NEW] [projects.html](file:///c:/Users/admin/Downloads/Selecao1/Selecao/projects.html)

Track 5 major ICT initiatives:

| Project | Agency | Progress | Launch |
|---|---|---|---|
| National Cybersecurity Plan | DICT | 72% | 2017 |
| Free Wi-Fi for All | DICT | 65% | 2017 |
| National Broadband Plan | DICT | 58% | 2017 |
| PhilSys (National ID) | PSA/DICT | 80% | 2018 |
| DigitalJobsPH | DICT/DOLE | 70% | 2016 |

Each project card shows: name, description, implementing agency, animated progress bar (% complete), launch date, and target timeline.

---

### Contact Page

#### [NEW] [contact.html](file:///c:/Users/admin/Downloads/Selecao1/Selecao/contact.html)

- **Agency Contact Table**: Responsive Bootstrap table with Agency, Email, Phone, and Website columns for DICT, DOJ-OOC, NBI Cybercrime, NPC
- **Google Map Embed**: `<iframe>` showing DICT HQ location in Quezon City
- **Official Pages Section**: Icon links (Website, Facebook, X/Twitter, YouTube) for each agency opening in new tabs

---

### Shared Assets

#### [MODIFY] [main.css](file:///c:/Users/admin/Downloads/Selecao1/Selecao/assets/css/main.css)

Append custom CSS at the end of the existing file for:
- Dashboard stat cards, chart containers, progress bars
- Status indicator badges (`.status-stable`, `.status-critical`)
- Agency profile cards with hover effects
- Alert severity badges and advisory cards
- Project tracker card layout
- Contact table styling
- Responsive adjustments

#### [NEW] [dashboard.js](file:///c:/Users/admin/Downloads/Selecao1/Selecao/assets/js/dashboard.js)

Custom JavaScript for:
- Chart.js initialization (bar, pie/doughnut, line charts)
- Filter/sort controls that dynamically update chart data
- Animated counter for stat numbers on homepage
- Progress bar animations on scroll

---

## Verification Plan

### Browser Testing

Since this is a static HTML/CSS/JS site with no build step, verification will be done via the browser tool:

1. **Open [index.html](file:///c:/Users/admin/Downloads/Selecao1/Selecao/index.html)** in browser and verify:
   - Navigation bar shows all 5 tabs and links work
   - Hero section displays ICT Dashboard branding
   - Stat counters are visible with correct labels
   - Charts render (bar + doughnut)
   - Status indicators display with correct colors
   - Quick links navigate to correct pages

2. **Open `dashboard.html`** and verify:
   - Filter dropdowns are functional
   - Charts render with correct data
   - Progress indicators display
   - Interactive tooltips work on charts

3. **Open `agencies.html`** and verify:
   - All 4 agency sections are visible
   - Each has intro, responsibilities, logo meaning, stats
   - Cards have hover effects

4. **Open `alerts.html`** and verify:
   - Advisory sections are readable
   - Accordion sections expand/collapse
   - Severity badges display correctly

5. **Open `projects.html`** and verify:
   - All 5 projects are rendered
   - Progress bars show correct percentages
   - Project details are accurate

6. **Open `contact.html`** and verify:
   - Contact table is responsive and readable
   - Google Map embed loads
   - Social media icon links are present
