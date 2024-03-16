import axios from "axios"
import { BACKEND_SERVER } from '../constants/constants'

export function getRealFileName(filepath){
    /**
     * This function captures the filepath and retirns the real filename
     * Every file has a timestamp attached to it and  is separated  by an underscore. 
     * 
     */

    const imageArray = filepath.split('_')

    //remove timestamp
    imageArray.shift()

    return imageArray.join("_")
}

export function handleDownloadFile(fileInfo) {
    const filename = fileInfo.filename;
  
    axios.post( BACKEND_SERVER + '/files/download-file.php' , { fileInfo } , { responseType: 'blob' })
      .then((response) => {

              // Create a temporary URL for the file
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a link and trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Change the filename as needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading file:', error)
      });
}