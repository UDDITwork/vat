interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    resource_type: string;
    format: string;
    bytes: number;
    error?: {
        message: string;
    };
}

export const uploadResume = async (file: File): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration missing. Please check environment variables.');
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
        throw new Error('Only PDF files are allowed');
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        throw new Error('File size exceeds 10MB limit');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('resource_type', 'raw'); // Use 'raw' for PDFs and other non-image files

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data: CloudinaryUploadResponse = await response.json();

        if (data.error) {
            throw new Error(data.error.message || 'Upload failed');
        }

        if (!data.secure_url) {
            throw new Error('No URL returned from Cloudinary');
        }

        return data.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error instanceof Error ? error : new Error('Failed to upload file');
    }
};

// Optional: Delete file from Cloudinary (requires API key - would need backend)
// For now, we'll just handle uploads from frontend
