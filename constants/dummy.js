import assets from "./assets"

const userPreferences = {
        isGlutenFree: true,
        isCeliacFree: false,
        isLactoseFree: false,
        isVegan: false
    }


const ProductData = [
    {
        id: 0,
        name: "Eti Lifalif Granola Kuru Vişneli, Kakao Parçacıklı, Fındıklı",
        trained_name: "granola",
        weight: "200g",
        image: assets.p0,
        category: "kahvaltılık, kahvaltılık gevrek",
        content: {
            calories: 471.0,
            sugar: 16.0,
            carbs: 50.0,
            protein: 10.0,
            salt: 5.1,
            fat: 4.6,
            fiber: 8.2,
        },
        isGlutenFree: false,
        isCeliacFree: false,
        isLactoseFree: false,
        isVegan: true
    },
    {
        id: 1,
        name: "Milka Fındıklı Çikolata",
        trained_name: "milka_findikli",
        weight: "80g",
        image: assets.p1,
        category: "atıştırmalık, çikolata",
        content: {
            calories: 543.0,
            sugar: 53.0,
            carbs: 54.0,
            protein: 7.1,
            salt: 0.3,
            fat: 32.0,
            fiber: 2.5
        },
        isGlutenFree: true,
        isCeliacFree: true,
        isLactoseFree: true,
        isVegan: false
    },
    {
        id: 2,
        name: "İçim Fit Protein Kahveli Laktozsuz Süt",
        trained_name: "icim_fit",
        weight: "500ML",
        image: assets.p2,
        category: "Süt, Sporcu, fit",
        content: {
            calories: 47.0,
            sugar: 5.4,
            carbs: 5.4,
            protein: 6.0,
            salt: 0.0,
            fat: 0.1,
            fiber: 0.0
        },
        isGlutenFree: true,
        isCeliacFree: true,
        isLactoseFree: true,
        isVegan: false
    },
    {
        id: 3,
        name: "Ülker Çizi Kraker",
        trained_name: "granola",
        weight: "70g",
        image: assets.p3,
        category: "atıştırmalık, kraker, tuzlu",
        content: {
            calories: 456.0,
            sugar: 7.3,
            carbs: 61.0,
            protein: 1.8,
            salt: 7.7,
            fat: 20.0,
            fiber: 0.5
        },
        isGlutenFree: false,
        isCeliacFree: false,
        isLactoseFree: true,
        isVegan: true
    },
    {
        id: 4,
        name: "Ülker Laviva Dolgu Ve Bisküvi Çikolata",
        trained_name: "granola",
        weight: "35",
        image: assets.p4,
        category: "atıştırmalık, çikolata, bar",
        content: {
            calories: 540.0,
            sugar: 46.0,
            carbs: 54.0,
            protein: 7.1,
            salt: 0.13,
            fat: 32.0,
            fiber: 3.6
        },
        isGlutenFree: false,
        isCeliacFree: false,
        isLactoseFree: false,
        isVegan: false
    }
]

export { ProductData, userPreferences }