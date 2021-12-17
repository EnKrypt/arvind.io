import { useState } from 'preact/hooks';

const PostImage = ({ image, post, slug }) => {
  const [zoomed, setZoomed] = useState(post ? true : false);
  return (
    <img
      alt="Article Preview"
      className="lazy"
      id={`img-${slug}`}
      src={image.placeholder}
      data-srcset={image.srcSet}
      data-sizes={
        post
          ? zoomed
            ? '(max-width: 768px) calc(100vw - 64px), 720px'
            : '(max-width: 768px) calc(100vw - 64px), 192px'
          : zoomed
          ? '(max-width: 768px) 256px, 560px'
          : '(max-width: 768px) 256px, 192px'
      }
      onClick={() => {
        setZoomed(!zoomed);
        document.getElementById(`matter-${slug}`).classList.toggle('zoom');
        window.LazyLoad.resetStatus(document.getElementById(`img-${slug}`));
        new window.LazyLoad().update();
      }}
    />
  );
};

export default PostImage;
