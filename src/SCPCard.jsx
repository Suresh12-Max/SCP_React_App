function SCPCard({ scp, deleteSCP, editSCP }) {
  return (
    <div style={{
      width: '320px',
      backgroundColor: '#2b2b2b',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
    }}>
      {scp.image && (
        <img
          src={scp.image}
          alt={scp.item}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'contain',
            backgroundColor: '#111'
          }}
        />
      )}

      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#00d2ff' }}>{scp.item}</h2>

        <p><strong>Class:</strong> {scp.class}</p>

        <p>
          <strong>Description:</strong><br />
          {scp.description}
        </p>

        <p>
          <strong>Containment:</strong><br />
          {scp.containment}
        </p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={() => editSCP(scp)}
            style={{
              padding: '10px 15px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#00b894',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteSCP(scp.id)}
            style={{
              padding: '10px 15px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#d63031',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default SCPCard