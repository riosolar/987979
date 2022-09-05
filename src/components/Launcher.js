import React, { useState } from "react";
import {
  Form,
  Card,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Modal,
} from "antd";

import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import AccountAlt from "./Account/AccountAlt";
import AccountPage from "./Account/AccountPage";
import NativeBalance from "./NativeBalance";
import Account from "components/Account/Account";

const ABI = [
  {
    inputs: [],
    name: "buyTOKEN",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "initPresale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newContractOwner",
        type: "address",
      },
    ],
    name: "setContractOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newTreasury",
        type: "address",
      },
    ],
    name: "setNewTreasuryFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stopPresale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "withdrawERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "amountBuyable",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ETHdecimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "invested",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPresale",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_PRESALE_PER_ACCOUNT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_SOLD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MYTOKENTOSALE",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "presale",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SALE_PRICE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SWAPdecimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "treasuryFund",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default function Launcher() {
  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  // BUY TOKEN
  async function BuyToken(result) {
    //const AmountToBuy = result.amountToBuy;
    //localStorage.setItem("AmountToBuy", AmountToBuy);
    //const AmountToBuyX = localStorage.getItem("AmountToBuy");
    //console.log(AmountToBuyX, "from local");

    //const swapDecimal = "6";
    const tokenCost = "0.0000024";
    //const amountOfTokensToBuy = Moralis.Units.Token("2000", swapDecimal);
    const msgValues = tokenCost * "2000";
    console.log(msgValues, "tokens cost");

    // BUY TOKEN
    let options = {
      contractAddress: "0x3eFCd35DF348f353735A22854b47bfC98366F847",
      functionName: "buyTOKEN",
      abi: ABI,
      /*params: {
        amount: amountOfTokensToBuy,
      },*/
      msgValue: Moralis.Units.ETH(msgValues),
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        let secondsToGo = 5;
        const modal = Modal.success({
          title: "Transaction Completed!",
          content: `You have successfully purchased ${AmountToBuyX} tokens`,
        });
        setTimeout(() => {
          modal.destroy();
        }, secondsToGo * 1000);
      },
    });
  }

  const { isAuthenticated, account } = useMoralis();

  if (isAuthenticated == true || account == true) {
    return (
      <div style={{ paddingBottom: "400px" }}>
        <AccountAlt />
        <Card
          title="SANITY PAD"
          style={{
            width: "100%",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            PRICE: 0.0048 BNB contribution<br></br>
            Total Tokens you get: "2000".
          </h3>

          <Form layout="horizontal" onFinish={BuyToken}>
            {/*   <Form.Item name="amountToBuy" required>
              <InputNumber
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "4px",
                  marginTop: "10px",
                }}
                placeholder="Amount of Tokens"
              />
            </Form.Item>*/}

            <Form.Item>
              <Button
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "4px",
                }}
                type="primary"
                htmlType="submit"
              >
                CLAIM AIRDROP
              </Button>
            </Form.Item>
          </Form>
          <NativeBalance />
        </Card>
      </div>
    );
  } else {
    return (
      <div
        style={{
          marginLeft: "25%",
          paddingBottom: "400px",
          width: "100%",
          maxWidth: "50%",
        }}
      >
        <AccountPage />
      </div>
    );
  }
}
