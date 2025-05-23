<h1 align="center">💼 HR Performance Dashboard</h1>
<p align="center"><strong>Manage employee performance, analytics, and bookmarks seamlessly</strong></p>

<p align="center">
  <a href="https://v0-hr-dashboard-challenge-azure.vercel.app/" target="_blank">
    🌐 View Live Project
  </a>
</p>

<hr>

<h2>🔧 Tech Stack</h2>
<ul>
  <li><strong>Framework:</strong> React with Next.js App Router</li>
  <li><strong>Styling:</strong> Tailwind CSS</li>
  <li><strong>Language:</strong> JavaScript (ES6+)</li>
  <li><strong>State Management:</strong> Zustand</li>
  <li><strong>Charts:</strong> Chart.js</li>
  <li><strong>Auth (Optional):</strong> NextAuth.js</li>
</ul>

<h2>🚀 Features</h2>

<h3>🏠 Dashboard Homepage (<code>/</code>)</h3>
<ul>
  <li>Displays employee cards with name, email, age, department, and performance rating</li>
  <li>Buttons: View, Bookmark, Promote</li>
</ul>

<h3>🔍 Search & Filter</h3>
<ul>
  <li>Search bar for name, email, department</li>
  <li>Multi-select filters by department and rating</li>
</ul>

<h3>👤 Dynamic Employee Details (<code>/employee/[id]</code>)</h3>
<ul>
  <li>Full profile with address, phone, bio, past performance</li>
  <li>Tabbed interface: Overview, Projects, Feedback</li>
</ul>

<h3>📌 Bookmarks (<code>/bookmarks</code>)</h3>
<ul>
  <li>List of all bookmarked employees</li>
  <li>Remove bookmarks and simulate Promote / Assign actions</li>
</ul>

<h3>📊 Analytics Page (<code>/analytics</code>)</h3>
<ul>
  <li>Department-wise average rating using Chart.js</li>
  <li>Bookmark trends (mocked data)</li>
</ul>

<h2>⚙️ Architecture</h2>
<ul>
  <li>Client-side and server-side data fetching</li>
  <li>Reusable Components: Card, Button, Modal, Badge, Tabs</li>
  <li>Dark / Light mode toggle with Tailwind</li>
  <li>Custom Hooks: <code>useBookmarks</code>, <code>useSearch</code></li>
</ul>

<h2>📸 Screenshots</h2>

<h3>📍 Dashboard Homepage</h3>
<img src="./65da83f9-0d2c-4ccb-9d26-0f8b7286eddb.png" alt="Dashboard Page" style="border-radius: 8px; max-width: 100%;">

<h3>📊 Analytics Dashboard</h3>
<img src="./1c6558ce-8558-4702-9db3-61aed8a82bd9.png" alt="Analytics Page" style="border-radius: 8px; max-width: 100%;">

<h2>📦 Installation</h2>

<pre><code>git clone https://github.com/your-username/hr-dashboard.git
cd hr-dashboard
npm install
npm run dev
</code></pre>

<h2>✅ To-Do / Bonus Features</h2>
<ul>
  <li>Authentication using NextAuth.js</li>
  <li>Create New User modal with validation</li>
  <li>Pagination or infinite scroll</li>
  <li>Animated tab transitions using Framer Motion</li>
</ul>

<hr>

<p align="center">
  <strong>Made with ❤️ by Mohammad Zaid</strong>
</p>
