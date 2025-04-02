import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import uploadPDF from "../helpers/pdfTolink";
import { Link } from "react-router-dom";
import SummaryApi from "../common";
import Context from "../context";

const Home = () => {
  const user = useSelector((state) => state?.user?.user);
  const [file, setFile] = useState(null);
  const [Code, setCode] = useState("");
  const [loadingXML, setLoadingXML] = useState(false);
  const [loadingHTML, setLoadingHTML] = useState(false);


  const [pdfUrl, setPdfUrl] = useState("");
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const { fetchUserHistory } = useContext(Context);
  const [convertTo,setConvertTo] = useState("")


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvertXML = async () => {
    if (!file) return alert("Please select a PDF file.");
    setLoadingXML(true);
    setConvertTo("xml")

    try {
      const uploadPdfCloudinary = await uploadPDF(file);
      setPdfUrl(uploadPdfCloudinary.url);

      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await axios.post(
        "https://api.pdf.co/v1/file/upload",
        formData,
        {
          headers: {
            "x-api-key": process.env.REACT_APP_PDFCO_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.data?.url) {
        const uploadedFileUrl = uploadResponse.data.url;

        const conversionResponse = await axios.post(
          "https://api.pdf.co/v1/pdf/convert/to/xml",
          { url: uploadedFileUrl },
          {
            headers: {
              "x-api-key": process.env.REACT_APP_PDFCO_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        if (conversionResponse.data?.url) {
          const xmlResponse = await axios.get(conversionResponse.data.url);
          setCode(xmlResponse.data);

          const historyData = {
            userId: user?._id,
            pdfLink: uploadPdfCloudinary.url,
            code: xmlResponse.data,
            fileName: file?.name,
            type : "xml"
          };

         const response =  await fetch(SummaryApi.addHistory.url, {
            method: SummaryApi.addHistory.method,
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(historyData),
          });
          const dataResponse = await response.json()
          if(dataResponse.success){
            console.log("file saved xml")
          }

          
        } else {
          alert("Conversion failed. No XML URL returned.");
        }
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (apiError) {
      console.error("API Error:", apiError.response ? apiError.response.data : apiError.message);
      alert("Error occurred. Please try again.");
    } finally {
      setLoadingXML(false);
    }

    fetchUserHistory();
  };

  const handleConvertHTML = async () => {
    if (!file) return alert("Please select a PDF file.");
    setLoadingHTML(true);
    setConvertTo("html")

    try {
      const uploadPdfCloudinary = await uploadPDF(file);
      setPdfUrl(uploadPdfCloudinary.url);

      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await axios.post(
        "https://api.pdf.co/v1/file/upload",
        formData,
        {
          headers: {
            "x-api-key": process.env.REACT_APP_PDFCO_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.data?.url) {
        const uploadedFileUrl = uploadResponse.data.url;

        const conversionResponse = await axios.post(
          "https://api.pdf.co/v1/pdf/convert/to/html",
          { url: uploadedFileUrl },
          {
            headers: {
              "x-api-key": process.env.REACT_APP_PDFCO_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        if (conversionResponse.data?.url) {
          const xmlResponse = await axios.get(conversionResponse.data.url);
          setCode(xmlResponse.data);

          const historyData = {
            userId: user?._id,
            pdfLink: uploadPdfCloudinary.url,
            code: xmlResponse.data,
            fileName: file?.name,
            type : "html"
          };

          const response =  await fetch(SummaryApi.addHistory.url, {
            method: SummaryApi.addHistory.method,
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(historyData),
          });
          const dataResponse = await response.json()
          if(dataResponse.success){
            console.log("file saved html")
          }
        } else {
          alert("Conversion failed. No XML URL returned.");
        }
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (apiError) {
      console.error("API Error:", apiError.response ? apiError.response.data : apiError.message);
      alert("Error occurred. Please try again.");
    } finally {
      setLoadingHTML(false);
    }

    fetchUserHistory();
  };

  const handleDownloadFile = (url, filename) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Download error:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl px-2 md:px-4 lg:px-6">
      <h1 className="text-5xl font-bold text-green-400">Convert your</h1>
      <h2 className="text-4xl font-semibold text-gray-200">PDF to XML</h2>
      <p className="text-gray-300 mt-4 max-w-2xl">
        Upload a PDF and convert it to XML instantly.
      </p>

      {user ? (
        <div className="bg-gray-800 backdrop-blur-lg rounded-xl p-6 mt-8 w-full max-w-lg shadow-xl border border-gray-700 flex flex-col items-center">
          <div className="border-dashed border-2 border-gray-500 p-10 text-gray-300 text-sm rounded-lg flex flex-col items-center justify-center hover:bg-gray-700 transition w-full">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="cursor-pointer text-center">
              Drag & Drop file here <br />
              <span className="mt-2">OR</span>
              <div className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-md">
                Choose file
              </div>
            </label>
            <p className="text-xs mt-2">Maximum upload size: 100MB</p>
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-gray-800 backdrop-blur-lg rounded-xl p-6 mt-8 w-full max-w-lg shadow-xl border border-gray-700 text-center"
        >
          <p className="text-xs mt-2">Login to upload a file.</p>
        </Link>
      )}

      {file && (
        <div className="mt-6 text-gray-300 text-center w-full max-w-lg">
          <p className="text-lg font-semibold">📄 {file.name}</p>

          <div>
            <div className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-md">Convert To ...</div>
          </div>
          <div className="flex justify-center gap-4">
            {/* for xml */}
          <button
            id="1"
            onClick={handleConvertXML}
            className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-md"
            disabled={loadingXML}
          >
            {loadingXML ? "Converting..." : "XML"}
          </button>

           {/* for html */}
          <button
            id="2"
            onClick={handleConvertHTML}
            className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-md"
            disabled={loadingHTML}
          >
            {loadingHTML ? "Converting..." : "HTML"}
          </button>

           

          </div>

          {/* Buttons Row (Side by Side & Centered) */}
          {Code && (
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => handleDownloadFile(pdfUrl, file?.name || "download.pdf")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowPdfPreview(!showPdfPreview)}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg"
              >
                {showPdfPreview ? "Hide PDF Preview" : "Preview PDF"}
              </button>
              <button
                onClick={() => handleDownloadFile(URL.createObjectURL(new Blob([Code], { type: `text/${convertTo}` })), `converted.${convertTo}`)}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg"
              >
                Download {convertTo}
              </button>
            </div>
          )}
        </div>
      )}

      {/* PDF Preview Section (Only shows after clicking Preview PDF button) */}
      {showPdfPreview && pdfUrl && (
        <div className="mt-6 w-full max-w-lg">
          <h3 className="text-green-400 text-lg font-semibold">📑 PDF Preview:</h3>
          <iframe
            src={pdfUrl}
            className="w-full h-96 mt-2 border-2 border-gray-700 rounded-lg"
            title="PDF Preview"
          ></iframe>
        </div>
      )}

      {/* XML Preview Section */}
      {Code && (
        <div className="mt-6 p-4 bg-gray-900 text-gray-300 rounded-lg text-left overflow-auto max-h-64 w-full max-w-lg">
          <h3 className="text-green-400">Converted {convertTo}:</h3>
          <pre className="text-xs whitespace-pre-wrap">{Code}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
