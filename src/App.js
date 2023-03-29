import { useState } from 'react';

import { ConnectWallet } from "@thirdweb-dev/react";
import { useBuyListing,NFT_Renderer } from "./marketplace";
import { MediaRenderer } from "@thirdweb-dev/react";



import "./styles/Home.css";



export default function Home() {


  const [listingId, setListingId] = useState(0);
  const [quantityDesired, setQuantityDesired] = useState(1);
  const buyListing = useBuyListing();


  

  const handleBuyClick = () => {
    buyListing(listingId, quantityDesired);
  };

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://thirdweb.com/">thirdweb</a>!
        </h1>

        <p className="description">
          Get started by configuring your desired network in{" "}
          <code className="code">src/index.js</code>, then modify the{" "}
          <code className="code">src/App.js</code> file!
        </p>

        <div className="connect">
          <ConnectWallet />
        </div>

        <div className="grid">
          <a href="https://portal.thirdweb.com/" className="card">
            <h2>Portal &rarr;</h2>
            <p>
            
            </p>
          </a>
          <div>
      <label>
        Listing ID:
        <input type="number" value={listingId} onChange={(event) => setListingId(event.target.value)} />
      </label>
      <label>
        Quantity:
        <input type="number" value={quantityDesired} onChange={(event) => setQuantityDesired(event.target.value)} />
      </label>
      <button onClick={handleBuyClick}>Buy Listing</button>

    
 <NFT_Renderer/>


    
 

    </div>

          <a href="https://thirdweb.com/dashboard" className="card">
            <h2>Dashboard &rarr;</h2>
            <p>
              Deploy, configure and manage your smart contracts from the
              dashboard.
            </p>
          </a>

          <a href="https://portal.thirdweb.com/templates" className="card">
            <h2>Templates &rarr;</h2>
            <p>
              Discover and clone template projects showcasing thirdweb features.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
