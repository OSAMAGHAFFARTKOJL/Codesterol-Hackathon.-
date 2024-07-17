import React, { useState, useRef } from 'react';
import MistralClient from '@mistralai/mistralai';
import { FaSpinner } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import toast from 'react-hot-toast';


const CodeConversionAssistant = ({ apiKey }) => {
    const client = new MistralClient(apiKey);

    const [code, setCode] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [conversionResult, setConversionResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setCode(e.target.result);
        };
        reader.readAsText(file);
    };

    const convertCode = async () => {
        setLoading(true);
        try {
            const chatResponse = await client.chat({
                model: 'mistral-tiny',
                messages: [{ role: 'user', content: `Convert the following code to ${targetLanguage}:\n${code}` }],
            });

            setConversionResult(chatResponse.choices[0].message.content);
            return toast.success('Code converted successfully!');
        } catch (error) {
            return toast.error('Error converting code! Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Converted Code', 14, 20);
        doc.autoTable({
            startY: 30,
            head: [['Code']],
            body: [[conversionResult]],
            styles: { fontSize: 10 },
        });
        doc.save('Converted_Code.pdf');
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
            <input
                type="text"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                placeholder="Enter target language..."
                className="w-full p-4 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            />
            <button
                onClick={convertCode}
                className={`w-full px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 flex items-center justify-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={loading}
            >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Convert Legacy Code'}
            </button>
            {conversionResult && (
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Converted Code</h2>
                    <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md">{conversionResult}</pre>
                    <button
                        onClick={downloadPDF}
                        className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                    >
                        Download PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default CodeConversionAssistant;
