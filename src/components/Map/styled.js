import styled from '@emotion/styled';

export const MapContainer = styled.div`
  position: absolute;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;

  .mapboxgl-ctrl-logo,
  .mapboxgl-ctrl-attrib {
    display: none !important;
  }
`;

export const SearchBox = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 20px;

  input[type='text'] {
    height: 40px;
    outline: none;
  }
  svg {
    top: 9px;
  }
`;
