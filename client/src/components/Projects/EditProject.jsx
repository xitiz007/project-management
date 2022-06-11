import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../../mutations/projectMutations";
import { GET_PROJECTS, GET_PROJECT } from "../../queries/projectQueries";
import ProjectBody from "./ProjectBody";

export default function EditProject({ project, setShowEdit }) {
  const id = project.id;
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    update(cache, { data: { updateProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.map((project) =>
            project.id === updateProject.id
              ? {
                  id: updateProject.id,
                  name: updateProject.name,
                  status: updateProject.status,
                }
              : project
          ),
        },
      });
      cache.writeQuery({
        query: GET_PROJECT,
        data: {
          project: updateProject,
        },
      });
    },
  });
  const onSubmit = (project) => {
    updateProject({
      variables: {
        id,
        name: project.name,
        description: project.description,
        status: project.status,
      },
    });
    setShowEdit(false);
  };
  return (
    <ProjectBody update={true} initialProject={project} onSubmit={onSubmit} />
  );
}
