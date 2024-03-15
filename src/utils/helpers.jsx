export function getRealFileName(filepath){
    /**
     * This function captures the filepath and retirns the real filename
     * Every file has a timestamp attached to it and  isseparated  by an underscore. 
     * 
     */

    const imageArray = filepath.split('_')

    //remove timestamp
    imageArray.shift()

    return imageArray.join("_")
}