function ValidateEmail(){
    let email = document.form1.email.value;
    console.log(email);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if(email.match(mailformat))
   {
       window.location.href="./index.html";
       return false;
   }
   else
   {
   alert("You have entered an invalid email address!");
   document.form1.email.focus();
   return false;
   }
}