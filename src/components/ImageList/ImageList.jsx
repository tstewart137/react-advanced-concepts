import { ImageListItem } from "../ImageListItem/ImageListItem";
import s from "./ImageList.module.css";
export function ImageList({ imageList }) {
  return imageList.map((img) => (
    <ul className={s.cards} key={img.id}>
      <ImageListItem img={img} />
    </ul>
  ));
}
