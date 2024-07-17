import React from 'react';
import CodeReviewAssistant from './components/CodeReviewAssistant';
import CodeSnippetGenerator from './components/CodeSnippetGenerator';
import TestCaseGenerator from './components/TestCaseGenerator';
import CodeDocumentationGenerator from './components/CodeDocumentationGenerator';
import { Link } from 'react-router-dom';
import CodeConversionAssistant from './components/CodeConversion';
import Footer from './components/Footer';

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold mb-8">Smart Coder</h1>
        <CodeReviewAssistant apiKey={apiKey} />
        <CodeSnippetGenerator apiKey={apiKey} />
        <TestCaseGenerator apiKey={apiKey} />
        <CodeDocumentationGenerator apiKey={apiKey} />
        <CodeConversionAssistant apiKey={apiKey} />
      </div>
      <div>
        <Footer />
      </div>
    </div >
  );
};

export default App;
