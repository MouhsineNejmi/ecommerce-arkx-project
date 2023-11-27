/* eslint-disable react/prop-types */



function Card(props) {

    return (
        <div className='w-full  p-[10px] rounded  shadow-lg ' > 
            <img  className="w-[100%] h-[250px] rounded " src={props.image} alt={props.name} />
          
            <div className="flex justify-between items-center m-2">
            <h1  className="font-semibold text-[20px] capitalize" >{props.name}</h1>
            <h1  className="font-semibold  text-[20px] text-[#61a8ff] " >{props.price}</h1>
            </div >
            <hr  className="w-auto m-2"/>
            <div className=" m-3">
                <h6 className="m-0.5 text-xs font-bold text-[#949494]" > Description:</h6>
             <p className="text-xs text-[#949494]" >{props.description}  </p> 

             </div>
             <hr  className="w-auto m-2"/>


             
                    <div  className="flex  justify-between  items-center m-2">
                        <button type="button" className="  text-[9px] mr-6 py-1 px-2 inline-flex justify-center items-center gap-2  rounded-full border border-[#3d84ff]/70 font-semibold bg-[#f7f7f7] text-[#61a8ff] hover:bg-blue-600  hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                        ADD TO CART </button>
                         <button type="button" className=" text-[9px] py-1 px-2 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-[#3d84ff] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                         BUY NOW 

                        <svg className="w-3.5 h-3.5"  width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z"/>
                        </svg>
                         </button>
                     </div>
        </div>
        )
    }
   
        
        
    export default Card;