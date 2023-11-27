import Card from ".././productComponents/productCard2";
//import Card2 from "./productCard2";
 const test = [
    { image: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Product_Photography.jpg', name:'jujutsu', price:2999 ,description: 'lerjprrnjejvr nrefjnjvlk dnjcjsnvfn sjnfsfvjnfd fvnjfdvns dcn nsmd csdnjrr' },
    { image: 'https://c4.wallpaperflare.com/wallpaper/255/998/444/apple-products-iphone-4-and-ipad-wallpaper-preview.jpg', name:'jujutsu', price:2999  ,description: 'lerjprrnjejvr nrefjnjvlk dnjcjsnvfn sjnfsfvjnfd fvnjfdvns dcn nsmd csdnjrr' },  
    { image: 'https://reviewed-com-res.cloudinary.com/image/fetch/s--T2M-kers--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_1200/https://reviewed-production.s3.amazonaws.com/1572547548390/Reviewed100-Tech-hero-1.jpg', name:'jujutsu', price:2999,description: 'lerjprrnjejvr nrefjnjvlk dnjcjsnvfn sjnfsfvjnfd fvnjfdvns dcn nsmd csdnjrr' },
    { image: 'https://i.imgur.com/wLiO9FC.jpg', name:'jujutsu', price:2999 ,description: 'lerjprrnjejvr nrefjnjvlk dnjcjsnvfn sjnfsfvjnfd fvnjfdvns dcn nsmd csdnjrr',discount:800.00 },
    { image: 'https://i.imgur.com/wLiO9FC.jpg', name:'jujutsu', price:2999 ,description: 'lerjprrnjejvr nrefjnjvlk dnjcjsnvfn sjnfsfvjnfd fvnjfdvns dcn nsmd csdnjrr',discount:800.00 },
    { image: 'https://i.imgur.com/wLiO9FC.jpg', name:'jujutsu', price:2999 ,description: 'lerjprrnjejvr nrefjnjvlk dnjcjsnvfn sjnfsfvjnfd fvnjfdvns dcn nsmd csdnjrr',discount:800.00 },
    { image: 'https://i.imgur.com/wLiO9FC.jpg', name:'jujutsu', price:2999 ,description: 'lerjprrnjejvr nrefjnjvlk dnjcjsnvfn sjnfsfvjnfd fvnjfdvns dcn nsmd csdnjrr',discount:800.00 },
    { image: 'https://i.imgur.com/wLiO9FC.jpg', name:'jujutsu', price:2999 ,description: 'lerjprrnjejvr nrefjnjvlk dnjcjsnvfn sjnfsfvjnfd fvnjfdvns dcn nsmd csdnjrr',discount:800.00 },
    { image: 'https://i.imgur.com/wLiO9FC.jpg', name:'jujutsu', price:2999 ,description: 'lerjprrnjejvr nrefjnjvlk dnjcjsnvfn sjnfsfvjnfd fvnjfdvns dcn nsmd csdnjrr',discount:800.00 },
    
]



function Grid() {    

    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-7 p-[15px]  " >
            {
                 test.map((card, idx) => <Card key={idx} image={card.image} name={card.name}  price={card.price} discount={card.discount} description={card.description} /> ) 
            }
        </div>
        )
    }
    
    export default Grid;   