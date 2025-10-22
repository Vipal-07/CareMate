

const uploadImageToCloudinary = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    uploadData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`, {
            method: "POST",
            body: uploadData
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
}

export default uploadImageToCloudinary;