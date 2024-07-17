import React, { useState, useRef } from 'react';
import MistralClient from '@mistralai/mistralai';
import { FaSpinner } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';


const CodeDocumentationGenerator = ({ apiKey }) => {
    const client = new MistralClient(apiKey);

    const [code, setCode] = useState('');
    const [documentation, setDocumentation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setCode(e.target.result);
        };
        reader.readAsText(file);
    };

    const generateDocumentation = async () => {
        setLoading(true);
        try {
            const chatResponse = await client.chat({
                model: 'mistral-tiny',
                messages: [{ role: 'user', content: `Generate documentation for the following code:\n${code}` }],
            });

            setDocumentation(chatResponse.choices[0].message.content);
            return toast.success('Documentation generated successfully!');
        } catch (error) {
            return toast.error('Error generating documentation! Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Code Documentation', 14, 22);
        autoTable(doc, {
            startY: 28,
            head: [['Description']],
            body: [[documentation]],
        });
        doc.save('code_documentation.pdf');
    };

    return (
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
                accept=".txt,.js,.jsx,.ts,.tsx,.py,.htm,.html,.css"
                onChange={handleFileUpload}
                className="mb-4"
            />
            <button
                onClick={generateDocumentation}
                className={`w-full px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 flex items-center justify-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={loading}
            >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Generate Documentation'}
            </button>
            {documentation && (
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Generated Documentation</h2>
                    <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md">{documentation}</pre>
                    <button
                        onClick={downloadPDF}
                        className="w-full px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 mt-4"
                    >
                        Download as PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default CodeDocumentationGenerator;
