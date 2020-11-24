import React, { useEffect, useState } from "react";
import "./style.css";
import { Bar } from "react-chartjs-2";
import { Typography, Divider, Statistic, Row, Col, Card, Spin } from "antd";
import { useTranslation } from "react-i18next";
import firebase from "../../firebaseConfig";

const db = firebase.firestore();
const auth = firebase.auth();
const { Title } = Typography;
const date = new Date();

const CouponsChart = () => {
  const { t } = useTranslation();
  const [soldCoupons, setSoldCoupons] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const unsubscribeStats = db
          .collection("sampleSoldCoupons")
          .doc(user.uid)
          .collection("coupons")
          .where("sellDate", "<=", date)
          .onSnapshot((snapshot) => {
            const dataArr = [];
            snapshot.forEach((doc) => {
              dataArr.push({ ...doc.data() });
              setStatistics(dataArr);
            });
          });
        const unsubscribe = db
          .collection("soldCoupons")
          .doc(user.uid)
          .onSnapshot((snapshot) => {
            const dataArr = [];
            dataArr.push({ ...snapshot.data() });
            setSoldCoupons(dataArr[0]);
          });
        setLoading(false);
        return [unsubscribe, unsubscribeStats];
      }
      return user;
    });
  }, []);

  const labelList = t("couponsChart.labels", { returnObjects: true });
  const labels = ["25₺", "50₺", "75₺", "100₺", "150₺", "200₺"];
  const bgColors = ["purple", "gold", "blue", "orange", "red", "green"];
  const dataList = [
    soldCoupons["25₺"],
    soldCoupons["50₺"],
    soldCoupons["75₺"],
    soldCoupons["100₺"],
    soldCoupons["150₺"],
    soldCoupons["200₺"],
  ];
  const datasetList = [];

  for (let i = 0; i < labels.length; i += 1) {
    datasetList.push({
      label: labels[i],
      bgColor: bgColors[i],
      data: dataList[i],
    });
  }
  const data = {
    labels: labelList,
    datasets: datasetList.map((x) => ({
      label: x.label,
      backgroundColor: x.bgColor,
      data: x.data,
    })),
  };

  const values = [];
  let dayCount = 0;
  let monthCount = 0;
  let yearCount = 0;
  let totalCount = 0;

  statistics.forEach((obj) => {
    if (obj.sellDate.toDate().getDate() === date.getDate()) {
      dayCount += 1;
    }
    if (obj.sellDate.toDate().getMonth() === date.getMonth()) {
      monthCount += 1;
    }
    if (obj.sellDate.toDate().getFullYear() === date.getFullYear()) {
      yearCount += 1;
    }
    totalCount += 1;
  });
  values.push(dayCount, monthCount, yearCount, totalCount);

  const statisticsData = [];
  const titles = t("couponsChart.statistics", { returnObjects: true });

  for (let i = 0; i < values.length; i += 1) {
    statisticsData.push({ title: titles[i], value: values[i] });
  }

  return (
    <div className="couponsChart">
      <Divider className="couponsChartTitle">
        <Title level={3}>{t("couponsChart.title")}</Title>
      </Divider>
      {loading ? (
        <Spin className="spin" size="large" tip={t("spin")} />
      ) : (
        <>
          <Row className="couponsChartStatistics" gutter={[16, 16]}>
            {statisticsData.map((stat) => (
              <Col key={stat.title} xs={24} sm={12} md={12} lg={6} xl={6}>
                <Card hoverable>
                  <Statistic title={stat.title} value={stat.value} />
                </Card>
              </Col>
            ))}
          </Row>
          <Bar
            data={data}
            width={window.screen.width < 576 ? 1500 : 1000}
            height={window.screen.width < 576 ? 1000 : 250}
            options={{
              maintainAspectRatio: true,
            }}
          />
        </>
      )}
    </div>
  );
};

export default CouponsChart;
