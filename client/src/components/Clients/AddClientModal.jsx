import { useState } from "react";
import { ADD_CLIENT } from "../../mutations/clientMutations";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { useMutation } from "@apollo/client";
import Modal from "../Modal/Modal";

const initialClient = {
  name: "",
  email: "",
  phone: "",
};

export default function AddClientModal() {
  const [client, setClient] = useState(initialClient);
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: client.name,
      email: client.email,
      phone: client.phone,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });
  const reset = () => setClient(initialClient);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setClient((client) => ({ ...client, [name]: value }));
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    addClient();
  };

  return (
    <Modal title="Add Client" reset={reset} id="addClient">
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={client.name}
            onChange={onChangeHandler}
          />
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              required
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={client.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              required
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={client.phone}
              onChange={onChangeHandler}
            />
          </div>

          <button
            type="submit"
            className="btn btn-secondary"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
