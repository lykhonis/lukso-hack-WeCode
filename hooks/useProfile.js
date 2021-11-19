import { useEffect, useState } from 'react';
import { resolveUrl } from '../lukso/ipfs';
import getErc725 from '../lukso/erc725'

function findMostSuitableImage({ images, minWidth, minHeight }) {
  return images?.find(image => {
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
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const erc725 = getErc725({ address });
        const data = await erc725.fetchData('LSP3Profile');
        // ???
        const profile = data?.LSP3Profile?.LSP3Profile?.profile?.LSP3Profile;
        console.log(profile);
        if (!profile) return;
        const profileImage = findMostSuitableImage({
          images: profile.profileImage,
          minWidth: 100,
        });
        setData({
          name: profile.name,
          description: profile.description,
          imageUrl: resolveUrl(profileImage?.url),
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return data;
}
