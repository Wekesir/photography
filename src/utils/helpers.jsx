import axios from "axios"
import { BACKEND_SERVER } from '../constants/constants'
import UserContext from "../contexts/UserContext"
import { useContext } from "react"

export function isLoggedIn(){
  const { loggedInUserData } = useContext(UserContext)

  return ( !loggedInUserData || !!loggedInUserData) ? false : true
}

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

export function handleDownloadFolder(folderDetails) {
  axios.post(BACKEND_SERVER + "/projects/download-project.php", folderDetails, {responseType : 'blob'})
      .then(response => {
           // Create a blob URL for the zip file
          const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement('a')
          link.href = blobUrl
          link.download = folderDetails.project_name + '.zip';
          document.body.appendChild(link);
          link.click();
    
          // Clean up the link and revoke the blob URL
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
          alert("Error downloading project : " + error)
      })
}