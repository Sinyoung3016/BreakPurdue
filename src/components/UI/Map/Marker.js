/* eslint-disable class-methods-use-this */
import mapboxgl from 'mapbox-gl';

function makeMarker(src, place) {
  const div = document.createElement('div');
  div.style.backgroundImage = src;
  div.style.width = '30px';
  div.style.height = '40px';
  div.style.backgroundSize = '100%';
  div.style.cursor = 'pointer';
  div.addEventListener('mouseover', () => {});

  return div;
}

/**
 *
 * @param {*} param0
 */
class Marker extends mapboxgl.Marker {
  constructor({ tagSrc, place, id, lng, lat, map, address, date, numOfVisit, cityTag, placeTag, clickMarker }) {
    super(tagSrc ? makeMarker(tagSrc, place) : { color: 'red' });
    this.setLngLat([lng, lat]);
    this.addTo(map);
    if (clickMarker) {
      this.getElement().addEventListener('click', () => {
        this.onClick(clickMarker);
      });
    }

    this.id = id;
    this.place = place;
    this.address = address;
    this.date = date;
    this.numOfVisit = numOfVisit;
    this.cityTag = cityTag;
    this.placeTag = placeTag;
  }

  onClick(clickMarker) {
    clickMarker(this);
  }

  removeMarker() {
    this.remove();
  }

  updateMarker(entries) {
    Object.keys(entries).forEach((key) => {
      if (key === 'tagSrc') {
        this.getElement().style.backgroundImage = entries.tagSrc;
        return;
      }
      this[key] = entries[key];
    });
  }
}

export default Marker;
