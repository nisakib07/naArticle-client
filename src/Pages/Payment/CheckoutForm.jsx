import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { price, user, duration } = useContext(AuthContext);
  const buyingDate = new Date();

  let expireTime = 0;
  if (duration === 1) {
    expireTime = buyingDate.getTime() + 1 * 60 * 1000;
  } else {
    expireTime = buyingDate.getTime() + duration * 24 * 60 * 60 * 1000;
  }

  useEffect(() => {
    axios
      .post("http://localhost:5000/create-payment-intent", { price: price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("Payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const updatedUser = {
          buyingDate: buyingDate.getTime(),
          expireTime: expireTime,
        };
        axios
          .put(
            `http://localhost:5000/users/email?email=${user?.email}`,
            updatedUser,
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success("Subscription Purchased Successfully! Go to Home");
            }
          });
      }
    }
  };

  return (
    <div className="bg-blue-200 pt-12">
      <form onSubmit={handleSubmit}>
        <CardElement className="max-w-screen-sm mx-auto border-green-500 border-[5px] p-5  placeholder:font-bold rounded-lg" />
        <div className="flex justify-center">
          <button
            className="btn border-none text-lg bg-green-400 hover:bg-green-500 my-5 px-10"
            type="submit"
            disabled={!stripe || !clientSecret}>
            Pay
          </button>
        </div>
        <p className="text-red-600">{error}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
