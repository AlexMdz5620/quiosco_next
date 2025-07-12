export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-En', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}