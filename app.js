function copyrightYear() {
    var d = new Date();
    var y = d.getFullYear();
    document.getElementById("copyright").innerHTML = '&copy; ' + y + ' Rehab Reps All Rights Reserved';
 }
 
 copyrightYear();