export const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    if (
        typeof originalPrice !== 'number' ||
        typeof discountPercentage !== 'number'
    ) {
        return 'Invalid input. Please provide valid numbers.';
    }

    if (discountPercentage < 0 || discountPercentage > 100) {
        return 'Invalid discount percentage. Please provide a percentage between 0 and 100.';
    }

    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;

    return discountedPrice;
};
