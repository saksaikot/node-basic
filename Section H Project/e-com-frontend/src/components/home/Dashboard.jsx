import React from "react";
import { userInfo } from "../../utils/auth";
import Layout from "../Layout";

export default function Dashboard() {
  return (
    <Layout title="Home Page" className="container">
      <div>Welcome to dashboard</div>
      <p>Your info is {JSON.stringify(userInfo)}</p>
    </Layout>
  );
}
