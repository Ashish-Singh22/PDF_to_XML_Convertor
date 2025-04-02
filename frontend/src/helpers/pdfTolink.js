const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/raw/upload`;

const uploadPDF = async (pdfFile) => {
    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("upload_preset", "XMLifyPdf"); // Ensure this preset exists in Cloudinary
    formData.append("resource_type", "raw"); // For PDFs and non-media files

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            console.error("Cloudinary Upload Failed:", response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        console.log("Cloudinary Response:", data);
        return data; // Cloudinary URL details

    } catch (error) {
        console.error("Upload Error (Network Issue?):", error);
        return null;
    }
};

export default uploadPDF;
