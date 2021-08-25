

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
  
       

      </div>
 