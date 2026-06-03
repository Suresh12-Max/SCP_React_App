import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function Home() {
  const [scpSubjects, setScpSubjects] = useState([])
  const [selectedSCP, setSelectedSCP] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')
  const [editId, setEditId] = useState(null)

  const [formData, setFormData] = useState({
    item: '',
    class: '',
    description: '',
    containment: '',
    image: ''
  })

  useEffect(() => {
    fetchSCP()
  }, [])

  function showMessage(text) {
    setMessage(text)

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  async function fetchSCP() {
    const { data, error } = await supabase
      .from('scp_subjects')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.log(error)
    } else {
      setScpSubjects(data)
    }
  }

  function selectSCP(scp) {
    setSelectedSCP(scp)
    setShowForm(false)
    setEditId(null)
  }

  function openAddForm() {
    setShowForm(true)
    setSelectedSCP(null)
    setEditId(null)

    setFormData({
      item: '',
      class: '',
      description: '',
      containment: '',
      image: ''
    })
  }

  function openEditForm(scp) {
    setShowForm(true)
    setSelectedSCP(null)
    setEditId(scp.id)

    setFormData({
      item: scp.item,
      class: scp.class,
      description: scp.description,
      containment: scp.containment,
      image: scp.image || ''
    })
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (editId) {
      const { error } = await supabase
        .from('scp_subjects')
        .update(formData)
        .eq('id', editId)

      if (error) {
        console.log(error)
      } else {
        showMessage('✅ SCP record updated successfully')
      }
    } else {
      const { error } = await supabase
        .from('scp_subjects')
        .insert([formData])

      if (error) {
        console.log(error)
      } else {
        showMessage('✅ New SCP record added successfully')
      }
    }

    setShowForm(false)
    setEditId(null)

    setFormData({
      item: '',
      class: '',
      description: '',
      containment: '',
      image: ''
    })

    fetchSCP()
  }

  async function deleteSCP(id) {
    const confirmDelete = confirm('Are you sure you want to delete this SCP record?')

    if (confirmDelete) {
      const { error } = await supabase
        .from('scp_subjects')
        .delete()
        .eq('id', id)

      if (error) {
        console.log(error)
      } else {
        showMessage('🗑️ SCP record deleted successfully')
        setSelectedSCP(null)
        fetchSCP()
      }
    }
  }

  return (
    <div style={pageStyle}>
      <h2 style={scpSubjectTitleStyle}>SCP Subjects</h2>

      {message && (
        <div style={messageStyle}>
          {message}
        </div>
      )}

      <div style={buttonContainerStyle}>
        {scpSubjects.map((scp) => (
          <button
            key={scp.id}
            onClick={() => selectSCP(scp)}
            style={scpButtonStyle}
          >
            {scp.item}
          </button>
        ))}
      </div>

      <button onClick={openAddForm} style={addButtonStyle}>
        Add New SCP Record
      </button>

      {!selectedSCP && !showForm && (
        <div style={welcomeBoxStyle}>
          <h2 style={welcomeTitleStyle}>
            Welcome to the SCP Foundation Database
          </h2>

          <p style={welcomeTextStyle}>
            Please select an SCP Subject from the buttons above to view detailed
            information including Object Class, Description, and Containment
            Procedures.
          </p>

          <p style={welcomeSmallTextStyle}>
            🔍 Choose an SCP Subject to begin.
          </p>
        </div>
      )}

      {selectedSCP && (
        <div style={cardStyle}>
          {selectedSCP.image && (
            <img
              src={selectedSCP.image}
              alt={selectedSCP.item}
              style={imageStyle}
            />
          )}

          <h2 style={{ color: '#00d2ff', fontSize: '36px' }}>
            {selectedSCP.item}
          </h2>

          <p style={textStyle}>
            <strong>Class:</strong> {selectedSCP.class}
          </p>

          <p style={textStyle}>
            <strong>Description:</strong><br />
            {selectedSCP.description}
          </p>

          <p style={textStyle}>
            <strong>Containment:</strong><br />
            {selectedSCP.containment}
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => openEditForm(selectedSCP)}
              style={editButtonStyle}
            >
              Edit
            </button>

            <button
              onClick={() => deleteSCP(selectedSCP.id)}
              style={deleteButtonStyle}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={{ color: '#00d2ff' }}>
            {editId ? 'Update SCP Record' : 'Add New SCP Record'}
          </h2>

          <input
            name="item"
            placeholder="Item e.g. SCP-002"
            value={formData.item}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="class"
            placeholder="Class e.g. Safe, Euclid, Keter"
            value={formData.class}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="containment"
            placeholder="Containment"
            value={formData.containment}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={addButtonStyle}>
            {editId ? 'Update SCP' : 'Add SCP'}
          </button>
        </form>
      )}
    </div>
  )
}

const pageStyle = {
  backgroundColor: '#1a1a1a',
  minHeight: '100vh',
  color: 'white',
  padding: '25px 40px'
}

const scpSubjectTitleStyle = {
  fontSize: '50px',
  color: '#00d2ff',
  textAlign: 'center',
  marginTop: '0px',
  marginBottom: '25px'
}

const messageStyle = {
  backgroundColor: '#00b894',
  color: 'white',
  padding: '15px',
  borderRadius: '10px',
  textAlign: 'center',
  marginBottom: '20px',
  fontWeight: 'bold',
  maxWidth: '700px',
  marginLeft: 'auto',
  marginRight: 'auto'
}

const buttonContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '14px',
  marginBottom: '30px'
}

const scpButtonStyle = {
  padding: '12px 24px',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '10px',
  backgroundColor: '#333',
  color: 'white',
  border: '1px solid #00d2ff',
  cursor: 'pointer',
  minWidth: '120px'
}

const addButtonStyle = {
  padding: '16px 30px',
  fontSize: '19px',
  fontWeight: 'bold',
  backgroundColor: '#00b894',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  display: 'block',
  margin: '0 auto 35px auto'
}

const welcomeBoxStyle = {
  textAlign: 'center',
  marginTop: '45px',
  padding: '45px',
  backgroundColor: '#2b2b2b',
  borderRadius: '15px',
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  border: '1px solid #00d2ff'
}

const welcomeTitleStyle = {
  color: '#00d2ff',
  fontSize: '34px',
  marginBottom: '20px'
}

const welcomeTextStyle = {
  fontSize: '20px',
  color: '#ddd',
  lineHeight: '1.8'
}

const welcomeSmallTextStyle = {
  fontSize: '18px',
  color: '#00d2ff',
  marginTop: '20px'
}

const cardStyle = {
  maxWidth: '800px',
  backgroundColor: '#2b2b2b',
  padding: '30px',
  borderRadius: '14px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
  margin: '30px auto'
}

const imageStyle = {
  width: '100%',
  maxHeight: '370px',
  objectFit: 'contain',
  backgroundColor: '#111',
  borderRadius: '12px',
  marginBottom: '20px'
}

const formStyle = {
  maxWidth: '800px',
  backgroundColor: '#2b2b2b',
  padding: '30px',
  borderRadius: '14px',
  margin: '30px auto'
}

const inputStyle = {
  width: '100%',
  padding: '14px',
  marginBottom: '14px',
  borderRadius: '8px',
  border: 'none',
  fontSize: '16px'
}

const textStyle = {
  fontSize: '18px',
  lineHeight: '1.5'
}

const editButtonStyle = {
  padding: '12px 18px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#0984e3',
  color: 'white',
  cursor: 'pointer',
  fontSize: '16px'
}

const deleteButtonStyle = {
  padding: '12px 18px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#d63031',
  color: 'white',
  cursor: 'pointer',
  fontSize: '16px'
}

export default Home