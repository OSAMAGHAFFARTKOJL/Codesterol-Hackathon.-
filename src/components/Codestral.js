import React, { useState, useRef } from 'react';
import MistralClient from '@mistralai/mistralai';
import { FaSpinner } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Codestral = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const client = new MistralClient(apiKey);

    const [code, setCode] = useState('');
    const [prompt, setPrompt] = useState('');
    const [correctedCode, setCorrectedCode] = useState('');
    const [documentation, setDocumentation] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingDoc, setLoadingDoc] = useState(false);

    const correctedCodeRef = useRef(null);
    const documentationRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setCode(e.target.result);
        };
        reader.readAsText(file);
    };

    const scrollToCorrectedCode = () => {
        correctedCodeRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToDocumentation = () => {
        documentationRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const correctCode = async () => {
        setLoading(true);
        try {
            const chatResponse = await client.chat({
                model: 'mistral-tiny',
                messages: [{ role: 'user', content: `Correct the following code: ${prompt}\n${code}` }],
            });

            setCorrectedCode(chatResponse.choices[0].message.content);
            scrollToCorrectedCode(); // Scroll to Corrected Code section
        } catch (error) {
            console.log('Error:', error.message);
        }
        setLoading(false);
    };

    const generateDocumentation = async () => {
        setLoadingDoc(true);
        try {
            const chatResponse = await client.chat({
                model: 'mistral-tiny',
                messages: [{ role: 'user', content: `Generate documentation for the following code:\n${correctedCode || code}` }],
            });

            setDocumentation(chatResponse.choices[0].message.content);
            scrollToDocumentation(); // Scroll to Generated Documentation section
        } catch (error) {
            console.log('Error:', error.message);
        }
        setLoadingDoc(false);
    };

    const downloadPDF = (content, title) => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text(title, 10, 10);
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(content, 180);
        doc.text(lines, 10, 20);
        doc.save(`${title}.pdf`);
    };

    const downloadCorrectedCodePDF = () => {
        downloadPDF(correctedCode, 'Corrected_Code');
    };

    const downloadDocumentationPDF = () => {
        downloadPDF(documentation, 'Generated_Documentation');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Code Documentation Generator</h1>
            <div className="w-full max-w-3xl bg-white p-6 rounded-md shadow-md mb-6">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows="10"
                    cols="50"
                    placeholder="Enter your code here..."
                    className="w-full p-4 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                />
                <input
                    type="file"
                    accept=".txt,.js,.ts,.jsx,.tsx,.py,.htm,.html,.css"
                    onChange={handleFileUpload}
                    className="mb-4"
                />
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows="3"
                    cols="50"
                    placeholder="Enter your prompt here..."
                    className="w-full p-4 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                />
                <button
                    onClick={correctCode}
                    className={`w-full px-6 py-2 mb-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 flex items-center justify-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={loading}
                >
                    {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Correct Code'}
                </button>
                <button
                    onClick={generateDocumentation}
                    className={`w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 flex items-center justify-center ${loadingDoc ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={loadingDoc}
                >
                    {loadingDoc ? <FaSpinner className="animate-spin mr-2" /> : 'Generate Documentation'}
                </button>
            </div>
            {correctedCode && (
                <div ref={correctedCodeRef} className="w-full max-w-3xl bg-white p-6 rounded-md shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Corrected Code</h2>
                    <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md">{correctedCode}</pre>
                    <button
                        onClick={downloadCorrectedCodePDF}
                        className="w-full px-6 py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Download Corrected Code as PDF
                    </button>
                </div>
            )}
            {documentation && (
                <div ref={documentationRef} className="w-full max-w-3xl bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Generated Documentation</h2>
                    <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md">{documentation}</pre>
                    <button
                        onClick={downloadDocumentationPDF}
                        className="w-full px-6 py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Download Documentation as PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default Codestral;
