export function formatQuantity (quantity, singular, plural, printQuantity=true) {
    if(quantity == 1) {
        return printQuantity ? `${quantity} ${singular}` : singular;
    } else {
        return printQuantity ? `${quantity} ${plural}` : plural;
    }
}