let users = [{
    email:"abc@gmail.com",
    password1:"1234",
    city:"bang",
    state:"kar",
    postalCode:"560068",
    phone:"1234567890"
}];

let usingMockDB = true;
let isloggedIn = true;
let sessioId = "";
let message = "";

function authenticate(id, pwd){
    let authenticate = false;
    let user = [];
    console.log("Login -> "+ id+"   password -> "+ pwd)
    if(usingMockDB){
         user = users.filter((userObj)=>{
            console.log(id===userObj.email && pwd===userObj.password1)
            console.log(id+" | "+pwd+" ||| "+userObj.email+" | "+userObj.password1)
             if(id==userObj.email && pwd==userObj.password1)return !authenticate
            else authenticate});
        console.log(user);
        return user[0];
    }
    return "";
}

exports.login = (req, res) => {
    let user = req.body;
    if(req.body.email && req.body.password){
    user = authenticate(req.body.email,req.body.password);


    console.log(req.session.id);
    isloggedIn = user?!isloggedIn:isloggedIn;
    if(user){
    sessioId = !isloggedIn?req.session.id:"";
    console.log("Session Id "+ sessioId);
    console.log("logged in user is "+ user.email)
    res.header("isloggedIn",isloggedIn)
    res.redirect("/")
    // res.render("index",
    //   {isloggedIn});
    }else{
      message="Invalid Username/Password."
      console.log(message)
      res.render("login",{message})
    }
  }else{
    res.render("login",{message})
  }
  };

exports.intialize = (req,res) => {
  res.render("index", {isloggedIn});
}

exports.logout = (req, res, next) => {
  isloggedIn = true;
  console.log(" destroyed session "+ req.session.id);
  req.session.destroy();
  sessioId="";
  console.log()
  res.render("logout");
}

function addObj(data){
  let user = users.filter((userObj) =>{
    console.log(data.email === userObj.email);
      if(data.email === userObj.email) return true
      else return false;
  })
  console.log(user.length)
  if(user.length>0){
    console.log("user exists " );
    return false;
  }else{
    let temp = {
      email: data.email,
      first: data.first,
      last: data.last,
      password1: data.Password1,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      phone: data.phone
    }
    users.push(temp);
    users.map((us)=>{
      console.log(us);
    })
    return true;
  }
}

exports.signup = (req,res) => {
  console.log(req.body);
  let userExists = addObj(req.body);
  console.log(userExists+"----- signup");
  if(userExists)
    res.render("login");
  else 
    res.render("signup");
}