import { Tabs, FileUpload, Modal, Skeleton } from "components";
import useAuth from "hooks/useAuth";
import useFetch from "hooks/useFetch";
import { useState } from "react";

const AddProductForm = ({ isOpen, closeModal, openModal }: any) => {
  const [formDatas, setFormData] = useState({
    "name[ar]": "",
    "name[en]": "",
    sort: 0,
  });
  const [image, setImage] = useState("");
  const auth = useAuth();
  const { loading, error, fetchData } = useFetch(
    `/vendor/manufacturers`,
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
      body: {},
    },
    (data) => {
      console.log("success", data);
    }
  );

  let test = new FormData();

  const handleChange = (e: any) => {
    setFormData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("test", test);
  };
  const saveChanges = () => {
    console.log("test", test);
    // fetchData();
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      dialogTitle="Add Manufacturer"
      openModal={openModal}
      actionFunc={() => saveChanges()}
    >
      {loading ? (
        <Skeleton numberOfLoaders={10} />
      ) : (
        <form onSubmit={handleSubmit}>
          <FileUpload file={image} setFile={setImage} />

          <Tabs
            formData={formDatas}
            setFormData={setFormData}
            handleChange={handleChange}
          />
          <button type="submit">ss</button>
          {error && error.message}
        </form>
      )}
    </Modal>
  );
};

export default AddProductForm;
