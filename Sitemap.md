Here is a comprehensive Low-Fidelity Wireframe description for the entire Southern Heights Physiotherapy Center ERP (v2.0). These descriptions serve as the blueprint for your UI development in React.

### **1\. Global Shell (The App Layout)**

**Goal:** A responsive wrapper that handles navigation and user identity.

- **Sidebar (Left Vertical Navigation):**
  - **Logo Area:** Top left, fixed branding "Southern Heights".
  - **User Widget:** Shows current user name & role (e.g., "Lina (Therapist)").
  - **Navigation Menu (Collapsible):** Links with icons. Items visibility depends on RBAC1.
    - _Dashboard_
    - _Calendar (Scheduler)_
    - _Patients_
    - _Finance_ (Expandable: Expenses, Receivables, Reports) – _Admin/Manager only_.
    - _HR_ (Expandable: My Profile, Staff, Payroll) – _Admin/Manager/Staff logic_.
    - _Settings_ – _Admin only_.
  - **Footer:** "Logout" button.
- **Top Bar (Header):**
  - **Breadcrumbs:** (e.g., Home \> Patients \> Ali Ahmad).
  - **Global Search:** Quick search input for "Patient Name" or "Phone".
  - **Notification Bell:** Badge for alerts (e.g., "Urgent Cancellation")2.
  - **Language Toggle:** Switcher for EN / AR (RTL support trigger)3.

---

### **2\. Dashboards (Role-Based)**

**Goal:** Immediate operational awareness.

#### **A.**

Executive Dashboard (Admin & Manager) 4

- **Top Row: KPI Cards (4 slots)**
  - **Total Revenue:** (JD value, green text for positive trend).
  - **Net Profit:** (Income \- Expenses).
  - **Active Patients:** (Count).
  - **Pending Leaves:** (Count of requests needing approval).
- **Middle Row: Main Chart**
  - **Profit & Loss Trend:** Line chart (X-axis: Last 6 months, Y-axis: JD). Lines for "Revenue" and "Expense".
- **Bottom Row: Operational Widgets**
  - **Urgent Alerts List:** Table showing "Consecutive Cancellations" or "Inactivity"5.
  - **Staff Utilization:** Bar chart showing % booked hours per therapist6.

#### **B. Clinical Dashboard (Therapist & Reception)**

- **Left Column: Today's Schedule (Agenda View)**
  - List of appointments sorted by time (08:00 \- 17:00).
  - Card content: Time, Patient Name, Type (Standard vs. Extra-Care), Status badge (Booked/Checked-in).
- **Right Column: Quick Actions & Queue**
  - **Action Buttons:** Large buttons for "New Patient", "Check In", "New Expense" (Petty cash).
  - **Overbooking Queue:** List of waitlisted patients (Name, Priority, Phone)7.

---

### **3\. Clinical Module Screens**

#### **A.**

Scheduler (/calendar) 8

- **Main View:** Full-sized Calendar Component (Day/Week tabs).
  - **Columns:** One column per Therapist.
  - **Slots:** 60-minute blocks.
- **Appointment Modal (Pop-up on click):**
  - **Header:** "Book Appointment".
  - **Patient Select:** Searchable dropdown. Shows "Extra-Care" badge if selected9.
  - **Type Select:** Standard, Package, or Home Session.
  - **Surcharge Warning:** Yellow alert box appears if Package Rate \< Service Price 10.
  - **Validation Message:** Red error text "Capacity Exceeded" if total points \> 211.
  - **Footer:** Save, Cancel, Delete (Reception only).

#### **B.**

Patient Registry (/patients) 12

- **List View:** Data Table.
  - **Columns:** ID, Full Name, Phone, Age, Last Visit Date, Balance (Red if negative).
  - **Filters:** "My Patients", "Debtors", "Archived".

#### **C. Patient Profile (/patients/:id)**

- **Header Card:** Name, Age, Gender, **"Extra-Care" Toggle Switch**13, Contact buttons (WhatsApp).
- **Tabs:**
  1. **Clinical:**
     - **Attachments:** Grid of uploaded thumbnails (X-rays) with "Upload" button14.
     - **Session Notes:** Timeline of previous notes.
  2. **Treatment Plans:**
     - **Active Plan Card:** Shows "Remaining Sessions", "Package Details".
     - **History:** List of discharged plans.
  3. **Financial:**
     - **Ledger Table:** Date, Type (Payment/Invoice), Amount, Balance.
  4. **Insurance:**
     - **Form:** Insurer Name (GIG), Card Image, Expiry Date, Coverage %15.

#### **D.**

Clinical Note (Therapist View) 16

- **Context:** Read-only header showing Patient Name & Appointment Date.
- **Procedures:** Checklist of standard treatments (e.g., TENS, Manual Therapy).
- **Narrative:** Large text area for "SOAP" notes.
- **Next Steps:** Text input for "Recommendation".
- **Action:** "Mark Complete" button (Auto-deducts session from plan)17.

---

### **4\. Finance Module Screens (v2.0 New)**

#### **A.**

Expense Management (/finance/expenses) 18

- **Layout:** Split screen (List vs. Form).
- **Left (List):** Table of expenses. Columns: Date, Category (Rent, Utilities), Amount, Status.
- **Right (Entry Form):**
  - **Inputs:** Amount, Date, Category Dropdown, Description.
  - **Receipt Upload:** Drag-and-drop zone for images.

#### **B.**

Profit & Loss Report (/finance/reports) 19

- **Filters:** Date Range Picker (Start/End), Granularity (Monthly/Quarterly).
- **Summary Cards:** Total Income, Total Expense, **Net Profit** (highlighted).
- **Breakdown Table:** Hierarchical table showing income by "Session Type" and expenses by "Category".

---

### **5\. HR Module Screens (v2.0 New)**

#### **A.**

Staff Directory (/hr/staff) 20202020

- **Table View:** List of employees.
- **Columns:** Name, Role, Join Date, Base Salary (Hidden/Masked), Status (Active).
- **Edit Modal:** Form to update Base Salary and Commission %.

#### **B.**

Leave Management (/hr/leaves) 21212121

- **Tab 1: My Requests (All Users):**
  - "New Request" Button.
  - Form: Start Date, End Date, Type (Sick/Vacation), Reason.
- **Tab 2: Approval Queue (Manager/Admin):**
  - List of pending requests.
  - Actions: "Approve" (Green check), "Reject" (Red X). _Note: Approving triggers scheduler block._

#### **C.**

Payroll (/hr/payroll) 22222222

- **Generator View:**
  - **Selector:** "Select Month/Year".
  - **Preview Table:** Lists all staff with calculated columns:
    - Base Salary
    - Commission (Auto-calc from Session Revenue)
    - Deductions
    - Net Pay
  - **Action:** "Generate Payslips" button.

---

### **6\. Admin & Utility Screens**

#### **A. Master Data (/settings)**

- **Tabs:**
  - **Services:** Table to edit Prices and "Points" (Capacity weight) 23.
  - **Insurance:** List of enabled providers.
  - **Procedure Templates:** Manage the checklist items for clinical notes.

#### **B. Audit & Backup**

- **Audit Log:** Dense table of system events (Who, When, What)24.
- **Backup Settings:** Status indicator of last CRON dump (Success/Fail)25.
