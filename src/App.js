import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { loadContract } from './utils/load-contract'
import React from 'react';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [account, setAccount] = useState(null)
  const [amount, setAmount] = useState(null)
  const [web3Api, setWeb3Api] = useState({
    provider:null,
    web3:null,
    contract:null
    })

    useEffect(()=>{
      const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract("Airbnb", provider)
      if(provider){
        setWeb3Api(
        {
          provider:provider,
          web3: new Web3(provider),
          contract:contract
        }
        )
      }
      else {
        console.log("Pleas install MetaMask")
        }
        }
        loadProvider()
        },[])


        useEffect(() => {
          const getAccount = async () => {
          const accounts = await web3Api.web3.eth.getAccounts()
            setAccount(accounts[0])
            setAmount (web3Api.web3.utils.fromWei((await web3Api.web3.eth.getBalance(accounts[0])), "ether"))
          }
          web3Api.web3 && getAccount()
          },[web3Api.web3])
          


return (
    <div className="App" > 
      <div style={{fontSize:'20px',backgroundColor: 'black', color: 'white'}}>The connected account is: {account}, the balance of the connected account is: {amount} Ether </div> 
    
     <nav style={{  border: '3px solid', textAlign: 'center', display: 'flex' , listStyle: 'none', padding: 0 ,backgroundColor:'black', borderColor:'#CBCBCB',borderRadius:'10px'}}>
        <ul style={{ marginLeft: '75px', marginRight: '75px',display: 'inline-block', listStyle: 'none', padding: 0 }}>
          <li onClick={() => handlePageChange('home')} style={{ display: 'inline-block', marginRight: '1rem' }}> <button style={{fontSize:'24px',borderRadius: '10px',backgroundColor: 'grey', color: 'white', padding: '1px' ,width: '200px'}}> Home </button> </li>
          <li onClick={() => handlePageChange('Eilat')} style={{ display: 'inline-block', marginRight: '1rem' }}><button style={{fontSize:'24px',borderRadius: '10px',backgroundColor: 'black', color: 'white', padding: '1px',width: '200px'}}>Eilat</button></li>
          <li onClick={() => handlePageChange('Tel Aviv')} style={{  display: 'inline-block', marginRight: '1rem' }}><button style={{fontSize:'24px',borderRadius: '10px',backgroundColor: 'black', color: 'white', padding: '1px',width: '200px'}}>Tel Aviv</button></li>
          <li onClick={() => handlePageChange('Mitzpe Ramon')} style={{  display: 'inline-block', marginRight: '1rem' }}><button style={{fontSize:'24px',borderRadius: '10px',backgroundColor: 'black', color: 'white', padding: '1px',width: '200px'}}>Mitzpe Ramon</button></li>
        </ul>
      </nav>
  
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'Eilat' && <EilatPage />}
      {currentPage === 'Tel Aviv' && <TelAvivPage />}
      {currentPage === 'Mitzpe Ramon' && <MitzpeRamonPage />}
      
</div>
  );
}

export default App;


function HomePage() {
  return   <div> <h1 style={{ fontSize:'36px'}}> Welcome to AIRBNB Israel </h1>
  <div style={{ fontSize:'18px', textAlign: 'left', marginLeft: '180px', marginRight: '180px', borderRadius: '5px' }}>
  <h3> On this site you can see holiday apartments located all over the country! </h3>
  <h3> You are invited to choose a desired city from the navigation menu at the top of the page </h3>
 </div >
 <img width="500" length="500" src='https://images.globes.co.il/images/NewGlobes/big_image_800/2018/636506675647013750_800x392.jpg' alt=''></img>
 </div>
  ;
}

function EilatPage() {
  const [account, setAccount] = useState(null)
  const [message,setMessage] = useState ('')
  const [amount, setAmount] = useState(null)
  const [web3Api, setWeb3Api] = useState({
    provider:null,
    web3:null,
    contract:null
    })
    const [images] = useState([
     'https://www.weekendtop.co.il/images/customerimages/28999/gallery/image_28999_5b1edf1dda7c44fa806395028524be38.jpg?w=1028&h=510&mode=crop',
      'https://www.weekendtop.co.il/images/customerimages/28999/gallery/image_28999_485896b76e3a426c812762d59de8a893.jpg?w=1028&h=510&mode=crop',
      'https://www.weekendtop.co.il/images/customerimages/28999/gallery/image_28999_7438ae6bdd9a49aa920d6042c080b656.jpg?w=1028&h=510&mode=crop' ,
    'https://www.weekendtop.co.il/images/customerimages/28999/gallery/image_28999_6e1f5c6424244c3aaebb68d931aa4ccc.jpg?w=1028&h=510&mode=crop' 
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }, [images.length]);

    useEffect(()=>{
      const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract("Airbnb", provider)
      if(provider){
        setWeb3Api(
        {
          provider:provider,
          web3: new Web3(provider),
          contract:contract
        }
        )
      }
      else {
        console.log("Pleas install MetaMask")
        }
        }
        loadProvider()
        },[])
  
  const payForRent = async () => {
    console.log ({amount});
    if (amount > 1){
      console.log ({amount});
      const {contract,web3} = web3Api
      await contract.payForRent ({
      from:account,
      value:web3.utils.toWei("1","ether")
      })
    }          
    if (amount < 1){   
      console.log ({amount});
      setMessage(('Unfortunately, there is not enough money in your account'))  
      console.log({message});   
      }
    }

    useEffect(() => {
      const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
        setAccount(accounts[0])
        setAmount (web3Api.web3.utils.fromWei((await web3Api.web3.eth.getBalance(accounts[0])), "ether"))
      }
      web3Api.web3 && getAccount()
      },[web3Api.web3])
      

  return <div>
    <h1 style={{ fontSize:'36px'}}>Eilat</h1>
    <div style={{ border: '2px solid black', fontSize:'18px', textAlign: 'left', marginLeft: '100px', marginRight: '100px', borderRadius: '5px' }}><h10>Beautiful renovated Double Bedroom apartment with beautiful sea view, equipped kitchen, inside a charming and popular gated residence. Walking distance to sandy beaches, main Eilat’s shopping mall, restaurants, cafes and bars. A big supermarket within less then 100 meters. Free Parking, easy access to taxis and buses.</h10></div>
    <p></p>
    <img src={images[currentIndex]} alt="current image" width="700" length="700" />
    <p></p>
    The cost of renting the apartment per a month is 1 Ether
    <p></p>
    I want to rent --- <button onClick={payForRent}> Pay here </button><div style={{color:'red'}}>{message}</div>
    <p></p>
  </div>
}

function TelAvivPage() {
  const [account, setAccount] = useState(null)
  const [message,setMessage] = useState ('')
  const [amount, setAmount] = useState(null)
  const [web3Api, setWeb3Api] = useState({
    provider:null,
    web3:null,
    contract:null
    })
    const [images] = useState([
     'https://a0.muscache.com/im/pictures/44ecee03-d8ae-4255-b0cf-05d3730cb074.jpg?im_w=1200',
      'https://a0.muscache.com/im/pictures/1bd91fab-ef29-4c5c-9c69-484fc343afd8.jpg?im_w=1440',
      'https://a0.muscache.com/im/pictures/d5677782-f6fb-4dc4-b7ce-9061f697a413.jpg?im_w=1440' ,
    'https://a0.muscache.com/im/pictures/dbf520c8-f4ec-43d1-b2a7-1d6ae5486831.jpg?im_w=1440' 
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }, [images.length]);

    useEffect(()=>{
      const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract("Airbnb", provider)
      if(provider){
        setWeb3Api(
        {
          provider:provider,
          web3: new Web3(provider),
          contract:contract
        }
        )
      }
      else {
        console.log("Pleas install MetaMask")
        }
        }
        loadProvider()
        },[])
  
  const payForRent = async () => {
    console.log ({amount});
    if (amount > 1.5){
      console.log ({amount});
      const {contract,web3} = web3Api
      await contract.payForRent ({
      from:account,
      value:web3.utils.toWei("1.5","ether")
      })
    }          
    if (amount < 1.5){   
      console.log ({amount});
      setMessage(('Unfortunately, there is not enough money in your account'))  
      console.log({message});   
      }
    }

    useEffect(() => {
      const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
        setAccount(accounts[0])
        setAmount (web3Api.web3.utils.fromWei((await web3Api.web3.eth.getBalance(accounts[0])), "ether"))
      }
      web3Api.web3 && getAccount()
      },[web3Api.web3])
      

  return <div>
    <h1 style={{ fontSize:'36px'}}>Tel Aviv</h1>
    <div style={{ border: '2px solid black', fontSize:'18px', textAlign: 'left', marginLeft: '100px', marginRight: '100px', borderRadius: '5px' }}><h10>It is located at Ben Gurion Boulevard (Sderot Ben Gurion), close to cafés, shops, restaurants, and Gordon Beach.
The apartment has two bedrooms, each with its own bathroom, and is ideal for up to four guests. Large glass windows in the dining area allow refreshing breeze and sunshine to pass through while you’re savoring a meal.</h10></div>
    <p></p>
    <img src={images[currentIndex]} alt="current image" width="700" length="700"/>
    <p></p>
    The cost of renting the apartment per a month is 1.5 Ether
    <p></p>
    I want to rent --- <button onClick={payForRent}> Pay here </button><div style={{color:'red'}}>{message}</div>
    <p></p>
  </div>
}

function MitzpeRamonPage()  {
  const [account, setAccount] = useState(null)
  const [message,setMessage] = useState ('')
  const [amount, setAmount] = useState(null)
  const [web3Api, setWeb3Api] = useState({
    provider:null,
    web3:null,
    contract:null
    })
    const [images] = useState([
     'https://a0.muscache.com/im/pictures/e400d034-ab49-4449-94dd-7f7cc3d16a48.jpg?im_w=1440',
      'https://a0.muscache.com/im/pictures/3277099d-dd2a-4275-9541-2689b2ff7bed.jpg?im_w=1440',
      'https://a0.muscache.com/im/pictures/b988dd25-1962-48db-984d-2f52aa48969e.jpg?im_w=1440' ,
    'https://a0.muscache.com/im/pictures/63b66126-0796-4ae0-8b26-96bb7f3a500c.jpg?im_w=1440',
    'https://a0.muscache.com/im/pictures/cca66ce6-fd8a-4e22-bc2d-7ddcabe874a1.jpg?im_w=1440',
    'https://a0.muscache.com/im/pictures/3d382289-c583-40a4-a5fe-6cb7ef872fbe.jpg?im_w=1440',


    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(intervalId);
    }, [images.length]);

    useEffect(()=>{
      const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract("Airbnb", provider)
      if(provider){
        setWeb3Api(
        {
          provider:provider,
          web3: new Web3(provider),
          contract:contract
        }
        )
      }
      else {
        console.log("Pleas install MetaMask")
        }
        }
        loadProvider()
        },[])
  
  const payForRent = async () => {
    console.log ({amount});
    if (amount > 0.75){
      console.log ({amount});
      const {contract,web3} = web3Api
      await contract.payForRent ({
      from:account,
      value:web3.utils.toWei("0.75","ether")
      })
    }          
    if (amount < 0.75){   
      console.log ({amount});
      setMessage(('Unfortunately, there is not enough money in your account'))  
      console.log({message});   
      }
    }

    useEffect(() => {
      const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
        setAccount(accounts[0])
        setAmount (web3Api.web3.utils.fromWei((await web3Api.web3.eth.getBalance(accounts[0])), "ether"))
      }
      web3Api.web3 && getAccount()
      },[web3Api.web3])
      

  return <div>
    <h1 style={{ fontSize:'36px'}}>Mitzpe Ramon</h1>
    <div style={{ border: '2px solid black', fontSize:'18px', textAlign: 'left', marginLeft: '100px', marginRight: '100px', borderRadius: '5px' }}><h10>A charming private house with a large garden and seasonal fruit trees, right on the edge of the spectacular desert. A warm and relaxing place to stay.
This house is great for a single guest, a couple or an entire family up to 6 guests.</h10></div>
    <p></p>
    <img src={images[currentIndex]} alt="current image" width="700" length="700"/>
    <p></p>
    The cost of renting the apartment per a month is 0.75 Ether
    <p></p>
    I want to rent --- <button onClick={payForRent}> Pay here </button><div style={{color:'red'}}>{message}</div>
    <p></p>
  </div>
}