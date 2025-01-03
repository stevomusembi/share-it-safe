'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';


export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setShareableLink(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Upload failed');
      }

      const { key } = uploadData;


      const urlResponse = await fetch('/api/getPresignedUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key })
      });

      const urlData = await urlResponse.json();

      if (!urlResponse.ok) {
        throw new Error(urlData.error || 'Failed to get presigned URL');
      }

      setShareableLink(urlData.presignedUrl);
      setExpiresAt(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong');
      } else {
        setError('Something went wrong');
      }
    
  } finally {
    setLoading(false);
  }
};

const handleCopy = () => {
  if (shareableLink) {
    navigator.clipboard.writeText(shareableLink);
    toast.success('Link copied to clipboard!');
  }
};

return (
  <main className="flex flex-col items-center min-h-screen py-20">
    <div className="p-4">
      <h1 className="p-4 text-4xl font-bold text-center text-blue-700">
        Share It Safe
      </h1>
      <p className="text-gray-500 text-center">
        Upload a file and a secure link will be generated for you
      </p>
    </div>

    <div className="mt-5 p-2 md:p-4 flex flex-col md:flex-row items-center">
      <input
        type="file"
        onChange={handleFileSelect}
        className="border border-gray-300 rounded-md p-2 text-gray-400 w-full md:w-auto"
      />
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`${loading || !file
          ? 'bg-blue-300'
          : 'bg-blue-500 hover:bg-blue-600'
          } py-2 px-6 rounded-sm text-white font-bold mt-4 md:mt-0 md:ml-4 transition-colors`}
      >
        {loading ? 'Uploading...' : 'Share'}
      </button>
    </div>

    {error && (
      <div className="mt-4 text-red-500 text-center">
        {error}
      </div>
    )}

    {shareableLink && (
      <div className="mt-8 px-12 py-6 bg-green-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-green-700">
          File uploaded successfully!
        </h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={shareableLink}
            readOnly
            className="p-2 border rounded bg-white w-full"
          />
          <p className="text-sm text-gray-600">
            This link will expire in 24 hours at {expiresAt ? new Date(expiresAt).toLocaleString() : 'N/A'}
          </p>
          <button
            onClick={handleCopy}
            // onClick={() => navigator.clipboard.writeText(shareableLink)}
            className="p-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            <span>
              Copy Link
            </span>
          </button>
        </div>
      </div>
    )}
  </main>
);
}
