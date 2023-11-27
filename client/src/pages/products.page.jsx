
import Grid from "../components/productComponents/gridProduct";
import SearchBar from "../components/searchBar/SearchBar";
import Categorielist from "../components/categorie/categorieList";
 
function Productcard (){
    return (
       <div className="flex">
      <Categorielist/>
      <div>
      <SearchBar/>
      <Grid/>
      </div>
      </div>
   
    )
}

export default Productcard;
