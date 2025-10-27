// app.js - frontend interactions using Fetch API to talk to /api/*.php
const apiBase = 'api';

async function fetchJSON(url, options={}){
  const res = await fetch(url, options);
  if(!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

// Dashboard stats
async function loadStats(){
  try{
    const data = await fetchJSON(`${apiBase}/get_stats.php`);
    document.getElementById('students-count').innerText = data.students || 0;
    document.getElementById('courses-count').innerText = data.courses || 0;
    document.getElementById('enrollments-count').innerText = data.enrollments || 0;
  }catch(e){ console.error(e); }
}

// Students page
async function loadStudents(){
  try{
    const data = await fetchJSON(`${apiBase}/get_students.php`);
    const tbody = document.querySelector('#students-table tbody');
    if(!tbody) return;
    tbody.innerHTML = '';
    data.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${s.id}</td><td>${s.name}</td><td>${s.email}</td>
        <td>
          <button onclick="editStudent(${s.id})">Edit</button>
          <button onclick="deleteStudent(${s.id})">Delete</button>
        </td>`;
      tbody.appendChild(tr);
    });
  }catch(e){ console.error(e); }
}

async function addStudent(payload){
  const res = await fetchJSON(`${apiBase}/add_student.php`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return res;
}

async function updateStudent(payload){
  const res = await fetchJSON(`${apiBase}/update_student.php`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return res;
}

async function deleteStudent(id){
  if(!confirm('Delete student id ' + id + '?')) return;
  try{
    await fetchJSON(`${apiBase}/delete_student.php?id=${id}`);
    loadStudents();
  }catch(e){ console.error(e); alert('Delete failed'); }
}

window.editStudent = async function(id){
  try{
    const students = await fetchJSON(`${apiBase}/get_students.php`);
    const s = students.find(x=>x.id==id);
    if(!s) return alert('Student not found');
    document.getElementById('student-id').value = s.id;
    document.getElementById('name').value = s.name;
    document.getElementById('email').value = s.email;
    document.getElementById('save-btn').innerText = 'Update Student';
    document.getElementById('cancel-btn').style.display = 'inline-block';
  }catch(e){ console.error(e); }
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadStats();
  loadStudents();
  // prepare form
  const form = document.getElementById('student-form');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const id = document.getElementById('student-id').value;
      const payload = { name: document.getElementById('name').value, email: document.getElementById('email').value };
      try{
        if(id){
          payload.id = id;
          await updateStudent(payload);
        } else {
          await addStudent(payload);
        }
        // reset
        document.getElementById('student-id').value = '';
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('save-btn').innerText = 'Add Student';
        document.getElementById('cancel-btn').style.display = 'none';
        loadStudents();
        loadStats();
      }catch(err){ console.error(err); alert('Save failed'); }
    });
    const cancelBtn = document.getElementById('cancel-btn');
    if(cancelBtn) cancelBtn.addEventListener('click', ()=>{
      document.getElementById('student-id').value = '';
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('save-btn').innerText = 'Add Student';
      cancelBtn.style.display = 'none';
    });
  }
});