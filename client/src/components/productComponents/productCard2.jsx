/* eslint-disable react/prop-types */



function Card(props) {

    return (
        <div id="card" className='w-[250px]  p-[10px] rounded  overflow-hidden shadow-lg  ' >
{  /*          <div className=" block w-[70px] h-[30px] bg-white rounded text-center capitalize text-sm font-semibold font-poppins py-1 relative top-[50px] left-[15px]" >
                <label >NEW</label>
    </div> */}
            <img  className="w-[100%] h-[300px] rounded  " src="https://upload.wikimedia.org/wikipedia/commons/6/65/Product_Photography.jpg" alt={props.name} />
          
            <div className= " ">
            <h1  className="font-semibold font-poppins text-[17px]  px-0 capitalize" >{props.name} </h1>
            <div className="flex ">
            <h1  className="font-semibold   font-poppins text-[13px] text-black  " > ${props.price} </h1>
            <h1  className="font-sm px-4 font-poppins text-[12px] text-grey line-through " >${props.discount}</h1>
            </div>

            </div >

          {
          //description need to be hide
          /*  
            <div className="  ">
           
             <p id="t" className="text-xs text-[#949494]   " >{props.description}  </p> 

             </div>
            */} 
            {
            //button buy now 
            /*
            <div className="w-[90%] h-9  inline-flex justify-center  bg-black font-poppins font-semibold  rounded-lg ">
            <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold font-poppins capitalize  rounded-lg  border border-transparent bg-black-600 text-white  disabled:opacity-50 disabled:pointer-events-none">
                Add to cart
                <svg className="flex-shrink-0 w-4 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="m5 11 4-7"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"/><path d="m9 11 1 9"/><path d="M4.5 15.5h15"/><path d="m15 11-1 9"/></svg>
            </button>
            </div>
        */}
                     
        </div>
        )
    }
   
        
        
    export default Card;