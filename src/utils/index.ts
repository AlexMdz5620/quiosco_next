export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-En', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function getImagePath(imagePath: string) {
    const cloudinaryBassUrl = 'https://res.cloudinary.com';
    if (imagePath.startsWith(cloudinaryBassUrl)) {
        return imagePath;
    } else {
        return `/products/${imagePath}.jpg`
    }

}
