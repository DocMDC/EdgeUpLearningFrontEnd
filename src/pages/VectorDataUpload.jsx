import React, { useState, useEffect } from 'react'
import { storage } from "../config/firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

export default function 
() {
    const [fileUpload, setFileUpload] = useState(null)
    const [pdfList, setPdfList] = useState([])
    const pdfListRef = ref(storage, "pdfs/")

    const uploadFile = async () => {
      if (fileUpload == null) return;
      console.log(fileUpload);
  
      const pdfRef = ref(storage, `pdfs/${fileUpload.name + v4()}`);
  
      try {
        const snapshot = await uploadBytes(pdfRef, fileUpload);
        const url = await getDownloadURL(snapshot.ref);
        setPdfList((prev) => [...prev, url]);
        console.log('Successful file upload');
      } catch (error) {
        console.error(error);
      }
    };
   
  return (
    <>
        <div className="bg-orange-400 h-96 w-96 flex flex-col items-center justify-center">
            <input 
                type="file" 
                onChange={(e) => {setFileUpload(e.target.files[0])}}
            />
            <button onClick={uploadFile} className="bg-gray-300 w-36 rounded-md p-2">Upload</button>
        </div>
    </>
  )
}

/*
import React, {useState, useCallback, useEffect} from 'react'
import { db } from "../../config/firebase"
import { storage } from "../../config/firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { useDropzone } from 'react-dropzone';
import {FaTimesCircle} from "react-icons/fa"


export default function TeacherDocuments() {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const pdfListRef = ref(storage, "pdfs/")

  useEffect(() => {
    listAll(pdfListRef).then((response) => {
      response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setPdfList((prev) => [...prev, url])
          })
      })
      console.log(response)
  })
    /*
    const fetchData = async () => {
      try {
        const response = await listAll(pdfListRef);
        const fetchPDFs = response.items.map(async (item) => {
          const pdfUrl = await getDownloadURL(item);
          return pdfUrl;
        });

        const pdfUrls = await Promise.all(fetchPDFs);
        setPdfList(pdfUrls);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    fetchData(); 
  }, [files]);

  const uploadFile = async () => {
    if (files.length === 0) {
      console.log('No files to upload');
      return;
    }
  
    try {
      const uploadedUrls = [];
      
      for (const file of files) {
        const pdfRef = ref(storage, `pdfs/${file.name}`);
        const snapshot = await uploadBytes(pdfRef, file);
        const url = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(url);
      }
  
      setFiles((prev) => [...prev, ...uploadedUrls]);
      alert('Upload successful');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      uploadFile();
    }
  }, [files]);
  

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Do something with the files
    if (acceptedFiles?.length) {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }
    if (rejectedFiles?.length) {
      setRejected((prevFiles) => [...prevFiles, ...rejectedFiles]);
    }
  }, []);
  

  // const removeFile = (fileName) => {
  //   const updatedFiles = files.filter(file => file.name !== fileName);
  //   setFiles(updatedFiles);
  // };

  // const removeRejected = (name, e) => {
  //   e.preventDefault()
  //   const updatedFiles = rejected.filter(({file}) => file.name !== name)
  //   setRejected(updatedFiles)
  // }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
    },
  });

  return (
    <div className="bg-300 w-full pb-4">
      <div className="bg-100 h-12 flex items-center justify-center text-xl tracking-wider text-500">
        <h1>Documents</h1>
      </div>
      <div className="bg-100 mt-4 min-h-[1000px]">
        <div className="flex flex-col p-4">
          <div {...getRootProps({
            className: isDragActive ? "h-36 w-full border-dashed border-600 border-2 p-4 flex items-center justify-center rounded-md cursor-pointer" : "h-36 w-full border-dashed border-800 border-2 p-4 flex items-center justify-center rounded-md cursor-pointer",
          })}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Dropping ...</p> :
                <p>Drop PDFs here, or click to select files</p>
            }
          </div>
            
          
          {files.length > 0 && 
          <div className="w-full mt-4">
            <h2 className="text-center bg-700 px-2 text-100 inline-block">Preview uploads:</h2>
            <ul className="flex flex-col space-y-2 mt-4">
              {files.map(file => (
                <li key={file.name}>
                  <div className="relative inline-block">
                    <a 
                      href={URL.createObjectURL(file)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-800 text-100 px-2 py-1 rounded-md"
                    >
                        {file.name}
                    </a>
                    <FaTimesCircle
                      className="absolute -top-2 -right-3 cursor-pointer text-600 hover:text-700"
                      onClick={() => removeFile(file.name)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>}

          
          { rejected.length > 0 &&
          <div className="w-full mt-4">
            <h2 className="bg-700 px-2 text-100 inline-block">Rejected Files:</h2>
              {rejected.map(({file, errors}) => (
                <div key={file.name} className="flex items-center space-x-4 space-y-2">
                  <p>{file.name}</p>
                  <span>|</span>
                  <ul>
                    {errors.map(error => (
                        <li key={error.code}>{error.message}</li>
                    ))}
                  </ul>
                  <span>|</span>
                  <button className="bg-500 px-2 cursor-pointer rounded-md hover:bg-gray-400" onClick={(e) => removeRejected(file.name, e)}>Delete</button>
                </div>
              ))}
          </div>} 
        </div>
      </div>
    </div>

  );
}

*/