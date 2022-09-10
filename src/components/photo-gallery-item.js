import Image from 'next/image'

function PhotoGalleryItem({
  description,
  onImageLoad,
  onImageError,
  original,
  originalAlt,
  originalWidth,
  originalHeight,
  sizes,
  srcSet,
}) {
  return (
    <>
      <div className="image-gallery-image">
        <Image
          src={original}
          width={originalWidth}
          height={originalHeight}
          alt={originalAlt}
          srcSet={srcSet}
          sizes={sizes}
          onLoad={onImageLoad}
          onError={onImageError}
          placeholder="blur"
          layout="responsive"
        />

        {description && (
          <span className="image-gallery-description">{description}</span>
        )}
      </div>
    </>
  )
}

export default PhotoGalleryItem
