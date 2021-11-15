let users = [{
    email:"abc@gmail.com",
    password1:"1234",
    password2:"1234",
    city:"bang",
    state:"kar",
    postalCode:"560068",
    phone:"1234567890"
}];

let usingMockDB = true;
let isloggedIn = false;

function authenticate(id, pwd){
    let authenticate = false;
    let user ={};
    if(usingMockDB){
         user = users.filter((userObj)=>{
             if(id==userObj.email && pwd==userObj.password)return !authenticate
            else authenticate});
        console.log(user[0]);
        return user[0];
    }
    return "";
}

exports.login = (req, res) => {
    let user = req.body;
    user = authenticate(req.body.email,req.body.password);
    isloggedIn = user?isloggedIn:!isloggedIn;
    console.log(users.length)
    res.render("index",
      {isloggedIn});
  };

exports.intialize = (req,res) => {
  let isloggedIn = true;
  res.render("index", {isloggedIn});
}

exports.logout = (req, res, next) => {
  isloggedIn = true;
  res.render("logout",{isloggedIn})
}

function addObj(data){
  let user = users.filter((userObj) =>{
    console.log(data.email === userObj.email);
      if(data.email === userObj.email) return true
      return false;
  })
  console.log(user);
  if(user.length>0){
    console.log("user exists " );
    return false;
  }else{
    console.log(user)
    users.push(user);
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

/* 

{
  first: 'Arpitha',
  last: 'Anand',
  Password1: 'Kamalaamar1!',
  password2: 'Kamalaamar1!',
  email: 'akola5@unh.newhaven.edu',        
  address: '28 Admiral street, west haven',
  city: 'west haven',
  state: 'ct',
  zipCode: '06516',
  phone: '4752801136'
}
const usingMockDB = true;
let userList = [ ];

if (usingMockDB) {
  userList = ...; // create array of users from JSON file
  ...
}

function authenticate (id, pwd) {
  let authenticated = false;
  if (usingMockDB) {
    // match id/pwd against userList
    // authenticated set to true if id/pwd match
  } else {
    // run code to look in MongoDB collection for match.
    // authenticated set to true if id/pwd match
  }
  return authenticated;
}

email - mandatory, max length: 40, standard email pattern, Tooltip: "Email will become your site user ID "; you can use JS to validate if email is in correct email format or use HTML regex pattern for matching. [This field will become the user's login ID.] You will need to check whether this ID already exists in the mock-DB users array using JS. If it does, display a relevant message, clear the field and let them try again to enter a new email address

password1 - mandatory, min length: 8, max-length:32, Tooltip: "Password must be minimum of 8 characters, and include at least 1 number and 1 UPPERCASE letter "; you can use JS to validate if password is in correct format or use HTML regex pattern for matching. [This field will become the user's login password.]

password2 - mandatory, min length: 8, max-length:32, Tooltip: "Entry must match password above "; you will need to use JS code to check that these two fields match in order to submit form.

firstName - mandatory, max length: 25, Tooltip: "Preferred first name.
lastName - mandatory, max length: 25, Tooltip: "Legal last name.
address - optional, max length 30, Tooltip: "Optional: House number and street".
city - optional, max length 25, Tooltip: "Optional: City of residence".
state - optional, max length 2, Tooltip: "Optional: State of residence", dropdown list of two character state codes should be displayed to select state from.
postalCode - optional, 5 character US zipcode format, Tooltip: "Optional: 5 character zip code".
phone - optional, standard 10 character phone number entered in "xxx-xxx-xxxx" format which can be checked using JS or HTML pattern matching, Tooltip: "Optional: Area code plus phone # in 'xxx-xxx-xxxx' format".

*/