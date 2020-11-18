import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import {
  Form,
  Input,
  Upload,
  Button,
  Typography,
  Divider,
  Spin,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import firebase from "../../firebaseConfig";
import ExampleCoupon from "../ExampleCoupon";
import "firebase/storage";

const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref(); // change the storage rule to "request.auth != null" once auth is setup
const { Title } = Typography;
const { Dragger } = Upload;

const EditOrganization = ({ isTesting }) => {
  const { t } = useTranslation();
  const [organization, setOrganization] = useState({});
  const [loading, setLoading] = useState(true);
  const folderName = useRef(null);
  const fileURL = useRef(null);
  const fileName = useRef(null);

  useEffect(() => {
    const unsubscribe = db
      .collection("restaurants")
      .where("name", "==", "Arby's") // this needs to come from registration/auth
      .onSnapshot((snapshot) => {
        const dataArr = [];
        snapshot.forEach((doc) => {
          dataArr.push({ ...doc.data(), docId: doc.id });
        });
        setOrganization(dataArr[0]);
        folderName.current = dataArr[0].name;
        setLoading(false);
      });
    return unsubscribe;
  }, []);

  const updateOrgDetail = (data) => {
    db.collection("restaurants")
      .doc(organization.docId)
      .update({
        name: data.name,
        website: data.website,
        description: data.description,
        email: data.email,
        logo: `${storageRef}${folderName.current}/${data.logo[0].name}`,
        logoURL: data.logo[0].url || fileURL.current,
        logoName: data.logo[0].name,
      })
      .then(() => message.success("Successfully updated organization details!"))
      .catch(() => message.warning("Failed to update organization details!"));
  };

  const uploadFile = (e) => {
    if (e.file.status !== "removed") {
      const logoRef = storageRef.child(`${folderName.current}/${e.file.name}`);
      logoRef
        .put(e.file)
        .then(() => {
          message.success(`${e.file.name} file uploaded successfully.`);
          fileName.current = e.file.name;
          logoRef.getDownloadURL().then((url) => (fileURL.current = url));
        })
        .catch(() => message.error(`${e.file.name} file upload failed.`));
    }
    return e.fileList;
  };

  const defaultLogo = {
    uid: "-1",
    url: organization.logoURL || "",
    name: organization.logoName || "",
    status: "done",
  };

  return (
    <div className="editOrg">
      <Divider className="editOrgDivider">
        <Title level={3}>{t("editOrganization.title")}</Title>
      </Divider>
      {loading ? (
        <Spin size="large" tip="Loading..." className="spin" />
      ) : (
        <div className="editOrgFlex">
          <div className="editOrgFlexChild form">
            <Form
              size="large"
              wrapperCol={{ span: 24 }}
              name="editOrganization"
              onFinish={(values) => updateOrgDetail(values)}
              initialValues={{
                name: organization.name,
                email: organization.email,
                website: organization.website,
                description: organization.description,
                logo: organization.logo ? [defaultLogo] : null,
              }}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: t("editOrganization.messages.message0"),
                  },
                ]}
              >
                <Input
                  placeholder={t("editOrganization.placeholders.placeholder0")}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: t("editOrganization.messages.message1"),
                  },
                ]}
              >
                <Input
                  placeholder={t("editOrganization.placeholders.placeholder1")}
                />
              </Form.Item>
              <Form.Item name="website">
                <Input
                  placeholder={t("editOrganization.placeholders.placeholder2")}
                />
              </Form.Item>
              <Form.Item name="description">
                <Input.TextArea
                  placeholder={t("editOrganization.placeholders.placeholder3")}
                />
              </Form.Item>
              <Form.Item
                name="logo"
                valuePropName="fileList"
                getValueFromEvent={uploadFile}
              >
                <Dragger
                  accept=".jpeg, .png, .jpg"
                  name="files"
                  listType="picture"
                  beforeUpload={() => false}
                  defaultFileList={organization.logo ? [defaultLogo] : null}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    {t("editOrganization.upload.text")}
                  </p>
                  <p className="ant-upload-hint">
                    {t("editOrganization.upload.tip")}
                  </p>
                </Dragger>
              </Form.Item>
              <Form.Item>
                {isTesting ? (
                  <button type="submit">Save</button>
                ) : (
                  <Button
                    block
                    className="editOrgButton"
                    type="primary"
                    htmlType="submit"
                  >
                    {t("editOrganization.buttons.button0")}
                  </Button>
                )}
              </Form.Item>
              <Form.Item>
                {isTesting ? (
                  <button type="button">Reset Password</button>
                ) : (
                  <Button block danger>
                    {t("editOrganization.buttons.button1")}
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
          <div className="editOrgFlexChild coupon">
            <ExampleCoupon
              orgName={organization.name}
              orgLink={organization.website}
              orgDescription={organization.description}
              logoURL={organization.logoURL}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditOrganization;
