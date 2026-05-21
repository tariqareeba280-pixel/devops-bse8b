import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/students')
      .then(res => res.json())
      .then(data => setStudents(data.data))
      .catch(err => console.log(err));

    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(err => console.log(err));
  }, []);

  const addStudent = () => {
    fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, course, grade })
    })
      .then(res => res.json())
      .then(data => {
        setStudents([...students, data.data]);
        setName(''); setCourse(''); setGrade('');
      });
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>
        DevOps Final Project - BSE-8B
      </h1>
      <div style={{ background: '#27ae60', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', marginBottom: '20px' }}>
        Backend Status: {status || 'Connecting...'}
      </div>

      <div style={{ background: '#ecf0f1', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Add Student</h2>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}
          style={{ padding: '8px', margin: '5px', borderRadius: '4px', border: '1px solid #bdc3c7' }} />
        <input placeholder="Course" value={course} onChange={e => setCourse(e.target.value)}
          style={{ padding: '8px', margin: '5px', borderRadius: '4px', border: '1px solid #bdc3c7' }} />
        <input placeholder="Grade" value={grade} onChange={e => setGrade(e.target.value)}
          style={{ padding: '8px', margin: '5px', borderRadius: '4px', border: '1px solid #bdc3c7' }} />
        <button onClick={addStudent}
          style={{ padding: '8px 16px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', margin: '5px', cursor: 'pointer' }}>
          Add Student
        </button>
      </div>

      <h2>Students List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#3498db', color: 'white' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Course</th>
            <th style={{ padding: '10px' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #bdc3c7' }}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{s.id}</td>
              <td style={{ padding: '10px' }}>{s.name}</td>
              <td style={{ padding: '10px' }}>{s.course}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{s.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
