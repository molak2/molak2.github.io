
////--------counting # of files in a folder--------///////
// var fs = require('fs'); 
// fs.readdir( '/home/molnar/Dokumentumok/GreenFox/Receptkönyv/Receptek', (error, files) => { 
//    let totalFiles = files.length; // return the number of files
//    console.log(totalFiles); // print the total number of files
// });
//////////----------------------------------------///////

///////------------read in files line by line-----------//////
// var fs = require('fs');
// var contents = fs.readFileSync('./Receptek/1.txt', 'utf8');
// console.log(contents);
///////////////-------------------------///////////////


var temp=[];
var hozzavalok = [];
var elkeszites = [];
////-------beolvasas-----------////
for (let i = 1; i < 12; i++) {
    $.get('Receptek/' + i + '.txt', function (textData, status) {
        var aLines = textData.split("\n");
        
        $('#myList').append('<option>' + aLines[0] + '</option>');
        temp.push(aLines[0]);   
        hozzavalok.push(aLines[1]);
        elkeszites.push(aLines[2]);
    }, 'text');
}

////-----hozzavalok elkeszites megjelenites-----///
$("select")
.change(function () {
    let str;
    $("select option:selected").each(function () {
        let nev=$(this).text();
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].includes(nev)) {
                str=i;
                // console.log(ind);
                // $(this).append(temp[i]);
                
            }  
        }
        // str = $(this).index();
    });
    $('#ing').empty();
    $('#how').empty();
    $('#ing').append(hozzavalok[str]);
    $('#how').append(elkeszites[str]);
})
.change();

///---------------name search-------////
// $(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $("#myInput").val().toLowerCase();
        $("#myList option").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
// });

////-----------ingredient search---------/////
$("#IngButt").on("click", function () {
    var value = $('#IngSearch').val().toLowerCase();
    var ind=[];
        for (let i = 0; i < hozzavalok.length; i++) {
            if (hozzavalok[i].includes(value)) {
                ind.push(i);
                // $(this).append(temp[i]);
                
            }  
        }
        if(value.length===0)
        {
            alert("Nem adtál meg hozzávalót!"); 
            $('#myList').empty();
            for (let i = 0; i < temp.length; i++) {
                
                $('#myList').append('<option>' + temp[i] + '</option>');          
                
            }
        }
        else if(ind.length===0){
            alert("Nincs találat!");
            
                 $('#IngSearch:text').val('');
                
        }
        else{
        $('#myList').empty();
        // $('#ing').empty();
        // $('#how').empty();
            for (let i = 0; i < ind.length; i++) {
            
                $('#myList').append('<option>' + temp[ind[i]] + '</option>');
            // $('#ing').append(hozzavalok[ind[i]]);
            // $('#how').append(elkeszites[ind[i]]);
            // $("#myList option").toggle($("#myList option").text().toLowerCase().indexOf(temp[ind]) > -1)   
                }
        }
    // $("#myList option").filter(function () {
      
        
    // });
});
///////----------List refill if ingSearch is empty---//
$('#IngSearch').on('keyup',function (){
    if($('#IngSearch').val()==='')
    {
        $('#myList').empty();
        for (let i = 0; i < temp.length; i++) {
            
            $('#myList').append('<option>' + temp[i] + '</option>');          
            
        }       
    }
})


