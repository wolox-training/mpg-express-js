exports.albumSerializer = album => ({
  title: album.title
});

exports.photosListSerializer = photos =>
  photos.map(photo => ({
    album_id: photo.albumId,
    title: photo.title,
    url: photo.url,
    thumbnail_url: photo.thumbnailUrl
  }));
