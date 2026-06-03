function Navbar() {
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "white",
        textAlign: "center",
        padding: "20px",
        borderBottom: "2px solid #00d2ff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.DkJ-kZ8Tzf32CVdxMNI1WgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt=""
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
          }}
        />

        <div>
          <h1
            style={{
              color: "#00d2ff",
              fontSize: "48px",
              marginBottom: "10px",
            }}
          >
            Secure Containment Procedures Catalog
          </h1>

          <p
            style={{
              fontSize: "22px",
              margin: 0,
            }}
          >
            SCP Subject Management System
          </p>
        </div>
      </div>
    </div>
  )
}

export default Navbar