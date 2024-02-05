import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let categories;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async(req,res)=>{
    try{
        const result = await axios.get("https://v2.jokeapi.dev/categories");
        categories = result.data.categories;
        res.render("index.ejs", {
            categories: categories
        });
    } catch (error){
        console.log(error.response.data);
    }

});

app.post("/getJoke", async(req,res)=>{
    const category = req.body.selectedCategory;
    //console.log(category);
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/" + category);
        //console.log(result.data);
        res.render("index.ejs",{
            categories: categories,
            joke: result.data  
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, ()=>{
    console.log(`Server running at port: ${port}`);
})