import { Link, useParams } from "react-router-dom";
import { GET_PROJECT } from "../queries/projectQueries";
import { useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/Clients/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProject from "../components/Projects/EditProject";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

export default function Project() {
  const [showEdit, setShowEdit] = useState(false);
  const toggleEditProject = () => setShowEdit((show) => !show);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <h1>Something went wrong!</h1>;

  return (
    <div className="mx-auto w-75 card p-5">
      <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
        Back
      </Link>
      <h1>{data.project.name}</h1>
      <p>{data.project.description}</p>

      <h5 className="mt-3">Project Status</h5>
      <p className="lead">{data.project.status}</p>

      <ClientInfo client={data.project.client} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <div className="m-2">
          <button className="btn btn-primary" onClick={toggleEditProject}>
            <FaEdit className="icon" /> Update Project
          </button>
        </div>
        <DeleteProjectButton id={id} />
      </div>
      {showEdit && (
        <EditProject setShowEdit={setShowEdit} project={data.project} />
      )}
    </div>
  );
}
