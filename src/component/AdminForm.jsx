import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminForm() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };

  const [fullname, setFullname] = useState("");
  const [rank, setRank] = useState("");
  const [password, setPassword] = useState([]);
  const [image, setImage] = useState([]);

  const onSub = async (e) => {
    let formData = new FormData();
    formData.append("imgfile", image[0]);
    formData.append("fullname", fullname);
    formData.append("rank", rank);
    formData.append("password", password);

    e.preventDefault();

    let res = await axios.post("http://localhost:7000/api/admin", formData);

    alert(res.data);
  };
  return (
    <>
      <div class="col-12 grid-margin">
        <div class="card ">
          <div class="card-body">
            <h4 class="card-title">ADD ADMIN </h4>
            <form class="form-sample" onSubmit={onSub}>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Full name</label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control text-light"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Rank</label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control text-light"
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Password</label>
                    <div class="col-sm-9">
                      <input
                        class="form-control  text-light"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Passport</label>
                    <div class="col-sm-9">
                      <input
                        class="form-control  text-light"
                        type="file"
                        onChange={(e) => setImage(e.target.files)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <button class="btn btn-danger mb-2 mr-2" onClick={handleCancel}>
                Cancel
              </button>
              <button class="btn btn-primary mb-2 ">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminForm;
