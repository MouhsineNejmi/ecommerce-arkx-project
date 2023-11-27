
function SearchBar(){

  


return(


<div className=" flex justify-around items-center" > 

    <div>
        <p className="text-sm  font-semibold font-poppins">categorie name </p>
    </div>

<div className="w-[420px]">
  <label htmlFor="hs-leading-button-add-on-with-icon" className="sr-only">search for product</label>
  <div className="flex rounded-lg shadow-sm">
    <button type="button" className="w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-s-md border border-transparent bg-[#3d84ff] text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
      <svg className="flex-shrink-0 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </button>
    <input type="text" id="hs-leading-button-add-on-with-icon" name="hs-leading-button-add-on-with-icon" placeholder='search for product' className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
  </div>
</div>


<div className="inline-flex rounded-lg shadow-sm">
  <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-[#3d84ff] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:bg-[#3d84ff] ">
    Years
  </button>
  <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-[#3d84ff] disabled:opacity-50 disabled:pointer-events-none   focus:ring-2 focus:ring-gray-600 focus:bg-[#3d84ff]">
    Month
  </button>
  <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-[#3d84ff] disabled:opacity-50 disabled:pointer-events-none  focus:ring-2 focus:ring-gray-600 focus:bg-[#3d84ff] ">
    Date
  </button>

</div>
 

</div>
)





}
export default SearchBar;