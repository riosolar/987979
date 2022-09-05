import React, { useState } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";
import {
  FileSearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import AddressInput from "./AddressInput";
import { useVerifyMetadata } from "hooks/useVerifyMetadata";
import Launcher from "./Launcher";

const { Meta } = Card;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    width: "100%",
    gap: "10px",
  },
};

function TOKENPresale() {
  return (
    <div style={{ padding: "15px", maxWidth: "1030px", width: "100%" }}>
      <Launcher />
    </div>
  );
}

export default TOKENPresale;
