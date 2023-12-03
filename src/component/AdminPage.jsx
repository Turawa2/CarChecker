import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [fullname, setFullname] = useState("");
  const [rank, setRank] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:7000/api/getImages")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCancel = () => {
    navigate("/");
  };

  const handleEdit = (id) => {
    setEditMode(true);
    setEditId(id);

    // Fetch admin for editing
    const adminToEdit = images.find((admin) => admin.id === id);
    setFullname(adminToEdit.fullname);
    setRank(adminToEdit.rank);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setFullname("");
    setRank("");
    setPassword("");
    setImage([]);
  };

  const onUpdate = async (e) => {
    e.preventDefault();

    //formdata
    let formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("rank", rank);
    formData.append("password", password);

    try {
      // Update the admin details
      await axios.put(`http://localhost:7000/api/admin/${editId}`, formData);
      alert("Admin details updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating admin details:", error.message);
    }
  };

  const onSub = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("imgfile", image[0]);
    formData.append("fullname", fullname);
    formData.append("rank", rank);
    formData.append("password", password);

    try {
      //  create a new admin
      let res = await axios.post("http://localhost:7000/api/admin", formData);
      alert(res.data.submit ? "Admin inserted successfully!" : res.data.msg);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const onDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:7000/api/admin/${id}`);
        alert("Admin deleted successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error deleting admin:", error.message);
      }
    }
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">ADMINISTRATORS</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> S/N </th>
                      <th> Full name </th>
                      <th> Rank </th>
                      <th> Actions </th>
                    </tr>
                  </thead>
                  <tbody>
                    {images.map((admin, index) => (
                      <tr key={admin.id}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`http://localhost:7000/public/upload/${admin.image}`}
                            download={admin.fullname}
                          >
                            <img
                              src={`http://localhost:7000/public/upload/${admin.image}`}
                              alt="image"
                            />
                          </a>
                          <span className="pl-2">{admin.fullname}</span>
                        </td>
                        <td>{admin.rank}</td>
                        <td>
                          <div
                            className="badge badge-outline-warning mr-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEdit(admin.id)}
                          >
                            Edit
                          </div>
                          <div
                            className="badge badge-outline-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => onDelete(admin.id)}
                          >
                            Delete
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 grid-margin">
          <div className="card ">
            <div className="card-body">
              <h4 className="card-title">
                {editMode ? "EDIT ADMIN" : "ADD ADMIN"}
              </h4>
              <form
                className="form-sample"
                onSubmit={editMode ? onUpdate : onSub}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Full name
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control text-light"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Rank</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control text-light"
                          value={rank}
                          onChange={(e) => setRank(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Password
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control text-light"
                          disabled={editMode}
                          type="password"
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Passport
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control text-light"
                          disabled={editMode}
                          type="file"
                          onChange={(e) => setImage(e.target.files)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                {!editMode ? (
                  <>
                    <button
                      className="btn btn-danger mb-2 mr-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary mb-2 " type="submit">
                      Submit
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-danger mb-2 mr-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary mb-2 " type="submit">
                      Update
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
