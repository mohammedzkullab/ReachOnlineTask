import { Tabs, FileUpload, Modal, Button } from "components";
import { API_URL } from "data/constants";
import useAuth from "hooks/useAuth";
import { useState } from "react";

const AddProductForm = ({
  setisMutate,
  isOpen,
  closeModal,
  openModal,
}: any) => {
  const [formDatas, setFormData] = useState({
    "name[ar]": "",
    "name[en]": "",
    sort: 0,
  });
  const [image, setImage] = useState("");
  const auth = useAuth();

  const handleChange = (e: any) => {
    setFormData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name[ar]", formDatas["name[ar]"]);
    formData.append("name[en]", formDatas["name[en]"]);
    formData.append("sort", formDatas.sort.toLocaleString());
    formData.append("image", image);

    fetch(`${API_URL}/vendor/manufacturers`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setisMutate((prev: any) => !prev);
        closeModal();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      dialogTitle="Add Manufacturer"
      openModal={openModal}
    >
      <form onSubmit={handleSubmit}>
        <FileUpload file={image} setFile={setImage} />
        <Tabs
          formData={formDatas}
          setFormData={setFormData}
          handleChange={handleChange}
        />
        <div className="mt-4 flex justify-end gap-3 items-center">
          <Button
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            cancle
          </Button>
          <Button
            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductForm;
