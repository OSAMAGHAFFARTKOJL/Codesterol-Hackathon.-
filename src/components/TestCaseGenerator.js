import React, { useState, useRef } from 'react';
import MistralClient from '@mistralai/mistralai';
import { FaSpinner } from 'react-icons/fa';

const TestCaseGenerator = ({ apiKey }) => {
    const client = new MistralClient(apiKey);

    const [code, setCode] = useState('');
    const [testCases, setTestCases] = useState('');
    const [loading, setLoading] = useState(false);
    const testCasesRef = useRef(null);

    const scrollToTestCases = () => {
        testCasesRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const generateTestCases = async () => {
        setLoading(true);
        try {
            const chatResponse = await client.chat({
                model: 'mistral-tiny',
                messages: [{ role: 'user', content: `Generate test cases for the following code:\n${code}` }],
            });

            setTestCases(chatResponse.choices[0].message.content);
            scrollToTestCases();
        } catch (error) {
            console.log('Error:', error.message);
        }
        setLoading(false);
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
            <button
                onClick={generateTestCases}
                className={`w-full px-6 py-2 bg-yellow-600 text-white font-semibold rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 flex items-center justify-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={loading}
            >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Generate Test Cases'}
            </button>
            {testCases && (
                <div ref={testCasesRef} className="mt-4">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Generated Test Cases</h2>
                    <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md">{testCases}</pre>
                </div>
            )}
        </div>
    );
};

export default TestCaseGenerator;
