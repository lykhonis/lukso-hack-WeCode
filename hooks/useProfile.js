import { useEffect, useState } from 'react';
import { resolveUrl } from '../lukso/ipfs';
import getErc725 from '../lukso/erc725'

function findMostSuitableImage({ images, minWidth, minHeight }) {
  return images.find(image => {
    let good = true;
    if (minWidth && minWidth > image.width) {
      good = false;
    }
    if (minHeight && minHeight > image.height) {
      good = false;
    }
    return good;
  });
}

export default function useProfile({ address }) {
  const erc725 = getErc725({ address });
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const profileData = await erc725.fetchData('LSP3Profile');
        const profileImage = findMostSuitableImage({
          images: profileData.LSP3Profile.LSP3Profile.profileImage,
          minWidth: 100,
        });
        setData({
          imageUrl: resolveUrl(profileImage.url),
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [erc725]);

  return data;
}
