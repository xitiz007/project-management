import Modal from "../Modal/Modal";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { GET_PROJECTS } from "../../queries/projectQueries";
import { ADD_PROJECT } from "../../mutations/projectMutations";
import ProjectBody from "./ProjectBody";

export default function AddProjectModal() {
  const initialProject = {
    name: "",
    description: "",
    status: "",
    clientId: "",
  };
  const [addProject] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });
  const { loading, data, error } = useQuery(GET_CLIENTS);
  if (loading) return null;
  if (error) return <p>Something went wrong</p>;
  const onSubmit = (project) => {
    addProject({ variables: project });
  };

  return (
    <Modal title="Add Project" id="addProject">
      <ProjectBody
        clients={data.clients}
        initialProject={initialProject}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
