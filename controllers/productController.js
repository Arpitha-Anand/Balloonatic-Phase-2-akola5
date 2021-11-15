"use Strict"

let productList = [
    {
        id:"1",
        title:"Helium Balloon",
        price:"4$",
        img:"./images/hbd.jpg",
        description:"Helium balloons for birthday parties There is no birthday party without balloon."
    },
    {
        id:"2",
        title:"printed Balloon",
        price:"7$",
        img:"./images/emoji-img.jpg",
        description:"Balloons to wish people and spread happiness Two sided printed themes made from lightweight metallised films."
    },
    {
        id:"3",
        title:"decorative Balloon",
        price:"3$",
        img:"./images/balloons.jpg",
        description:"Balloons to decorate the room.They are made of pure 100% natural rubber latex."
    }
]


exports.showProducts = (req, res) => {
    res.render("product", {
      productList
    });
  };