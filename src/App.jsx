/* eslint-disable */
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useScrollPosition } from "./hooks/useScrollPosition";
import throttle from "lodash.throttle";
import { ImageList } from "./components/ImageList/ImageList";
import s from "./App.module.css";

const MIN_TIME_BFR_NEXT_FETCH = 5000;

export function App() {
  const [imageList, setImageList] = useState([]);
  const [pageToFetch, setPageToFetch] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { isBottom } = useScrollPosition();

  // Fetch les images à chaque changement de pages
  useEffect(() => {
    fetchImgListByPage();
  }, [pageToFetch]);

  // La page a été incrémenté et on est en bas de la page, alors on fetch de nouvelles images
  useEffect(() => {
    if (isBottom) {
      setIsLoading(true);
      throttledSetNextPage();
    }
  }, [isBottom, pageToFetch]);

  // return a version of incrementPage that can't be called more than once every 2 secondes
  // We also use useCallback to make sure we use the same version of the throlled function
  const throttledSetNextPage = useCallback(
    throttle(incrementPage, MIN_TIME_BFR_NEXT_FETCH),
    []
  );

  function incrementPage() {
    setPageToFetch((pageToFetch) => pageToFetch + 1);
  }

  // Fetch 10 images à la page “pageToFetch" de l'api de lorem picsum
  // Ajoute ensuite les 10 images à la liste des données

  async function fetchImgListByPage() {
    console.log("Fetch page ", pageToFetch);
    const imgListResp = (
      await axios(`https://picsum.photos/v2/list?page=${pageToFetch}&limit=10`)
    ).data;
    setImageList([...imageList, ...imgListResp]);
    setIsLoading(false);
  }

  return (
    <div className={s.root}>
      <h1>Rand'images</h1>
      <h2 className={s.subtitle}>Scroll to get random open source images</h2>
      <ImageList imageList={imageList} />
      {isLoading && <div className="spinner-border" role="status" />}
    </div>
  );
}

/*
const d = [
  {
    id: "0",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/yC-Yzbqy7PY",
    download_url: "https://picsum.photos/id/0/5000/3333",
  },
  {
    id: "1",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/LNRyGwIJr5c",
    download_url: "https://picsum.photos/id/1/5000/3333",
  },
  {
    id: "2",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/N7XodRrbzS0",
    download_url: "https://picsum.photos/id/2/5000/3333",
  },
  {
    id: "3",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/Dl6jeyfihLk",
    download_url: "https://picsum.photos/id/3/5000/3333",
  },
  {
    id: "4",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/y83Je1OC6Wc",
    download_url: "https://picsum.photos/id/4/5000/3333",
  },
  {
    id: "5",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3334,
    url: "https://unsplash.com/photos/LF8gK8-HGSg",
    download_url: "https://picsum.photos/id/5/5000/3334",
  },
  {
    id: "6",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/tAKXap853rY",
    download_url: "https://picsum.photos/id/6/5000/3333",
  },
  {
    id: "7",
    author: "Alejandro Escamilla",
    width: 4728,
    height: 3168,
    url: "https://unsplash.com/photos/BbQLHCpVUqA",
    download_url: "https://picsum.photos/id/7/4728/3168",
  },
  {
    id: "8",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3333,
    url: "https://unsplash.com/photos/xII7efH1G6o",
    download_url: "https://picsum.photos/id/8/5000/3333",
  },
  {
    id: "9",
    author: "Alejandro Escamilla",
    width: 5000,
    height: 3269,
    url: "https://unsplash.com/photos/ABDTiLqDhJA",
    download_url: "https://picsum.photos/id/9/5000/3269",
  },
  {
    id: "10",
    author: "Paul Jarvis",
    width: 2500,
    height: 1667,
    url: "https://unsplash.com/photos/6J--NXulQCs",
    download_url: "https://picsum.photos/id/10/2500/1667",
  },
  {
    id: "11",
    author: "Paul Jarvis",
    width: 2500,
    height: 1667,
    url: "https://unsplash.com/photos/Cm7oKel-X2Q",
    download_url: "https://picsum.photos/id/11/2500/1667",
  },
  {
    id: "12",
    author: "Paul Jarvis",
    width: 2500,
    height: 1667,
    url: "https://unsplash.com/photos/I_9ILwtsl_k",
    download_url: "https://picsum.photos/id/12/2500/1667",
  },
  {
    id: "13",
    author: "Paul Jarvis",
    width: 2500,
    height: 1667,
    url: "https://unsplash.com/photos/3MtiSMdnoCo",
    download_url: "https://picsum.photos/id/13/2500/1667",
  },
  {
    id: "14",
    author: "Paul Jarvis",
    width: 2500,
    height: 1667,
    url: "https://unsplash.com/photos/IQ1kOQTJrOQ",
    download_url: "https://picsum.photos/id/14/2500/1667",
  },
  {
    id: "15",
    author: "Paul Jarvis",
    width: 2500,
    height: 1667,
    url: "https://unsplash.com/photos/NYDo21ssGao",
    download_url: "https://picsum.photos/id/15/2500/1667",
  },
  {
    id: "16",
    author: "Paul Jarvis",
    width: 2500,
    height: 1667,
    url: "https://unsplash.com/photos/gkT4FfgHO5o",
    download_url: "https://picsum.photos/id/16/2500/1667",
  },
  {
    id: "17",
    author: "Paul Jarvis",
    width: 2500,
    height: 1667,
    url: "https://unsplash.com/photos/Ven2CV8IJ5A",
    download_url: "https://picsum.photos/id/17/2500/1667",
  },
];

*/
