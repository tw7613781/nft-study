import { ethers, Contract } from 'ethers';
import NFT from './contracts/NFT.json';

const getBlockchain = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window && window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        if (window.ethereum.networkVersion !== '3') {
          return reject(new Error('metamask is not in the ropsten network'));
        }
        const nft = new Contract(
          NFT.networks[window.ethereum.networkVersion].address,
          NFT.abi,
          signer
        );

        resolve({ nft });
      }
      resolve({ nft: undefined });
    });
  });
}

export default getBlockchain;