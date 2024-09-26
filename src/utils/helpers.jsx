import axios from "axios"
import { BACKEND_SERVER } from '../constants/constants'

export function handleZoom(e){ 
  /**
   * When implementing this function, make sure to also import
   * const [scale, setScale] = useState(1);
   * And also, in the img element add,  style={{ transform: `scale(${scale})` }}
   */
  e.preventDefault()
  
  const delta = e.deltaY //captures the direction and intensity of the wheel movement.
  const zoomSpeed = 0.1

  setScale(prevScale => {
    const newScale = delta > 0 ? prevScale - zoomSpeed : prevScale + zoomSpeed
    
    return Math.min(Math.max(newScale, 0.5), 3); //keeps the scale between 0.5 and 3.
  });
}

export function formatFileSize(sizeInBytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

export function getFileNameExtension(filename){
  const parts = filename.split(".")
  return (parts.length > 1) ? parts.pop().toLowerCase() : ""
}

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

    const fileArray = filepath.split('_')

    //remove timestamp
    fileArray.shift()

    return fileArray.join("_")
}

export function handleDownloadFile(fileInfo) {
    const filename = fileInfo.filename;
  
    axios.post( `${BACKEND_SERVER}/files/download-file.php` , { fileInfo } , { responseType: 'blob' })
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
      })
}

export function handleDownloadFolder(folderDetails) {
  axios.post(`${BACKEND_SERVER}/projects/download-project.php`, folderDetails, {responseType : 'blob'})
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