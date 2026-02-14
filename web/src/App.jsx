import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header.jsx";
import Lessons from "./pages/ProjectManagement/ProjectPlusPage.jsx";
import PracticeTests from "./pages/PracticeTests.jsx";
import Test01 from "./pages/Test01.jsx";
import Test02 from "./pages/Test02.jsx";
import Test03 from "./pages/Test03.jsx";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <div style={{ color: "white" }}>
      <Header searchValue={search} onSearchChange={setSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <main style={{ padding: 24 }}>
              <h2>Welcome 👋</h2>
              <p>Use the nav to open Lessons or Practice Tests.</p>
              <p style={{ opacity: 0.8 }}>
                Search term: <code>{search || "(none)"}</code>
              </p>
            </main>
          }
        />

        <Route path="/lessons" element={<Lessons />} />

        {/* Practice Tests overview + 3 individual tests */}
        <Route path="/practice-tests" element={<PracticeTests />} />
        <Route path="/practice-tests/test-01" element={<Test01 />} />
        <Route path="/practice-tests/test-02" element={<Test02 />} />
        <Route path="/practice-tests/test-03" element={<Test03 />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
