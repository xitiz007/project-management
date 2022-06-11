import AddClientModal from "../components/Clients/AddClientModal";
import Clients from "../components/Clients/Clients";
import AddProjectModal from "../components/Projects/AddProjectModal";
import Projects from "../components/Projects/Projects";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
}
