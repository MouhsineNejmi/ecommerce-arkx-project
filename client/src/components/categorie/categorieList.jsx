function Categorielist() {
  return (

    <div className="parrent-div">
    <div className="w-[200px]  items-center gap-x-2 py-3  ">
        <h2 className="font-poppins  font-semibold px-2">Categorie </h2>
      <ul className="max-w-xs h-[270px] h flex flex-col   overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-gray-300
                  dark:[&::-webkit-scrollbar-track]:bg-slate-700
                  dark:[&::-webkit-scrollbar-thumb]:bg-slate-500">

        <li className="inline-flex items-center gap-x-2 py-3 text-sm font-poppins dark:text-white   hover:text-black hover:font-semibold   hover:bg-gray-100 rounded-lg  focus:border-[2px] focus:ring focus:ring-violet-300 hover:underline decoration-black">
          All Room
        </li>
        <li className="inline-flex items-center gap-x-2 py-3 text-sm font-poppins text-gray-800 dark:text-white hover:text-black hover:font-semibold  hover:underline decoration-black hover:bg-gray-100 rounded-lg  focus:outline-none focus:ring-1" >
          Living Room
        </li>
        <li className="inline-flex items-center gap-x-2 py-3 text-sm font-poppins text-gray-800 dark:text-white hover:text-black hover:font-semibold hover:underline decoration-black hover:bg-gray-100 rounded-lg">
          Bedroom
        </li>
        <li className="inline-flex items-center gap-x-2 py-3 text-sm font-poppins text-gray-800 dark:text-white hover:text-black hover:font-semibold hover:underline decoration-black hover:bg-gray-100 rounded-lg">
          Kitchen 
        </li>
        <li className="inline-flex items-center gap-x-2 py-3 text-sm font-poppins text-gray-800 dark:text-white hover:text-black hover:font-semibold hover:underline decoration-black hover:bg-gray-100 rounded-lg">
          Dinning 
        </li>
        <li className="inline-flex items-center gap-x-2 py-3 text-sm font-poppins text-gray-800 dark:text-white hover:text-black hover:font-semibold hover:underline decoration-black hover:bg-gray-100 rounded-lg">
          Outdoors
        </li>
        <li className="inline-flex items-center gap-x-2 py-3 text-sm font-poppins text-gray-800 dark:text-white hover:text-black hover:font-semibold hover:underline decoration-black hover:bg-gray-100 rounded-lg">
          Outdoor
        </li>
      </ul>
    </div>

      <div className="w-[200px] ">
      <h2 className="font-poppins  font-semibold my-1 px-2">Price </h2>
        <div >
        <ul className="max-w-sm flex flex-col">
  <li className="inline-flex items-center gap-x-1 py-4 px-1 text-sm font-poppins bg-white  text-gray-800  ">
    <div   className="relative flex items-start w-full">
    <label htmlFor="hs-list-group-item-checkbox-1"  
          className=" block w-full  text-sm text-gray-600 dark:text-gray-500  hover:text-[#3d84ff] ">
    all Price
      </label>
      <div className="flex items-center h-5">
        <input id="hs-list-group-item-checkbox-1" 
                name="hs-list-group-item-checkbox-1"
               type="checkbox" 
               className="border-gray-200  disabled:opacity-50"/>
      </div>
      
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2 py-3 px-1 text-sm font-poppins bg-white  text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <div className="relative flex items-start w-full">
    <label htmlFor="hs-list-group-item-checkbox-2" className=" block w-full text-sm text-gray-600 hover:text-[#3d84ff]">
    $0-$99
      </label>
      <div className="flex items-center h-5">
        <input id="hs-list-group-item-checkbox-2" name="hs-list-group-item-checkbox-2" type="checkbox" className=" border-gray-200 rounded disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
      </div>
   
    </div>
  </li>

  <li className="inline-flex items-center gap-x-2 py-3 px-1 text-sm font-poppins bg-white  text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <div className="relative flex items-start w-full">
    <label htmlFor="hs-list-group-item-checkbox-3" className=" block w-full text-sm font-poppins text-gray-600 hover:text-[#3d84ff] ">
       $100-399$
      </label>
          <div className="flex items-center h-5">
             <input id="hs-list-group-item-checkbox-3" 
             name="hs-list-group-item-checkbox-3" 
             type="checkbox"
              className="border-gray-200 rounded disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
          </div>
    
          </div>
          </li>

          <li className="inline-flex items-center gap-x-2 py-3 px-1 text-sm font-poppins bg-white  text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <div className="relative flex items-start w-full">
    <label htmlFor="hs-list-group-item-checkbox-4" className=" block w-full text-sm font-poppins text-gray-600 hover:text-[#3d84ff]">
       $400-699$
      </label>
          <div className="flex items-center h-5">
             <input id="hs-list-group-item-checkbox-4" name="hs-list-group-item-checkbox-3" type="checkbox" className="border-gray-200 rounded disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
          </div>
    
          </div>
          </li>
          <li className="inline-flex items-center gap-x-2 py-3 px-1 text-sm font-poppins bg-white  text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    <div className="relative flex items-start w-full">
    <label htmlFor="hs-list-group-item-checkbox-3" className=" block w-full text-sm font-poppins text-gray-600 hover:text-[#3d84ff]">
       $700-1000$
      </label>
          <div className="flex items-center h-5">
             <input id="hs-list-group-item-checkbox-5" name="hs-list-group-item-checkbox-3" type="checkbox" className="border-gray-200 rounded    "/>
          </div>
    
          </div>
          </li>
        </ul>
        </div>
      </div>
    </div>       
  );
}

export default Categorielist;
