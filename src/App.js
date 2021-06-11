import React, {useState,useEffect,Component} from 'react';
import './components/Card.css';
import './components/CardContainer.css';
import api from './services/api.js';
import './components/Filter.css';
import def from './img/produtosImg/default.jpg';
import './components/Navbar.css';
import './components/Cart.css';
import logo from './img/varrelimp_site.png';
import loja from './img/loja.jpg';
import { IoLogoWhatsapp,IoMdDownload } from "react-icons/io";


import {Pagination,Alert} from '@material-ui/lab';
import { GridList,IconButton, Card ,GridListTileBar,GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { ToastContainer, toast } from 'react-toastify';
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css"


import './info.css';
import './App.css'; 
import axios from 'axios';





function App() {



  {/*Funcções e Variáveis========================================================================= */}
      
  let [produtos, setProdutos] = useState([]);
  let [tags,setTags] = useState([]);
  let [cart, setCart] = useState([]);
  let [pesquisa, setPesquisa] = useState([]);
  let [pagina, setPagina] = useState([]);
  let[actTag,setactTag] = useState(548812210);

  let txtName = React.createRef();
  let txtContact = React.createRef();
  let txtMsg = React.createRef();
  const notify = () => toast("Item adicionado ao carrinho!");

  
  useEffect(() => {

   
      api.get('tags').then(response =>{
          setTags(response.data);
          
         });
         api.get('Cart').then(response =>{
          setCart(response.data);
        });

        



    api.post('filter',{
        idTag:'548812210',
        "pagina": 1
  }).then(response =>{
      setProdutos(response.data);
      setPagina(response.data[0].nPaginas);
    });

  }, []);



  async function GeneratePdf(){
    api.get('GeneratePdf').then(response =>{
      console.log(response.data);
    });
  }
  async function selectTag(event){
      const idT = event.target.value;
      api.post('filter',{
          idTag: event.target.value,
          "pagina": 1
    }).then(response =>{
       setactTag(idT);
       setProdutos(response.data);
       setPagina(response.data[0].nPaginas);

      });
  }

  async function nextPage(idTag,page){
        api.post('filter',{
          idTag: idTag,
          "pagina": page
    }).then(response =>{
      setProdutos(response.data);

      });

  }

  async function getCart(req,res){
    api.get('Cart').then(res =>{
      setCart(res.data);
    });
    
  }

  async function addCart(id){
    api.post('Cart',{
        productId: id
    }).then(response => {
        setCart(response.data);
        toast.success('Item adicionado ao carrinho!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        
    });

}
 
async function delCart(id){
  console.log(id);
  api.delete(`Cart/${id}`).then(response => {
   setCart(response.data);
   console.log("mudou");
  });
 
 
 
}


async function editCart(event){
 

  api.put('Cart',{
   productId: event.target.id,
   qty: parseInt(event.target.value)
  }).then(response =>{
   setCart(response.data);
  });
}

 async function addPesquisa(event){
  setPesquisa(event.target.value);
}

  async function search(){
    api.post('filter',{
      pesquisa: pesquisa,
      "pagina": 1
}).then(response =>{

   setProdutos(response.data);
  });
  }



  async function sendMessage(){
      api.post('Message',{
        nome: txtName.current.value,
        contato: txtContact.current.value,
        msg: txtMsg.current.value
    }).then(response => {
      window.open(response.data, "_blank");
      txtName.current.value = null,
      txtContact.current.value = null,
      txtMsg.current.value = null
    });

  }

  function findImage(id){
  
    try{
       return require(`./img/produtosImg/${id}.jpg`);

    }catch{
       return require(`./img/produtosImg/default.jpg`);
    }

  }

    return (
      
     
      <div className="App" onChange={getCart}>
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            style={{fontSize:"20px"}}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

        
{/*INÍCIO DO HEADER=============================================================================================================================================================================================== */}
           <header className="header">


                  <div className="logoContainer">
                      <img className="logo" src={logo}/>

                  </div>



                  <div className="searchContainer">
                          <input type="text" id="searchBar" onChange={addPesquisa}placeholder="Pesquisar..." className="searchBarInput"></input>
                          <button className="searchBtn" onClick={search}>Pesquisar</button>
                  </div>



                  <div className="menuContainer">
                      <a className="menuA" href="#divProducts">Produtos</a>
                      <a className="menuA" href="#divInfo">Contato</a>
                      <button className="menuBtn" href="#divCart"><a className="menuBtn"href="#divCart">Carrinho</a></button>
                      

                  </div>

        </header>

{/*FIM DO HEADER===================================================================================================================================================================================================== */}
{/*INÍCIO DOS PRODUTOS=============================================================================================================================================================================================== */}

        <div className="products" id="divProducts">

          
                  <div className="filterContainer" >
                  {
                      tags.map(tag =>(
                          <label className="filterName">
                          <input
                              key = {tag.id}
                              value={tag.id}
                              name="Tags"
                              type="radio" 
                              onChange={selectTag}
                              />
                          {tag.nome}
                          </label>
                      ))
                      
                  }
                  

              </div>
              <div className="gridContainer">
                <GridList  cols={"auto"}className="productContainer" cellHeight={100}>
                    <GridListTile   style={{ width: '100%',height: 'auto',}}>
                      <Pagination count={pagina} shape="rounded" onChange={(event,value) => nextPage(actTag,value)}/>
                    </GridListTile>
                    
                        {produtos.map(produto => (
                              
                              <GridListTile  key={produto.id} className="cardBackground" style={{height: 'auto',}}>
                                <img className="productImg" src={findImage(produto.id).default}  />
                                <br/>
                                <a className="productName">{produto.nome}</a>
                                <br/>


                                <IconButton onClick={()=> addCart(produto.id,produto.nome,produto.codigo)}>
                                  <AddShoppingCartIcon style={{color: "#E889DC"}} fontSize="large" value={produto.id} />
                                  <a className="text"><b>Adicionar ao carrinho</b></a>

                                </IconButton>       
                              </GridListTile >
  
                          

                        ))}


                    
                </GridList>
              </div>


                
      </div>

{/*FIM DOS PRODUTOS=============================================================================================================================================================================================== */}
{/*INÍCIO DO MAPA E CONTATO=============================================================================================================================================================================================== */}

      <hr/>

      <div className="info" id="divInfo">



          <div className="mapa">
            <div className="float">
              <a className="floatText">Mapa</a>
            </div>
           
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7340.854149469591!2d-47.2111115!3d-23.081457!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6f50c659c290c167!2sVarre%20Limp%20-%20Produtos%20de%20Limpeza!5e0!3m2!1spt-BR!2sbr!4v1621616004704!5m2!1spt-BR!2sbr" width="675" height="448"></iframe>
            
              
            
          </div>





          <div className="contato">
            <div className="float">
              <a className="floatText">Contato</a>
            </div>
            <div className="infoContato">
                <a className="text">
                  <b>Endereço:</b> R. Treze de Maio, 1339 - Centro, Indaiatuba - SP, 13330-120
                </a>
                <a className="text">
                  <b>Telefone/ WhatsApp:</b> (19) 3016-8981
                </a>
                <a className="text">
                  <b>Email:</b> vendas@varrelimp.com.br
                </a>
            </div>
          </div>

      </div>

{/*FIM DO MAPA E CONTATO=============================================================================================================================================================================================== */}
{/*INÍCIO CARRINHO=============================================================================================================================================================================================== */}


      <hr/>
     
      <div className="cartContainer" id="divCart">
      <div className="titles">
        <div className="textBoxCart">
          <a className="floatText">Carrinho</a>
        </div>

      </div>
        
        <div className="cartBox">
         


         
            {cart.map(item => (
                          
                <div className="cartItemBox" >
                
                  <img className="cartImg" src={findImage(item.productId).default}/>
                  <a className="cartName">{item.productName}</a>
                  <div>
                    <label className="cartName" htmlFor={item.productId}>Quantidade:</label>
                    <input id={item.productId} className="cartQty" alt="Quantidade"type="number" onChange={editCart}value={item.qty}/>
                  </div>
                  
                  <button  className="btnDelCart" id={item.productId} onClick={()=> delCart(item.productId)} >Remover</button>
                  
          </div>

                      
                      
            ))}
          
            
        </div>


        <div className="msgBox">
         <div className="textBox">
            <a className="floatText">Enviar Cotação</a>
          </div>
        
          <div className="send">
          <label className="infoMsg" >Envie sua cotação pelo WhatsApp!</label>

              
              <input ref={txtName} className="nameBox" type="text" placeholder="Nome"/>
              <input ref={txtContact}className="contactBox" type="text" placeholder="Telefone ou E-mail"/>
              <textarea ref={txtMsg} className="messageBox" rows = "5" cols = "60" placeholder="Mensagem">
              </textarea>
              <div className="btnBox">
                {/* <button className="btnPdf" onClick={GeneratePdf}> <IoMdDownload className="IoMdDownload"/><a className="textBtn">Baixar</a></button> */}
                <button className="btnMsg" onClick={sendMessage}> <IoLogoWhatsapp className="IoLogoWhatsapp"/><a className="textBtn">Enviar</a></button>
              </div>
              
            </div>
        </div>
  
        <div className="footer">
          <a className="footerTxt">Varre Limp ® 2021</a>
          <a className="footerTxt" href="https://bitmattz.github.io">Desenvolvido por <b>Matheus Bitencourt</b></a>

        </div>

      </div>
 

{/*FIM DO CARRINHO=============================================================================================================================================================================================== */}



    </div>

      
      

    );

   
}


export default App;