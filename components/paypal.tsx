import axios from "axios";
import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";

const BackendURL = process.env.NEXT_PUBLIC_API_URL;

export default function PaypalPayment({
  details,
  onOrderCreate,
  onComplete,
  setMsg,
}: {
  details: any;
  onComplete: (res: any) => void;
  onOrderCreate: () => void;
  setMsg: (s: string | null) => void;
}) {
  const createOrder = async (details: any) => {
    if (onOrderCreate) onOrderCreate();
    if (!details || !details?.user?.email) {
      toast.error("Please make sure your user details inserted!");
      return null;
    }
    setMsg("Preparing payment...");
    const orderID = await axios
      .post(`${BackendURL}/api/paypal/create-order`, { details })
      .then((res) => {
        if (res.data.success) {
          return res.data.orderID;
        } else {
          toast.error(res.data.message);
          return null;
        }
      })
      .catch((e) => {
        toast.error(e.message ?? "Something went wrong!");
        return null;
      });
    setMsg(null);
    return orderID;
  };

  const onApprove = async (data: any, onResponse: any, actions: any) => {
    setMsg("Completing payment...");
    const response = await axios
      .post(`${BackendURL}/api/paypal/capture-order`, {
        orderID: data.orderID,
      })
      .then((res) => ({
        success: res.data?.status === "COMPLETED",
        data: res.data,
        message:
          res.data?.status === "COMPLETED"
            ? "Payment completed!"
            : "Payment status " + (res.data?.status ?? "failed"),
      }))
      .catch((e) => {
        return { success: false, message: "something went wrong!", data: null };
      });
    if (onResponse) onResponse(response.data);
    setMsg(null);
    return response.data;
  };

  return (
    <>
      <div
        className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-10 w-full"
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        <PayPalButtons
          // forceReRender={[details]}
          style={{ color: "gold", label: "pay", height: 35, layout: "vertical", shape: 'rect' }}
          createOrder={() => createOrder(details)}
          onApprove={(data, actions) => onApprove(data, onComplete, actions)}
          onCancel={() => {
            toast.error("Payment cancelled by payer!");
          }}
          className="mt-10 w-full z-10"
          onError={(d: any) => {
            if (d.message !== "Expected an order id to be passed")
              toast.error(d.message);
          }}
        />
      </div>

    </>
  );
}
