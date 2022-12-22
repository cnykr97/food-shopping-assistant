import assets from "./assets"

const ProductData = [
    {
        id: 0,
        name: "Eti Lifalif Granola Kuru Vişneli, Kakao Parçacıklı, Fındıklı",
        weight: "200g",
        image: assets.p0,
        category: "kahvaltılık, kahvaltılık gevrek",
        calories: 471.0,
        sugar: 16.0,
        carbs: 50.0,
        protein: 10.0,
        salt: 5.1,
        fat: 4.6,
        fiver: 8.2,
        isGlutenFree: false,
        isCeliacFree: false,
        isLactoseFree: false,
        isVegan: true
    },
    {
        id: 1,
        name: "Milka Fındıklı Çikolata",
        weight: "80g",
        image: assets.p1,
        category: "atıştırmalık, çikolata",
        calories: 543.0,
        sugar: 53.0,
        carbs: 54.0,
        protein: 7.1,
        salt: 0.3,
        fat: 32.0,
        fiver: 2.5,
        isGlutenFree: true,
        isCeliacFree: true,
        isLactoseFree: true,
        isVegan: false
    },
    {
        id: 2,
        name: "İçim Fit Protein Kahveli Laktozsuz Süt",
        weight: "500ML",
        image: assets.p2,
        category: "Süt, Sporcu, fit",
        calories: 47.0,
        sugar: 5.4,
        carbs: 5.4,
        protein: 6.0,
        salt: 0.0,
        fat: 0.1,
        fiver: 0.0,
        isGlutenFree: true,
        isCeliacFree: true,
        isLactoseFree: true,
        isVegan: false
    }
]

export { ProductData }