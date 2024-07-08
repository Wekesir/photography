import axios from "axios"
import { BACKEND_SERVER } from '../constants/constants'

export function clientTimeZone() {
  /**
   * This function returns the current user timezone automatically
   */
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function formatDate(date) {
  /**
   * This function formats the date
   * Takes in a date as a parameter 
   */
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getRealFileName(filepath){
    /**
     * This function captures the filepath and returns the real filename
     * Every file has a timestamp attached to it and  is separated  by an underscore. 
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