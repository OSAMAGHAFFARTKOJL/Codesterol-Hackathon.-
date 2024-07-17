import React from 'react';
import FileUploader from './components/FileUploader';
import CodeReviewAssistant from './components/CodeReviewAssistant';
import CodeSnippetGenerator from './components/CodeSnippetGenerator';
import TestCaseGenerator from './components/TestCaseGenerator';
import CodeDocumentationGenerator from './components/CodeDocumentationGenerator';

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      console.log(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-8">CodeCraft AI</h1>
      {/* <FileUploader onFileUpload={handleFileUpload} /> */}
      <CodeReviewAssistant apiKey={apiKey} />
      <CodeSnippetGenerator apiKey={apiKey} />
      <TestCaseGenerator apiKey={apiKey} />
      <CodeDocumentationGenerator apiKey={apiKey} />
    </div>
  );
};

export default App;
