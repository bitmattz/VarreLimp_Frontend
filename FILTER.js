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

              <IconButton onClick={()=> addCart(produto.id,produto.codigo,produto.nome)}>
                <AddShoppingCartIcon style={{color: "#E889DC"}} fontSize="large" value={produto.id} />
                <a className="text"><b>Adicionar ao carrinho</b></a>

              </IconButton>       
            </GridListTile >

        

      ))}


  
</GridList>
</div>



</div>
