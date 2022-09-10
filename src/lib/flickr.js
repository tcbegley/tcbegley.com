const queryString = require('query-string')

const DEFAULT_OPTIONS = {
  method: 'flickr.photos.search',
  extras:
    'description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o',
  per_page: 500,
  page: 1,
  format: 'json',
  nojsoncallback: 1,
}

function unwrap(data) {
  if (data.hasOwnProperty('photoset')) {
    return data.photoset
  }
  return data.photos
}

export default async function callFlickr(options) {
  const url = `https://api.flickr.com/services/rest/?${queryString.stringify({
    ...DEFAULT_OPTIONS,
    ...options,
  })}`
  const response = await fetch(url)
  const data = await response.json()

  const photos = unwrap(data)

  if (photos.page < photos.pages) {
    const extraPhotos = await callFlickr({
      ...DEFAULT_OPTIONS,
      ...options,
      page: photos.page + 1,
    })
    return [photos.photo, ...extraPhotos.photo]
  }

  return photos.photo
}
