const router = require('express').Router();

const {
    sellerAuthentication,
    sellerRegister,
    getAllSellerList,
    getSellerById,
    searchSeller,
    updateSellerData,
    deleteSeller
} = require('../controllers/user.controller');

router.post('/login', sellerAuthentication);
router.post('/', sellerRegister);
router.get('/', getAllSellerList);
router.get('/:id', getSellerById);
router.get('/search', searchSeller);
router.put('/:id', updateSellerData);
router.delete('/:id', deleteSeller);


module.exports=router;
