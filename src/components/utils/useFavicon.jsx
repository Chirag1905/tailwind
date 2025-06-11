// import { useEffect } from 'react';

// const useFavicon = (iconPath) => {
//   useEffect(() => {
//     const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
//     link.type = 'image/x-icon';
//     link.rel = 'shortcut icon';
//     link.href = iconPath;
//     document.getElementsByTagName('head')[0].appendChild(link);
//   }, [iconPath]);
// };

// export default useFavicon;

// utils/useFavicon.js
import { useEffect } from 'react';

export const useFavicon = () => {
  const setFavicon = (iconPath) => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = iconPath;
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  return setFavicon;
};