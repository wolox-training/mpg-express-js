exports.albumSerializer = album => ({
  title: album.title
});

exports.albumListSerializer = albums => albums.map(exports.albumSerializer);

exports.photosListSerializer = photos =>
  photos.map(photo => ({
    album_id: photo.albumId,
    title: photo.title,
    url: photo.url,
    thumbnail_url: photo.thumbnailUrl
  }));
