<h1 align="center">💼 HR Dashboard <em>(Advanced)</em></h1>

<p align="center">
  <strong>🚀 Live Demo:</strong> <a href="https://v0-hr-dashboard-challenge-azure.vercel.app/" target="_blank">v0-hr-dashboard-challenge-azure.vercel.app</a>
</p>

<hr />

<h2>🔧 Tech Stack</h2>

<ul>
  <li><strong>Framework:</strong> React (with Next.js App Router)</li>
  <li><strong>Styling:</strong> Tailwind CSS</li>
  <li><strong>Language:</strong> JavaScript (ES6+)</li>
  <li><strong>State Management:</strong> Context API</li>
  <li><strong>Bonus:</strong> Chart.js, Optional: NextAuth.js</li>
</ul>

<hr />

<h2>🎯 Core Features</h2>

<h3>🏠 Dashboard Homepage <code>/</code></h3>
<ul>
  <li>Fetched data from <code>https://dummyjson.com/users?limit=20</code></li>
  <li>Displayed user cards with:
    <ul>
      <li>Full Name, Email, Age, Department</li>
      <li>Performance rating (1–5 stars)</li>
      <li>Buttons: <code>View</code>, <code>Bookmark</code>, <code>Promote</code></li>
    </ul>
  </li>
</ul>

<h3>🔍 Search & Filter</h3>
<ul>
  <li>Search bar (name, email, department - case-insensitive)</li>
  <li>Multi-select filter dropdown for department and rating</li>
</ul>

<h3>👤 Dynamic User Details <code>/employee/[id]</code></h3>
<ul>
  <li>Detailed profile: Address, Phone, Bio, Past Performance</li>
  <li>Rating stars, color-coded badges</li>
  <li>Tabbed interface: <code>Overview</code>, <code>Projects</code>, <code>Feedback</code></li>
</ul>

<h3>📌 Bookmark Manager <code>/bookmarks</code></h3>
<ul>
  <li>View bookmarked users</li>
  <li>Remove bookmark, Promote, Assign to Project</li>
</ul>

<h3>📊 Analytics Page <code>/analytics</code></h3>
<ul>
  <li>Charts showing:
    <ul>
      <li>Department-wise average ratings</li>
      <li>Bookmark trends</li>
    </ul>
  </li>
</ul>

<hr />

<h2>⚙️ Tech Highlights</h2>
<ul>
  <li>Used <code>App Router</code> from Next.js</li>
  <li><strong>Custom Hooks:</strong> <code>useBookmarks</code>, <code>useSearch</code></li>
  <li>Reusable Components: Card, Button, Modal, Badge</li>
  <li>Responsive design (Mobile to Desktop)</li>
  <li>Dark/Light mode support</li>
  <li>Component-level loading and error states</li>
  <li>Modular Folder Structure:
    <ul>
      <li><code>components/</code></li>
      <li><code>hooks/</code></li>
      <li><code>lib/</code></li>
      <li><code>app/</code> (Next.js routing)</li>
    </ul>
  </li>
</ul>

<hr />

<h2>⭐️ Bonus Features</h2>
<ul>
  <li>Authentication support (NextAuth.js ready or mock login)</li>
  <li>“Create User” modal with basic form validation</li>
  <li>Pagination or infinite scroll support</li>
  <li>Animated tab/content transitions (Framer Motion)</li>
</ul>

<hr />

<h2>📷 Screenshots</h2>

> Add screenshots here (UI previews, dashboard, user detail, bookmarks, etc.)

<hr />

<h2>📦 Getting Started</h2>

```bash
# Clone the repo
git clone https://github.com/your-username/hr-dashboard.git
cd hr-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev
<hr /> <h2>📁 Folder Structure</h2>
bash
Copy
Edit
hr-dashboard/
├── app/
│   ├── page.tsx
│   ├── employee/[id]/page.tsx
│   ├── bookmarks/page.tsx
│   ├── analytics/page.tsx
├── components/
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Button.tsx
├── hooks/
│   ├── useBookmarks.ts
│   ├── useSearch.ts
├── lib/
│   ├── data.ts
├── public/
├── styles/
├── tailwind.config.js
└── README.md
<hr /> <h2 align="center">❤️ Made with love by Mohammad Zaid</h2> ```
