import { GET_PROJECTS } from "../../queries/projectQueries";
import { useQuery } from "@apollo/client";
import Spinner from "../Spinner";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { loading, data, error } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <h1>Something went wrong!</h1>;
  return (
    <div className="row mt-4">
      {data?.projects.length === 0 ? (
        <p>No Projects...</p>
      ) : (
        data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </div>
  );
}
