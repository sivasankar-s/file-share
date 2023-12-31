import React, { useState, useRef, useEffect } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../public/bg.jpg';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy link');
  const [isLoading, setIsLoading] = useState(false);

  // Ref to the video element
  // const videoRef = useRef(null);

  // useEffect(() => {
  //   // Set the initial playback rate when the component mounts
  //   if (videoRef.current) {
  //     videoRef.current.playbackRate = 0.5; // Adjust the playback rate as needed
  //   }
  // }, []);

  // const storage = getStorage();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      setIsLoading(true);
      // Set a faster playback rate while uploading
      // if (videoRef.current) {
      //   videoRef.current.playbackRate = 2; // Adjust the faster playback rate as needed
      // }
      // const storageRef = storage.ref();
      // const fileRef = storageRef.child(file.name);
      let urll='';
      const fileRef = ref(storage, file?.name)
      uploadBytes(fileRef, file)
              .then(async () => {
                getDownloadURL(fileRef).then((url)=> {
                  console.log(url)
                  setDownloadURL(url)
                  urll = url
                  // { downloadURL && 
                    setTimeout(async function() {
                      console.log("Delayed function executed");
      
                      const bitlyToken = 'vhGUS6YlIVa3teDz7vmOZVph4AHjuGefTjHImtSdF59KrfsfGXtM96lYbh8J';
                    const longURL = downloadURL;
                    console.log(urll)
                    await axios
                      .post(
                        'https://api.tinyurl.com/create',
                        {
                          'url': `${urll}`,
                          'domain': "tinyurl.com"
                        },
                        {
                          headers: {
                            'accept': `application/json`,
                            'Authorization': `Bearer ${bitlyToken}`,
                            'Content-Type': 'application/json'
                          },
                        }
                      )
                      // axios.post('',{},)
                      // axios.post(
                      //   {
                      //     group_guid: "Ba1bc23dE4F",
                      //     domain: "bit.ly",
                      //     long_url: "https://dev.bitly.com"
                      //   }
                      // )
                      .then((response) => {
                        setShortenedURL(response.data.data.tiny_url);
                        // console.log(shortenedURL)
                        console.log(response.data.data.tiny_url)
                        setIsLoading(false);

                        // Reset playback rate after uploading
                        // if (videoRef.current) {
                        //   videoRef.current.playbackRate = 0.5; // Adjust the initial playback rate as needed
                        // }
                      });
                    }, 2000);
                  // }
                })
              })

              
              
            

      // fileRef.put(file).then(() => {
      //   fileRef.getDownloadURL().then((url) => {
      //     setDownloadURL(url);
      //   });
      // });
    }
  };

  const copyToClipboard = () => {
    if (shortenedURL) {
      const textArea = document.createElement('textarea');
      textArea.value = shortenedURL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyButtonText('Copied!');

      // Reset the button text after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setCopyButtonText('Copy link');
      }, 3000);
    }
  }

  const handleBack = () => {
    // Reset all state values to their initial state
    setFile(null);
    setShortenedURL('');
    setOriginalURL('');
    setCopyButtonText('Copy to Clipboard');
    setIsLoading(false);

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Adjust the initial playback rate as needed
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-100"
    style={{ background: `url(../galaxy.jpg) no-repeat center fixed`,
    backgroundSize: 'cover' }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 min-w-full min-h-full object-cover"
      >
        <source src="bga1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="max-w-screen-md w-full p-6 text-center bg-black bg-opacity-80 rounded-lg shadow-md z-10">
      {/* bg-clip-text bg-gradient-to-br mb-5 from-indigo-600 to-purple-400 */}
        
        
        {shortenedURL ? (
          <>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-l mb-14 from-violet-800 to-pink-600">Your file is ready to share!</h1>

          <div className="mt-4">
          <h2 className="text-2xl font-medium text-transparent mb-4 text-white">Copy the link to share your file</h2>
            {/* <p className='text-white rounded border mb-6 text-xl'>
              <span className="py-2">{shortenedURL}</span> 
              
            </p> */}
            <input value={shortenedURL} className='text-white rounded border mb-6 text-xl w-3/5 text-center bg-transparent' />

            <button
          className="bg-fuchsia-300 text-black py-2 px-4 rounded ml-4 mr-5 mb-5 hover:bg-fuchsia-500"
          onClick={copyToClipboard}
        >
          {copyButtonText}
        </button>
        <button
              className="bg-slate-300 text-black py-2 px-4 rounded ml-2 hover:bg-slate-400"
              onClick={handleBack}
            >
              Upload another file
            </button>
            
            {/* <a
              href={shortenedURL}
              className="text-blue-500 hover:underline mt-2 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download File (Shortened)
            </a> */}
          </div>
          </>
        ) : (
          <>
          <h1 className="text-4xl font-bold text-transparent text-white">Select file to send</h1>
        <input
          type="file"
          className="border mt-14 text-white border-gray-300 p-2 rounded mb-4"
          onChange={handleFileChange}
        />
        <button
          className="bg-fuchsia-300 text-black font-semibold py-2 px-4 mt-20 rounded ml-8 hover:bg-fuchsia-500"
          onClick={handleUpload}
        >
          Upload
        </button>
        {isLoading && (
          <div className="text-white mb-4 flex items-center justify-center">
            <div className="mr-2 animate-spin">&#9696;</div>
            <p className='text-white'>Uploading and generating link...</p>
          </div>
        )}
        </>
        )
        }
      </div>
    </div>
  );
}

export default App;
