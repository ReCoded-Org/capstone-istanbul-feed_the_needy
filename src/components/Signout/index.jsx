import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, message } from "antd";
import "./style.css";
import { useTranslation } from "react-i18next";
import firebase from "../../firebaseConfig";

const auth = firebase.auth();

const Signout = ({ setUserExist }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();

  const handleOk = () => {
    auth
      .signOut()
      .then(() => {
        setModalVisible(false);
        setUserExist(false);
        message.success("Successfully logged out!");
      })
      .catch((error) => {
        message.warning(error.message);
      });
    history.push("/");
  };

  return (
    <>
      <span
        className="logoutButton"
        type="button"
        onClick={() => setModalVisible(true)}
      >
        {t("navbar.headers.header3")}
      </span>
      <Modal
        title={t("navbar.headers.header3")}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
        locale={{ okText: t("logout.ok"), cancelText: t("logout.cancel") }}
      >
        <p>{t("logout.text")}</p>
      </Modal>
    </>
  );
};

export default Signout;
