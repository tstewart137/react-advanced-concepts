import { useEffect, useState } from "react";
import { ImageList } from "./components/ImageList/ImageList";
import s from "./App.module.css"
import { useScrollPosition } from "./hooks/useScrollPosition";
import axios from "axios";

export function App() {
  const [imageList, setImageList] = useState([])
  const {isBottom} = useScrollPosition();
  const [isLoading, setIsLoading] = useState(false);

//store the page number to fetch
const [pageToFetch, setPageToFetch] = useState(1);

// listen to pageToFetch

useEffect(() =>{
  fetchImagesByPage(pageToFetch)
  },[pageToFetch])

  // listen to isBottom, then increasePage and reload
useEffect(() =>{
  if (isBottom){
  increasePage()
  }
},[isBottom])

//function to fetch 5 more images

async function fetchImagesByPage(pageNumber) {
  setIsLoading(true)
  const {data} = await axios(`https://picsum.photos/v2/list?page=${pageNumber}&limit=5`)

  //add the new images to imageList
  setImageList([...imageList, ...data])
  setIsLoading(false)
}

function increasePage(){
  setPageToFetch(pageToFetch + 1)
}


  return (
  <div className={s.root}>
    <h1>Rand'images</h1>
    <h2>Download random open source images</h2>
    <ImageList imageList={imageList} />
    {isLoading && <div className="spinner-boarder" role="status" />}
  </div>
  );
}

