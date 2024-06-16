

let key ={};


if (process.env.NODE_ENV === "production"){
    
    console.log("Set Production Config")
    key={
        secretOrKey: "test",
        mongoURI: "",
        port: 2053,
    }

}

else{

  console.log("Set Development Config")

    key={
        secretOrKey: "test", 
    
        mongoURI: "mongodb://0.0.0.0:27017/KCT",
        port: process.env.PORT || 3000,
    }

}






module.exports=key;