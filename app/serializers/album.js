exports.albumSerializer = album => ({
  title: album.title
});

exports.albumListSerializer = albums => albums.map(exports.albumSerializer);
