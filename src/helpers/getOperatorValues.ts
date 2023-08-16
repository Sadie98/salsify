export function getOperatorValuesEqual(products, property): string[]{
    console.log({products, property})
    let res: Set<string> = new Set();

    products.forEach((product) => {
        if (product[property]) res.add(product[property]);
    })

    return Array.from(res);
}