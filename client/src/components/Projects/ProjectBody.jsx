import React, { useState } from "react";

export default function ProjectBody({ clients, initialProject, update = false, onSubmit }) {
  const [project, setProject] = useState(initialProject);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setProject((project) => ({ ...project, [name]: value }));
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    onSubmit(project)
    setProject(initialProject);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          required
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={project.name}
          onChange={onChangeHandler}
        />

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            required
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={project.description}
            onChange={onChangeHandler}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            required
            id="status"
            name="status"
            className="form-select"
            value={project.status}
            onChange={onChangeHandler}
          >
            <option value="">Choose project status</option>
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {!update && (
          <div className="mb-3">
            <label className="form-label">Client</label>
            <select
              required
              name="clientId"
              id="clientId"
              className="form-select"
              value={project.clientId}
              onChange={onChangeHandler}
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-secondary">
          {update ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}
