import React, { useState, useEffect } from "react";
import { initPayment } from "../api/admin";
import { Loading } from "../../utils/messages";
import Layout from "../Layout";
export default function Payment() {
  const [redirectGateway, setRedirectGateway] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    initPayment()
      .then((response) => {
        console.log(response);
        response.data.status === "SUCCESS"
          ? setRedirectGateway(response.data.redirect)
          : setFailed(true);
      })
      .catch((error) => {
        const errorMessage = error.response ? error.response : error.message;
        console.log(errorMessage);
      });
  }, []);
  const Failed = () =>
    failed ? (
      <div className="alert alert-info">Failed to initiate payment</div>
    ) : (
      <div className="alert alert-info">Initiating payment</div>
    );

  return (
    <Layout
      title="Payment"
      description="Complete your order!"
      className="container"
    >
      <Failed />

      {redirectGateway ? (window.location.href = redirectGateway) : null}
    </Layout>
  );
}
