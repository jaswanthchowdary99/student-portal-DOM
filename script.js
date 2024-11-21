let students = [];

fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
.then((response)=>response.json()).
 then((data) =>{
    students = data;
    renderTable(students)
 }).catch((error)=>console.log(`Error while fetching data`,error))


 function renderTable(data){
    let table = document.querySelector("#student-table tbody");
     table.innerHTML = "";
     
     data.map((student) => {
        let row = document.createElement("tr");
        row.innerHTML = `
         <td>${student.id}</td>
         <td>${student.first_name} ${student.last_name}</td>
          <td>${student.gender}</td>
           <td>${student.class}</td>
            <td>${student.marks}</td>
             <td>${student.passing ? 'Passed' : 'Failed'}</td>
              <td>${student.email}</td>
        `
        table.appendChild(row);
     });
 }

 function handleSearch(){
   
    let searchValue = document.getElementById("search-bar").value.toLowerCase();
        let filteredData = students.filter((student) =>
        student.first_name.toLowerCase().includes(searchValue) || 
        student.last_name.toLowerCase().includes(searchValue)  ||
        student.email.toLowerCase().includes(searchValue)
        );
        renderTable(filteredData);
 }
 
 let sortA_Z = document.getElementById("sort1-btn");
  sortA_Z.addEventListener('click',function(){
   students.sort((a,b)=>a.first_name.localeCompare(b.first_name));
   renderTable(students);
 })

 let sortZ_A = document.getElementById("sort2-btn");
  sortZ_A.addEventListener('click',function(){
   students.sort((a,b)=>b.first_name.localeCompare(a.first_name));
   renderTable(students);
 })

  let sortByMarks = document.getElementById("sort3-marks");
  sortByMarks.addEventListener('click', function(){
    students.sort((a,b)=>a.marks-b.marks)
    renderTable(students);
  })

  let sortByPass = document.getElementById("sort4-pass");
  sortByPass.addEventListener('click',()=>{
  let passingStidents = students.filter((student)=> student.passing === true)
   console.log(passingStidents);
   renderTable(passingStidents);
  })

  let sortByClass = document.getElementById("sort5-class");
  sortByClass.addEventListener('click', function(){
    students.sort((a,b)=>a.class-b.class)
    renderTable(students);
  })

  function handleSortByGender() {
   let tableContainer = document.getElementById("table-container");
   tableContainer.innerHTML = ""; 
   let maleStudents = students.filter(student => student.gender.toLowerCase() === "male");
   let femaleStudents = students.filter(student => student.gender.toLowerCase() === "female");

   function createTable(data, label) {
       let section = document.createElement("section");
       section.innerHTML = `
           <h3>${label}</h3>
           <div class="table-box">
               <table id="student-table">
                   <thead>
                       <tr>
                           <th>ID</th>
                           <th>Name</th>
                           <th>Gender</th>
                           <th>Class</th>
                           <th>Marks</th>
                           <th>Passing</th>
                           <th>Email</th>
                       </tr>
                   </thead>
                   <tbody>
                       ${data.map(student => `
                           <tr>
                               <td>${student.id}</td>
                               <td>${student.first_name} ${student.last_name}</td>
                               <td>${student.gender}</td>
                               <td>${student.class}</td>
                               <td>${student.marks}</td>
                               <td>${student.passing ? 'passed' : 'failed'}</td>
                               <td>${student.email}</td>
                           </tr>
                       `).join("")}
                   </tbody>
               </table>
           </div>
       `;
       tableContainer.appendChild(section);
   }

   createTable(maleStudents, "Male Students");
   createTable(femaleStudents, "Female Students");

  
}
