import React, { useState } from 'react';
import TypingTest from './components/TypingTest';
import LearnSection from './components/LearnSection';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('test');

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container">
        {activeTab === 'test' ? <TypingTest /> : <LearnSection />}
      </main>
    </div>
  );
}

export default App;
