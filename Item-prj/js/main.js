
var theTableBody = document.getElementById("the-table-body");
var nameSites = document.getElementById("nameSite");
var urlSites = document.getElementById("urlSite");
var listArr;
var regex = /^(.[A-Z]|[a-z])/;

nameSites.addEventListener("keyup",function(){

    if(regex.test(nameSites.value)==false)
    {
        nameSites.classList.add("is-invalid");
        nameSites.classList.remove("is-valid")

    }
    else
    {
        nameSites.classList.add("is-valid");
        nameSites.classList.remove("is-invalid")
    }
});


if(localStorage.getItem("mySite")==null)
{
    listArr=[];
}

else{

    listArr = JSON.parse( localStorage.getItem("mySite") );
    displaySite();
}


function addSite()
{
 
    var site= 
    {
        name:nameSites.value,
        url:urlSites.value
        
    }
if( (site.name.trim()=="") || (site.url.trim() =="") )
{
    swal("warning!", "You Dont Add Name Site and Url Site!", "warning");
}
else{

    listArr.push(site);
    localStorage.setItem("mySite",JSON.stringify(listArr));
    displaySite();
    swal("Good job!", "You clicked the button!", "success");
    clearForm()
}


}






function  displaySite()
{

    box = ``;

    for(var i=0; i<listArr.length; i++)
    {
        box += `<tr>
        <td>`+i+`</td>
        <td>`+listArr[i].name+`</td>
        <td> <a class='btn btn-primary' target='_blank' href=`+listArr[i].url+`>Visit <i class="fas fa-eye"></i></a>
        <button class='btn btn-success'  onclick= "updateForm(`+i+`)">Update <i class="fas fa-edit"></i></button>
        <button class='btn btn-danger' onclick = "deleteForm(`+i+`)">Delete <i class="fas fa-trash-alt"></i></button>
        </td>
        </tr>`;
    }

    theTableBody.innerHTML = box;


}

function clearForm()
{
    nameSites.value ="";
    urlSites.value ="";
}


function deleteForm(index)
{

  swal(
      {
          title:"Are you sure?",
          text:"You will not be able to recover this imaginary file!",
          icon:"error",
          buttons:true,
          confirmButtonClass: "btn-danger",
         confirmButtonText: "Yes, delete it!",
      }).then((value)=>
      {
          if(value){

            swal("Deleted!", "Your imaginary file has been deleted.", "success");
            listArr.splice(index,1);
            localStorage.setItem("mySite",JSON.stringify(listArr));
            displaySite();
          }
          else{
            swal("Cancelled", "Your imaginary file is safe ", "error");
          }
      })
 
  


}


function updateForm(index)
{
    var box = ``;
    
    for(var i=0; i<listArr.length; i++)
    {
        if(index == i)
        {

            box += `<tr>
                  <td class='pt-3'>`+index+`</td>
                  <td>
                    <div class="input-group input-group-md">
                    <div class="input-group-prepend">
                    <span class="input-group-text" >New Name Site</span>
                    </div>
                    <input id='theName' type="text" placeholder="Type your name website" value='`+listArr[index].name+`'>
                    </div>
                  </td> 


                  <td>
                  <div class="input-group input-group-md">
                  <div class="input-group-prepend">
                  <span class="input-group-text" >New URL Site</span>
                  </div>
                  <input id='theUrl' type="text" placeholder="Type your name website" value='`+listArr[index].name+`'>
                  </div>
                </td> 

                <td>
                <button class='btn btn-primary' onclick= "saveForm(`+i+`);">Save</button>
                <button class='btn btn-danger' onclick = "CancelForm(`+i+`);">Cancel</button>
                </td>
            </tr> `
        }


    }  
        theTableBody.innerHTML = box;
}


function saveForm(index)
{
    var x = document.getElementById('theName');
    var y = document.getElementById('theUrl');
    listArr[index].name = x.value;
    listArr[index].url = y.value;
    localStorage.setItem("mySite",JSON.stringify(listArr))
    displaySite();
}

function CancelForm()
{
    
    displaySite();
}


function search(term)
{

    var tableBox=``;
    searchBox=``;
    var searchDiv=``;

    if(term=="")
    {
        document.getElementById("searchDiv").style.display = "none";

        for(var i=0; i<listArr.length;i++)
        {
            if(listArr[i].name.includes(term.trim()) == true)
            {  
    
                // tableBox += `<tr>
                // <td>`+i+`</td>
                // <td>`+listArr[i].name+`</td>
                // <td> <a class='btn btn-primary' target='_blank' href=`+listArr[i].url+`>Visit</a>
                // <button class='btn btn-success'  onclick= "updateForm(`+i+`)">Update</button>
                // <button class='btn btn-danger' onclick = "deleteForm(`+i+`)">Delete</button>
                // </td>
                // </tr>`;
                displaySite();
    
            searchDiv = listArr[i].name.replace(term,"<span style='color:red; font-size: 30px;'>"+term+"</span>")
            searchBox ="<p>"+searchDiv+"</p>"
    
            }
        }
    
        // document.getElementById('the-table-body').innerHTML = tableBox;
        document.getElementById('searchDiv').innerHTML = searchBox;

    }


    else{


        document.getElementById("searchDiv").style.display = "block";
        for(var i=0; i<listArr.length;i++)
        {
            if(listArr[i].name.includes(term.trim()) == true)
            {  
    
                // tableBox += `<tr>
                // <td>`+i+`</td>
                // <td>`+listArr[i].name+`</td>
                // <td> <a class='btn btn-primary' target='_blank' href=`+listArr[i].url+`>Visit</a>
                // <button class='btn btn-success'  onclick= "updateForm(`+i+`)">Update</button>
                // <button class='btn btn-danger' onclick = "deleteForm(`+i+`)">Delete</button>
                // </td>
                // </tr>`;

                ///////////////// or we can put function displaySite

                displaySite();
    
            searchDiv = listArr[i].name.replace(term,"<span style='color:red; font-size: 30px;'>"+term+"</span>")
            searchBox ="<p>"+searchDiv+"</p>"
    
            }
        }
    
        // document.getElementById('the-table-body').innerHTML = tableBox;
        document.getElementById('searchDiv').innerHTML = searchBox;

        
    }

   
}


