const studentName = document.querySelector('#name');
const studentSection = document.querySelector('#section');
const dateOfAdmission = document.querySelector('#date');
const submitBtn = document.querySelector('input[type="submit"]')
const tableBody = document.querySelector('tbody');
console.log(tableBody.children)
const searchBar = document.querySelector('#search-bar');

 window.onload = (event) => {
        if(!localStorage.getItem('students')) {
            localStorage.setItem('students', JSON.stringify([]))
        } else {
            const studentList = JSON.parse(localStorage.getItem('students'));
            studentList.forEach(student => {
                const serialNum = tableBody.children.length + 1;
                const newTablerow = document.createElement('tr');
                newTablerow.id = 'table-row';
                const newTableData = document.createElement('td');
                // newTableData.className = 'd-flex justify-content-end m-0'
                const dltBtn = document.createElement('button');
                dltBtn.innerText = 'X';
                dltBtn.className = 'delete-btn';
                dltBtn.setAttribute('data-id', `${student.id}`)
                newTableData.append(dltBtn);
                newTablerow.innerHTML = `   <th scope="row">${serialNum}</th>
                                            <td id='student-name'>${student.name}</td>
                                            <td>${student.section}</td>
                                            <td>${student.addDate}</td>
                                        `
                newTablerow.insertAdjacentElement('beforeend', newTableData);
                tableBody.append(newTablerow);

                        
                dltBtn.addEventListener('click', () => {
                    const deletedStudentId = dltBtn.dataset.id
                    if(confirm('Are you sure?')) {
                        const updatedList = studentList.filter(student => student.id !== Number(deletedStudentId))
                        console.log(updatedList)
                        localStorage.setItem('students', JSON.stringify(updatedList))
                        newTablerow.remove();
                    }
                    
                });
            })
        }
    };


submitBtn.addEventListener('click', addStudentToList);
searchBar.addEventListener('input', searchStudent);

function addStudentToList(e) {

    e.preventDefault();
    if(studentName.value != '' && studentSection.value != '' && dateOfAdmission.value != '') {
  
        const randomNum = Math.floor(Math.random() * 1000000000000)
        const studentData = {
            id: randomNum,
            name: studentName.value,
            section: studentSection.value,
            addDate: dateOfAdmission.value
        }
        const studentList = JSON.parse(localStorage.getItem('students'))
        studentList.push(studentData)
        localStorage.setItem('students', JSON.stringify(studentList))

        const serialNum = tableBody.children.length + 1;
        const newTablerow = document.createElement('tr');
        newTablerow.id = 'table-row';
        const newTableData = document.createElement('td');
        // newTableData.className = 'd-flex justify-content-end m-0'
        const dltBtn = document.createElement('button');
        dltBtn.innerText = 'X';
        dltBtn.className = 'delete-btn';
        dltBtn.setAttribute('data-id', `${randomNum}`)
        newTableData.append(dltBtn);
        newTablerow.innerHTML = `   <th scope="row">${serialNum}</th>
                                    <td id='student-name'>${studentName.value}</td>
                                    <td>${studentSection.value}</td>
                                    <td>${dateOfAdmission.value}</td>
                                `
        newTablerow.insertAdjacentElement('beforeend', newTableData);
        tableBody.append(newTablerow);
        studentName.value = studentSection.value = dateOfAdmission.value = '';

        dltBtn.addEventListener('click', () => {
            
            if(confirm('Are you sure?')) {
                newTablerow.remove();
            }
            
        });

    } else {
        alert('insert all data')
    }
}

function searchStudent() {
    let inputValue = searchBar.value.toLowerCase();

    const tableRows = document.querySelectorAll('#table-row');
    // console.log(tableRows)
    tableRows.forEach((row) => {
        
        const rowNameValue = row.getElementsByTagName('td')[0].innerText
        const rowNameValueLowCase = rowNameValue.toLowerCase();
        const isMatched = rowNameValueLowCase.indexOf(inputValue)
        if(isMatched != -1) {
            row.style.display = 'table-row';

            let regExp = new RegExp(inputValue, 'gi');
            const boldName = rowNameValue.slice(0, inputValue.length)

            row.getElementsByTagName('td')[0].innerHTML = rowNameValue.replace(regExp, `<b>${boldName}</b>`);

        } else {
            row.style.display = 'none';
        }
    })
}

