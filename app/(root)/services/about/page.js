import React from 'react'

const page = () => {
   return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-8 max-w-5xl mx-auto text-white bg-gray-900 rounded-xl shadow-lg text-base">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        📘 PrepMate – AI-Powered Interview Preparation Platform
      </h1>

      <p className="mb-6">
        <strong>PrepMate</strong> is a modern web application built to assist
        users—especially students and job seekers—in preparing for interviews
        through mock interviews, AI-powered voice interactions, and resource
        tracking.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold mb-2">🚀 Project Purpose</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Conduct mock interviews using real-time voice interaction (VAPI AI).</li>
        <li>Provide structured feedback using AI (OpenAI / Google AI SDK).</li>
        <li>Store and manage user-specific data using Firebase.</li>
        <li>Offer a rich and responsive UI for better learning experience.</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mb-2">🛠️ Technologies Used</h2>
      <div className="mb-6 space-y-4">
        <div>
          <h3 className="font-semibold">Frontend</h3>
          <ul className="list-disc list-inside">
            <li>Next.js 15.3.4</li>
            <li>React 19</li>
            <li>Tailwind CSS 4</li>
            <li>Radix UI</li>
            <li>Lucide React</li>
            <li>Styled Components</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">State and Forms</h3>
          <ul className="list-disc list-inside">
            <li>React Hook Form</li>
            <li>Zod + @hookform/resolvers</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">AI and Voice</h3>
          <ul className="list-disc list-inside">
            <li>OpenAI SDK</li>
            <li>@vapi-ai/web</li>
            <li>@ai-sdk/google</li>
            <li>Sonner</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Backend & Services</h3>
          <ul className="list-disc list-inside">
            <li>Firebase & Firebase Admin SDK</li>
            <li>Axios</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Dev & Tooling</h3>
          <ul className="list-disc list-inside">
            <li>ESLint</li>
            <li>PostCSS</li>
            <li>Tailwind Plugins</li>
            <li>Moment.js</li>
          </ul>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold mb-2">📂 Project Structure</h2>
      <pre className="bg-gray-800 p-4 rounded mb-6 overflow-x-auto text-sm whitespace-pre-wrap">
{`PrepMate/
├── components/             # UI components
├── app/                    # Next.js routes and pages
├── context/                # React Contexts
├── lib/                    # Auth and logic
├── public/                 # Static assets
├── styles/                 # CSS and Tailwind setup
├── .gitignore              # Git rules
├── package.json            # Metadata
└── next.config.mjs         # Configuration`}
      </pre>

      <h2 className="text-xl sm:text-2xl font-semibold mb-2">📜 Core Features</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>🎙️ Voice-Driven Mock Interviews with Vapi AI</li>
        <li>💬 AI Feedback using OpenAI or Google SDKs</li>
        <li>🔐 Firebase Authentication and user history tracking</li>
        <li>📊 Smooth animated UI with Tailwind plugins</li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-semibold mb-2">🧪 Scripts</h2>
      <pre className="bg-gray-800 p-4 rounded mb-6 overflow-x-auto text-sm">
{`npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Run server
npm run lint     # Lint the code`}
      </pre>

      <h2 className="text-xl sm:text-2xl font-semibold mb-2">🧠 AI Interview Flow</h2>
      <ol className="list-decimal list-inside mb-6 space-y-1">
        <li>Start Interview → Trigger voice assistant (Vapi)</li>
        <li>Ask Question → AI generates prompt</li>
        <li>User Answers → Audio recorded and transcribed</li>
        <li>Analyze → AI evaluates and scores</li>
        <li>Display Result → Show scores and tips</li>
      </ol>

      <h2 className="text-xl sm:text-2xl font-semibold mb-2">📌 Future Improvements</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Dark mode support</li>
        <li>Role-based access (admin/interviewer)</li>
        <li>Export results as PDF/shareable link</li>
        <li>Enhanced analytics and chart visualization</li>
      </ul>

      
    </div>
  );
}

export default page
