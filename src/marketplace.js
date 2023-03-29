import { useContract } from '@thirdweb-dev/react';
import { useCallback } from 'react';
import { marketplaceaddress,erc_1155_adress } from './adresses';
import { useState, useEffect } from 'react';

import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { SongbirdCanaryNetwork } from "@thirdweb-dev/chains";

const ipfsGateway = "https://ipfs.thirdwebcdn.com/ipfs/";



export const useBuyListing = () => {
  const { contract } = useContract(marketplaceaddress, "marketplace");

  const buyListing = useCallback(async (listingId, quantityDesired) => {
    await contract.buyoutListing(listingId, quantityDesired);
  }, [contract]);

  return buyListing;
};



export function NFT_Renderer({ tokenIds = [""] }) {
  const [imageValues, setImageValues] = useState([]);

  

  useEffect(() => {
    async function fetchURIs() {
      const sdk = new ThirdwebSDK(SongbirdCanaryNetwork);
      const contract = await sdk.getContract(
        erc_1155_adress // the smart contract the be rendered
      );
      const nfts = await contract.erc1155.getAll(); //calls the blockchain, gets back a tuple
      console.log(Object.keys(nfts)); // since we only need the key for the ID, we need to decontruct here
      tokenIds = Object.keys(nfts); // the Array gets written in tokenIds, there is a warning, but it works for now


      const uriPromises = tokenIds.map((tokenId) =>
        contract.call("uri", tokenId)
      );
      const URIs = await Promise.all(uriPromises);
      const ipfsUrls = URIs.map((URI) => URI.replace("ipfs://", ipfsGateway));
      const imagePromises = ipfsUrls.map((ipfsUrl) =>
        fetch(ipfsUrl).then((response) => response.json())
      );
      const imageData = await Promise.all(imagePromises);
      const imageUrls = imageData.map((data) =>
        data.image.replace("ipfs://", ipfsGateway)
      );
      setImageValues(imageUrls);
    }
    fetchURIs();
  }, [tokenIds]);

  return (
    <div>
      {/* Display the images if they have been fetched */}
      {imageValues.length > 0 ? (
        imageValues.map((imageValue, index) => (
          <img key={index} src={imageValue} alt={`NFT ${index}`} />
        ))
      ) : (
        // Display a loading message while the images are being fetched
        <p>Loading NFT images...</p>
      )}
    </div>
  );

}

