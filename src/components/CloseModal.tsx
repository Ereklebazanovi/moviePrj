import  { useState } from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface CloseModalProps {
  title: string; // Title of the modal
  content: string; // Content to display inside the modal
}

const CloseModal = ({ title, content }: CloseModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex justify-center">
      <Button type="primary" onClick={showModal} className="w-auto mt-5">
        Open Modal
      </Button>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        closeIcon={<CloseOutlined />} // Custom "X" close icon
        title={title}
      >
        <p>{content}</p>
      </Modal>
    </div>
  );
};

export default CloseModal;
