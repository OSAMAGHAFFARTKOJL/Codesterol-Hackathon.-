import React from 'react';

const FileUploader = ({ onFileUpload }) => {
    return (
        <input
            type="file"
            accept=".txt,.js,.ts,.jsx,.tsx,.py,.htm,.html,.css"
            onChange={onFileUpload}
            className="mb-4"
        />
    );
};

export default FileUploader;
