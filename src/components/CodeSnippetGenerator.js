import React, { useState, useRef } from 'react';
import MistralClient from '@mistralai/mistralai';
import { FaSpinner } from 'react-icons/fa';

const CodeSnippetGenerator = ({ apiKey }) => {
    const client = new MistralClient(apiKey);

    const [description, setDescription] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [loading, setLoading] = useState(false);
    const snippetRef = useRef(null);

    const scrollToSnippet = () => {
        snippetRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const generateSnippet = async () => {
        setLoading(true);
        try {
            const chatResponse = await client.chat({
                model: 'mistral-tiny',
                messages: [{ role: 'user', content: `Generate a code snippet for: ${description}` }],
            });

            setGeneratedCode(chatResponse.choices[0].message.content);
            scrollToSnippet();
        } catch (error) {
            console.log('Error:', error.message);
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-3xl bg-white p-6 rounded-md shadow-md mb-6">
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                cols="50"
                placeholder="Describe the functionality..."
                className="w-full p-4 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            />
            <button
                onClick={generateSnippet}
                className={`w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={loading}
            >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Generate Snippet'}
            </button>
            {generatedCode && (
                <div ref={snippetRef} className="mt-4">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Generated Code Snippet</h2>
                    <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md">{generatedCode}</pre>
                </div>
            )}
        </div>
    );
};

export default CodeSnippetGenerator;
