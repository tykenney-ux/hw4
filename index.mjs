import express from 'express';
import fetch from "node-fetch";

import 'dotenv/config';

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.currentPath = req.path;

    next();
});

app.get('/', (req, res) => {
    // const userQuery = req.query.q;
    res.render("index");
});

// app.get('/proximates', (req, res) => {
//     res.render("proximates");
// });

// app.get('/minerals', (req, res) => {
//     res.render("minerals");
// });

// app.get('/vitamins', (req, res) => {
//     res.render("vitamins");
// });
// app.get('/amino_acids', (req, res) => {
//     res.render("amino_acids");
// });
// app.get('/lipids', (req, res) => {
//     res.render("index");
// });
// app.get('/isoflavones', (req, res) => {
//     res.render("index");
// });
// app.get('/nutrient', (req, res) => {
//     res.render("nutrient");
// });

async function getFoodData(query) {
    const params = new URLSearchParams({
        api_key: process.env.govApi,
        query: query
    });
    // let apiKey = process.env.govApi;

    let url = `https://api.nal.usda.gov/fdc/v1/foods/search?${params}`;

    const response = await fetch(url);
    return await response.json();
}
app.post("/search", (req, res) => {
    let searchTerm = req.body.query?.trim();

    if (!searchTerm) {
        return res.status(400).send("Please enter a food.");
    }


    res.redirect(`/result?query=${encodeURIComponent(searchTerm)}`);
});

app.get("/result", (req, res) => {
    const searchTerm = req.query.query;
    res.render("result", {
        searchTerm
    });
})

app.get("/proximates", async (req, res) => {
    const searchTerm = req.query.query;

    if (!searchTerm) {
        return res.status(400).send("No search term provided.");
    }

    const data = await getFoodData(searchTerm);

    if (!data.foods || data.foods.length === 0) {
        return res.status(404).send("No food found.");
    }

    const proximates = [];

    for (const nutrient of data.foods[0].foodNutrients) {
        if (
            nutrient.nutrientNumber >= 200 &&
            nutrient.nutrientNumber < 300
        ) {
            proximates.push(nutrient);
        }
    }

    res.render("proximates", {
        nutrients: proximates,
        searchTerm
    });
});

app.get("/minerals", async (req, res) => {
    const searchTerm = req.query.query;

    if (!searchTerm) {
        return res.status(400).send("No search term provided.");
    }

    const data = await getFoodData(searchTerm);
    const minerals = [];

    if (data.foods && data.foods.length > 0) {
        for (const nutrient of data.foods[0].foodNutrients) {
            if (
                nutrient.nutrientNumber >= 300 &&
                nutrient.nutrientNumber < 400
            ) {
                minerals.push(nutrient);
            }
        }
    }

    res.render("minerals", {
        nutrients: minerals,
        searchTerm
    });
});

app.get("/vitamins", async (req, res) => {
    const searchTerm = req.query.query;

    if (!searchTerm) {
        return res.status(400).send("No search term provided.");
    }

    const data = await getFoodData(searchTerm);
    const vitamins = [];

    if (data.foods && data.foods.length > 0) {
        for (const nutrient of data.foods[0].foodNutrients) {
            if (
                nutrient.nutrientNumber >= 400 &&
                nutrient.nutrientNumber < 500
            ) {
                vitamins.push(nutrient);
            }
        }
    }

    res.render("vitamins", {
        nutrients: vitamins,
        searchTerm
    });
});

app.get("/amino_acids", async (req, res) => {
    const searchTerm = req.query.query;

    if (!searchTerm) {
        return res.status(400).send("No search term provided.");
    }

    const data = await getFoodData(searchTerm);
    const amino_acids = [];

    if (data.foods && data.foods.length > 0) {
        for (const nutrient of data.foods[0].foodNutrients) {
            if (
                nutrient.nutrientNumber >= 500 &&
                nutrient.nutrientNumber < 600
            ) {
                amino_acids.push(nutrient);
            }
        }
    }

    res.render("amino_acids", {
        nutrients: amino_acids,
        searchTerm
    });
});

app.get("/lipids", async (req, res) => {
    const searchTerm = req.query.query;

    if (!searchTerm) {
        return res.status(400).send("No search term provided.");
    }

    const data = await getFoodData(searchTerm);
    const lipids = [];

    if (data.foods && data.foods.length > 0) {
        for (const nutrient of data.foods[0].foodNutrients) {
            if (
                nutrient.nutrientNumber >= 600 &&
                nutrient.nutrientNumber < 700
            ) {
                lipids.push(nutrient);
            }
        }
    }

    res.render("lipids", {
        nutrients: lipids,
        searchTerm
    });
});

app.get("/isoflavones", async (req, res) => {
    const searchTerm = req.query.query;

    if (!searchTerm) {
        return res.status(400).send("No search term provided.");
    }

    const data = await getFoodData(searchTerm);
    const isoflavones = [];

    if (data.foods && data.foods.length > 0) {
        for (const nutrient of data.foods[0].foodNutrients) {
            if (
                nutrient.nutrientNumber >= 400 &&
                nutrient.nutrientNumber < 500
            ) {
                isoflavones.push(nutrient);
            }
        }
    }

    res.render("isoflavones", {
        nutrients: isoflavones,
        searchTerm
    });
});


// app.post('/', async (req, res) => {
//     let query = req.body.query;
//     console.log(query);
//     // res.send(`Check the other tabs for info about ${query}`)

//     query = query.replace(/[\s]+/g, "%20");

//     let apiKey = process.env.govApi;
//     let url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}`;
//     let response = await fetch(url);
//     let data = await response.json();

//     if (!data.foods || data.foods.length === 0) {
//         return res.status(404).send("No food found.");
//     }

//     let proximatesData = [];
//     let mineralsData = [];
//     let vitaminsData = [];
//     let amino_acidsData = [];
//     let lipidsData = [];
//     let isoflavonesData = [];

//     for (let nutrient of data.foods[0].foodNutrients) {
//         if (
//             nutrient.nutrientNumber >= 200 &&
//             nutrient.nutrientNumber < 300
//         ) {
//             proximatesData.push(nutrient);
//         }
//         else if (
//             nutrient.nutrientNumber >= 300 &&
//             nutrient.nutrientNumber < 400
//         ) {
//             mineralsData.push(nutrient);
//         }
//         else if (
//             nutrient.nutrientNumber >= 400 &&
//             nutrient.nutrientNumber < 500
//         ) {
//             vitaminsData.push(nutrient);
//         }
//         else if (
//             nutrient.nutrientNumber >= 500 &&
//             nutrient.nutrientNumber < 600
//         ) {
//             amino_acidsData.push(nutrient);
//         }
//         else if (
//             nutrient.nutrientNumber >= 600 &&
//             nutrient.nutrientNumber < 700
//         ) {
//             lipidsData.push(nutrient);
//         }
//         else if (
//             nutrient.nutrientNumber >= 700 &&
//             nutrient.nutrientNumber < 900
//         ) {
//             isoflavonesData.push(nutrient);
//         }
//         else {
//             console.log("number out of bounds" + nutrient.nutrientNumber);
//         }


//     }
//     res.render("nutrient", {
//         proximates: proximatesData,
//         minerals: mineralsData,
//         amino_acids: amino_acidsData,
//         lipids: lipidsData,
//         isoflavones: isoflavonesData
//     });

// });



// app.get('/search', async (req, res) => {
//     let apiKey = process.env.govApi;
//     let url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=Cheddar%20Cheese`;
//     let response = await fetch(url);
//     let data = await response.json();
//     res.render('search', { data });
// });

app.listen(3000, () => {
    console.log('server started');
});