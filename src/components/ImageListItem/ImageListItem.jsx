import { saveAs } from "file-saver";
import "./ImageListItem.css";

export function ImageListItem({ img }) {
  async function saveImage(e) {
    e.preventDefault();
    let blob = await fetch(img.download_url).then((r) => r.blob());
    saveAs(blob, img.author + "" + img.id);
  }
  return (
    <li>
      <div className="card">
        <a href={img.url}>
          <img src={img.download_url} alt="" className="img" />
        </a>
        <div className="card__header">
          <img className="card__thumb" src={img.download_url} alt="" />
          <div>
            <h3 className="card__title">{img.author}</h3>
            <span className="card__status">
              Original size : {img.width}x{img.height}
              <div>
                <button onClick={saveImage}>Download</button>
              </div>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

/*


      <img
        src={img.download_url}
        style={{ height: 200, width: 300 }}
        alt="img"
      />
      <div>Auteur : {img.author}</div>
      <div>
        Taille originale : {img.width}x{img.height}
      </div>
      <div>
        <a href={img.url}>Site source</a>
      </div>
      <button
        onClick={async () => {
          let blob = await fetch(img.download_url).then((r) => r.blob());
          saveAs(blob, img.author + "" + img.id);
        }}
      >
        Download
      </button>
    </li>

    */
